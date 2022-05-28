export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.render();
  }

  render(){
    this.elem = this.renderCard();
    this.addEventListeners();
  }

  renderCard() {
    const card = document.createElement('div');
    card.classList.add('card');

    const {name, price, image} = this.product;

    card.innerHTML = `
      <div class="card__top">
        <img src="/assets/images/products/${image}" class="card__image" alt="product">
        <span class="card__price">€${price.toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>    
    `;

    return card;
  }

  addEventListeners() {
    const cardButton = this.elem.querySelector('.card__button');

    cardButton.addEventListener('click', () => {
      cardButton.dispatchEvent(new CustomEvent("product-add", {detail: this.product.id, bubbles: true}));
    })
  }
}