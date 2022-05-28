import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

const mappingFilters = {
  noNuts: (value, product) => {
    if (!value) {
      return true;
    }

    return product.nuts !== value;
  },
  vegeterianOnly: (value, product) => {
    if (!value) {
      return true;
    }

    return product.vegeterian === value;
  },
  maxSpiciness: (value, product) => product.spiciness <= value,
  category: (value, product) => {
    if (value === '') {
      return true;
    }

    return product.category === value;
  },
};

export default class ProductGrid {
  #products;
  #filters;

  constructor(products) {
    this.#products = products;
    this.#filters = {};
    this.#render();
  }

  #render() {
    this.elem = this.#renderProductGrid();
  }

  #renderProductGrid() {
    const productGrid = document.createElement('div');
    productGrid.classList.add('products-grid');

    const productsFiltered = this.#getProductsFiltered();

    productGrid.append(this.#renderProductGridInner(productsFiltered));
    return productGrid;
  }

  #renderProductGridInner(products) {
    const productGridInner = document.createElement('div');
    productGridInner.classList.add('products-grid__inner');

    productGridInner.append(...products.map((product) => {
      const productCard = new ProductCard(product);
      return productCard.elem;
    }));

    return productGridInner;
  }

  #getProductsFiltered() {
    return this.#products.filter((product) => {

      return Object.entries(this.#filters).every(([filterName, filterValue]) => mappingFilters[filterName](filterValue, product));
    });
  }

  updateFilter(filters) {
    this.#filters = { ...this.#filters, ...filters };

    this.elem.innerHTML = '';
    const productsFiltered = this.#getProductsFiltered();
    this.elem.append(this.#renderProductGridInner(productsFiltered));
  }

}
