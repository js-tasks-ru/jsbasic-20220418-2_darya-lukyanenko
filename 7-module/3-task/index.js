import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    let slider = createElement(`<div class="slider">
    <!--Ползунок слайдера с активным значением-->
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">${value}</span>
    </div>
    <!--Заполненная часть слайдера-->
    <div class="slider__progress" style="width: 50%;"></div>
  </div>`);

    let sliderSteps = createElement(`<div class="slider__steps"></div>`);
    for (let i = 0; i < steps; i++) {
      sliderSteps.innerHTML += '<span></span>';
    }
    slider.append(sliderSteps);
    sliderSteps.children[value].classList.add('slider__step-active');

    this.elem = slider;
    let thumb = slider.querySelector('.slider__thumb');
    let spanValue = thumb.querySelector('.slider__value');
    let progress = slider.querySelector('.slider__progress');



    thumb.style.left = `${value}%`;
    progress.style.width = `${value / (steps - 1) * 100}%`;


    slider.addEventListener('click', (event) => {
      let clientX = event.clientX - slider.getBoundingClientRect().left;
      let valueSlider = Math.round(clientX / slider.offsetWidth * (steps - 1));
      let valueLine = valueSlider / (steps - 1) * 100;
      thumb.style.left = `${valueLine}%`;
      progress.style.width = `${valueLine}%`;
      spanValue.innerHTML = `${valueSlider}`;
      let sliderSteps = slider.querySelector('.slider__steps');
      for (let elem of sliderSteps.children) {
        elem.classList.remove('slider__step-active');
      }
      sliderSteps.children[valueSlider].classList.add('slider__step-active');
      slider.dispatchEvent(new CustomEvent('slider-change', {
        detail: valueSlider,
        bubbles: true
      }));
    });
  }
}