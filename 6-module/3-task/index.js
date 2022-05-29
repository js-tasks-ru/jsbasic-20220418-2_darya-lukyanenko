import createElement from '../../assets/lib/create-element.js';

const arrowsCarousel = ['carousel__arrow_right', 'carousel__arrow_left'];

const mappingArrowsImg = {
  'carousel__arrow_right': 'angle-icon.svg',
  'carousel__arrow_left': 'angle-left-icon.svg',
};

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
  }

  render(){
    this.elem = this.renderCarousel();
    this.addEventListeners();
  }

  renderCarousel(){
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');

    arrowsCarousel.forEach((arrow) => {
      carousel.insertAdjacentHTML('beforeend', this.renderArrow(arrow));
    })

    carousel.insertAdjacentHTML('beforeend', `
      <div class="carousel__inner">
      ${this.slides.map(this.renderSlide).join('')}
      </div>
    `)
    return carousel;
  }

  renderArrow(arrow){
    return `
    <div class="carousel__arrow ${arrow}">
      <img src="/assets/images/icons/${mappingArrowsImg[arrow]}" alt="icon">
    </div>
    `;
  }

  renderSlide({name, price, image, id}){
    return `
      <div class="carousel__slide" data-id="${id}">
        <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price.toFixed(2)}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
           <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `
  }

  addEventListeners(){
    this.initCarousel();
    const carouselButtons = this.elem.querySelectorAll('.carousel__button');
    carouselButtons.forEach((button) => {
      const productId = button.closest('.carousel__slide').dataset.id;
      button.addEventListener('click', () => {
         button.dispatchEvent(new CustomEvent("product-add", {detail: productId, bubbles: true}));
      })
    })
  }

  arrowsDisplay(numberSlide, lastSlideIndex){
    const leftArrow = this.elem.querySelector('.carousel__arrow_left');
    const rightArrow = this.elem.querySelector('.carousel__arrow_right');
 
    switch (numberSlide) {
      case 0:
        leftArrow.style.display = 'none';
        break;
      case lastSlideIndex:
        rightArrow.style.display = 'none';
        break;
      default:
       leftArrow.style.display = '';
       rightArrow.style.display = '';
    }
 }

  initCarousel() {
    const carouselInner = this.elem.querySelector('.carousel__inner');
    const leftArrow = this.elem.querySelector('.carousel__arrow_left');
    const rightArrow = this.elem.querySelector('.carousel__arrow_right');
   
    const lastSlideIndex = this.elem.querySelectorAll('.carousel__slide').length - 1;
 
    let numberSlide = 0;
    let slideTranslateSize = 0;
    
    this.arrowsDisplay(numberSlide, lastSlideIndex);

    leftArrow.addEventListener('click', () => {
      const slideWidth = carouselInner.offsetWidth;
     slideTranslateSize += slideWidth;
     numberSlide -= 1;
     this.arrowsDisplay(numberSlide, lastSlideIndex);
     carouselInner.style.transform = `translateX(${slideTranslateSize}px)`;
    }); 
 
    rightArrow.addEventListener('click', () => {
      const slideWidth = carouselInner.offsetWidth;
     slideTranslateSize -= slideWidth;
     numberSlide += 1;
     this.arrowsDisplay(numberSlide, lastSlideIndex);
     carouselInner.style.transform = `translateX(${slideTranslateSize}px)`;
    });
 }
}
