import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.createSlider();
    this.preventDragNDrop();
    this.addDragNDrop();
    this.addPointer();
  }
  
  createSlider = () => {
    let slides = [];
    for (let i=0; i<this.steps; i++){
      slides.push(`<span ${ i === this.value ? 'class="slider__step-active"':''}></span>`)
    }
    let template =`
    <div class="slider">
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
      <div class="slider__steps">
        ${slides.join('\n')}
      </div>
    </div>
    `;
    return createElement(template);
  }

  preventDragNDrop(){
    let THUMB = this.elem.querySelector('.slider__thumb');
    THUMB.ondragstart = (event) => {
      event.preventDefault();
    }
  }



  addDragNDrop = () => {
    let THUMB = this.elem.querySelector('.slider__thumb');

    THUMB.addEventListener('pointerdown', event => {
      this.elem.classList.add('slider_dragging')

      const onMove = event =>{
        let left = event.clientX - this.elem.getBoundingClientRect().left;

        let leftRelative = left / this.elem.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let leftPercents = leftRelative * 100;

        let thumb = this.elem.querySelector('.slider__thumb');
        let progress = this.elem.querySelector('.slider__progress');

        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;

        let segments = this.steps - 1;
        let approximateValue = leftRelative * segments;
        this.value = Math.round(approximateValue);
        let sliderValue = this.elem.querySelector('.slider__value');
        sliderValue.innerHTML = this.value;
      }

      document.addEventListener('pointermove', onMove);

      document.addEventListener('pointerup', event => {
        let custEvent = new CustomEvent('slider-change', { 
          detail: +this.value,
          bubbles: true 
        })
        this.elem.dispatchEvent(custEvent);

        let thumb = this.elem.querySelector('.slider__thumb');
        let progress = this.elem.querySelector('.slider__progress');

        let leftPercents = (this.value / (this.steps - 1) * 100).toFixed(0);

        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;

        this.elem.classList.remove('slider_dragging')
        document.removeEventListener('pointermove', onMove);
      },{once:true})
    })
  }

  addPointer = () => {
    this.elem.addEventListener('click',({layerX}) => {
      let width = getComputedStyle(this.elem)['width'].slice(0,-2);
      let value = ((this.steps-1) * layerX / width).toFixed(0);
      let sliderValue = this.elem.querySelector('.slider__value');
      
      if (value != +sliderValue.innerHTML){
        let event = new CustomEvent('slider-change', { 
          detail: +value,
          bubbles: true 
        })
        this.elem.dispatchEvent(event);
      }

      sliderValue.innerHTML = value;

      let oldActiveSlide = this.elem.querySelector('.slider__step-active');
      oldActiveSlide.classList.remove('slider__step-active');

      let newActiveSlide = [...this.elem.querySelectorAll('.slider__steps span')][value];
      newActiveSlide.classList.add('slider__step-active');

      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');

      let leftPercents = (value / (this.steps - 1) * 100)


      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
    })
  }
}