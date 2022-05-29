function arrowsDisplay(numberSlide, lastSlideIndex){
   const leftArrow = document.querySelector('.carousel__arrow_left');
   const rightArrow = document.querySelector('.carousel__arrow_right');

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

function initCarousel() {
   const carouselInner = document.querySelector('.carousel__inner');
   const leftArrow = document.querySelector('.carousel__arrow_left');
   const rightArrow = document.querySelector('.carousel__arrow_right');
  
   const slideWidth = carouselInner.offsetWidth;
   const lastSlideIndex = document.querySelectorAll('.carousel__slide').length - 1;

   let numberSlide = 0;
   let slideTranslateSize = 0;
   
   arrowsDisplay(numberSlide, lastSlideIndex);

   leftArrow.addEventListener('click', () => {
    slideTranslateSize += slideWidth;
    numberSlide -= 1;
    arrowsDisplay(numberSlide, lastSlideIndex);
    carouselInner.style.transform = `translateX(${slideTranslateSize}px)`;
   }); 

   rightArrow.addEventListener('click', () => {
    slideTranslateSize -= slideWidth;
    numberSlide += 1;
    arrowsDisplay(numberSlide, lastSlideIndex);
    carouselInner.style.transform = `translateX(${slideTranslateSize}px)`;
   });
}