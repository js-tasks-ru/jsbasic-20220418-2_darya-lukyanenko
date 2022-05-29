export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    if (this.isAdded(product)){
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

    if (this.cartItems[index].count === 0) {
      this.cartItems = [...this.cartItems.slice(0, index), ...this.cartItems.slice(index + 1)];
    }
    this.onProductUpdate(this.cartItems[index]);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }

  isAdded(product) {
    return !this.cartItems.find((item) => item.product.id === product.id);
  }
}

