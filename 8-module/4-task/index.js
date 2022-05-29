import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    if (this.isAdded(product)) {
      this.cartItems.push({ product, count: 1 });
      this.onProductUpdate({ product, count: 1 });
    } else {
      const index = this.cartItems.findIndex((item) => item.product.id === product.id);
      this.cartItems[index].count += 1;
      this.onProductUpdate(this.cartItems[index]);
    }
  }

  updateProductCount(productId, amount) {
    const index = this.cartItems.findIndex((item) => item.product.id === productId);
    this.cartItems[index].count += amount;

    this.onProductUpdate(this.cartItems[index]);

    if (this.cartItems[index].count === 0) {
      this.cartItems = [...this.cartItems.slice(0, index), ...this.cartItems.slice(index + 1)];
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let count = 0;
    this.cartItems.forEach(item => count += item.count);
    return count;
  }

  getTotalPrice() {
    let price = 0;
    this.cartItems.forEach(item => price += item.product.price * item.count);
    return price;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id
      }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
      2
    )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle('Your order');

    const modalBody = document.createElement('div');
    this.cartItems.forEach((item) => {
      modalBody.append(this.renderProduct(item.product, item.count));
    });
    modalBody.append(this.renderOrderForm());

    this.addModalEventListeners(modalBody);

    this.modal.setBody(modalBody);
    this.modal.open();
  }

  onProductUpdate(cartItem) {

    if (!this.modal) {
      this.cartIcon.update(this);
      return;
    }

    const productIdSelector = `[data-product-id="${cartItem.product.id}"]`;
    const modalBody = this.modal.elem;

    if (cartItem.count === 0) {
      const cartItemElement = modalBody.querySelector(productIdSelector);
      cartItemElement.remove();
    } else {
      let productCount = modalBody.querySelector(`${productIdSelector} .cart-counter__count`);
      let productPrice = modalBody.querySelector(`${productIdSelector} .cart-product__price`);

      productCount.innerHTML = cartItem.count;
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
    }

    if (modalBody.querySelectorAll('[data-product-id]').length === 0) {
      this.modal.close();
      delete this.modal;
      this.cartIcon.update(this);

      return;
    }

    const infoPrice = modalBody.querySelector('.cart-buttons__info-price');

    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

    this.cartIcon.update(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const modalForm = this.modal.elem.querySelector('.cart-form');
    const buttonSubmit = modalForm.querySelector('button[type="submit"]');
    buttonSubmit.classList.add('is-loading');

    const data = new FormData(event.target);

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: data,
    }).then(() => {
      this.modal.setTitle('Success!');
      this.cartItems = [];

      const newModalBody = createElement(`
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
      `
      );

      this.modal.setBody(newModalBody);
    })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

  addModalEventListeners(modalBody) {
    const cartProducts = modalBody.querySelectorAll('.cart-product');

    cartProducts.forEach((product) => {
      const productId = product.dataset.productId;

      const buttonPlus = product.querySelector('.cart-counter__button_plus');
      const buttonMinus = product.querySelector('.cart-counter__button_minus');

      buttonPlus.addEventListener('click', () => {
        this.updateProductCount(productId, 1);
      })

      buttonMinus.addEventListener('click', () => {
        this.updateProductCount(productId, -1);
      })
    });

    const cartForm = modalBody.querySelector('.cart-form');

    cartForm.addEventListener('submit', (event) => {
      this.onSubmit(event);
    })
  }

  isAdded(product) {
    return !this.cartItems.find((item) => item.product.id === product.id);
  }

}

