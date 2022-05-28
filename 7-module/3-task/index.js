export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render(); 
  }
  
  render() {
    this.elem = this.renderStepSlider(this.steps);
    this.renderProgress(25*this.value);
    this.addEventListener();
  }


  renderStepSlider(steps) {
    const stepSlider = document.createElement('div');
    stepSlider.classList.add('slider');

    stepSlider.innerHTML = `
    
    <div class="slider__thumb">
      <span class="slider__value">${this.value}</span>
    </div>

    <div class="slider__progress"></div>

    <div class="slider__steps">
      ${Array(steps).fill('').map((s, index) => `<span data-value="${index}"></span>`).join('')}
    </div>
    `
    
    return stepSlider;
  }

  renderProgress(percent) {
    const sliderSteps = this.elem.querySelectorAll('.slider__steps > span');
    const sliderValue = this.elem.querySelector('.slider__value');

    sliderSteps.forEach((step) => {
      if(Number(step.dataset.value) === this.value) {
        step.classList.add('slider__step-active');
      } else {
          step.classList.remove('slider__step-active');
      }
    })

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${percent}%`;
    progress.style.width = `${percent}%`;
    sliderValue.textContent = this.value;
  }

  addEventListener() {
    this.elem.addEventListener('click', (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      this.value = Math.round(approximateValue);
      let valuePercents = this.value / segments * 100;

      this.renderProgress(valuePercents);

      this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true 
      }))
    })
  }
}
