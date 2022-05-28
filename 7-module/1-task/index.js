import createElement from '../../assets/lib/create-element.js';

const arrowsMenu = ['ribbon__arrow_left', 'ribbon__arrow_right'];

const mappingArrows = {
  'ribbon__arrow_left' : (ribbonInner) => {
    ribbonInner.scrollBy(-350, 0);
  },
  'ribbon__arrow_right': (ribbonInner) => {
    ribbonInner.scrollBy(350, 0);
  }
};

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
  }
 
  render() {
    this.elem = this.renderRibbonMenu();
    this.addEventListeners();
    this.elem.querySelector('.ribbon__arrow').classList.remove('ribbon__arrow_visible');
    this.elem.querySelector('.ribbon__item').classList.add('ribbon__item_active');
  }

  renderRibbonMenu(){
    const ribbonMenu = document.createElement('div');
    ribbonMenu.classList.add('ribbon');

    arrowsMenu.forEach((arrow) => {
      ribbonMenu.insertAdjacentHTML('beforeend', this.renderArrow(arrow));
    });

    ribbonMenu.firstElementChild.insertAdjacentHTML('afterend', `
      <nav class="ribbon__inner">
      ${this.categories.map(this.renderRibbonItem).join('')}
      </nav>
    `)

    return ribbonMenu;
  }

  renderArrow(arrow) {
    return `
    <button class="ribbon__arrow ${arrow} ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    `
  }

  renderRibbonItem({id, name}) {
    return `
    <a href="#" class="ribbon__item" data-id="${id}">${name}</a>
    `
  }

  displayArrow = ({target}) => {
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');

    let scrollLeft = target.scrollLeft;
    
    if (scrollLeft === 0) {
      arrowLeft.classList.remove('ribbon__arrow_visible');
      return;
    }

    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    let scrollWidth = target.scrollWidth;
    let clientWidth = target.clientWidth;
    
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    if (scrollRight < 1) {
      arrowRight.classList.remove('ribbon__arrow_visible');
      return;
    }

    arrowLeft.classList.add('ribbon__arrow_visible');
    arrowRight.classList.add('ribbon__arrow_visible');
  }

  removeActiveClass(item) {
    item.classList.remove('ribbon__item_active');
  }

  addEventListeners() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');

    arrowsMenu.forEach((arrow) => {
      const arrowElement = this.elem.querySelector(`.${arrow}`);

      arrowElement.addEventListener('click', () => {
        mappingArrows[arrow](ribbonInner);
      })
    });

    ribbonInner.addEventListener('scroll', this.displayArrow);

    ribbonInner.addEventListener('click', ({target}) =>{
      this.elem.dispatchEvent(new CustomEvent("ribbon-select", {detail: target.dataset.id, bubbles: true}));
    });

    const ribbonItems = this.elem.querySelectorAll('.ribbon__item');

    ribbonItems.forEach((item) => {
      item.addEventListener('click', (event) => {
        event.preventDefault();
        ribbonItems.forEach(this.removeActiveClass);
        item.classList.add('ribbon__item_active');
      });
    });
  }
}
