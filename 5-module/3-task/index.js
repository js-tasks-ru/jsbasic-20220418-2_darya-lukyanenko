function showArrow(number, maxNumber, arrows) {
  switch (number) {
    case 1:
      arrows[1].style.display = 'none';
      break;
    case maxNumber:
      arrows[0].style.display = 'none';
      break;
    default:
      arrows.forEach((arrow) => {
        arrow.style.display = '';
      });
  }
}

function initCarousel() {
  const carouselInner = document.querySelector('.carousel .carousel__inner');
  const carouselArrow = document.querySelectorAll('.carousel .carousel__arrow');

  const carouselWidth = carouselInner.offsetWidth;
  const maxSlideNumber = document.querySelectorAll('.carousel .carousel__slide').length;

  let slideNumber = 1;
  let sizeCarousel = 0;

  carouselArrow.forEach((arrow) => {
    arrow.addEventListener('click', () => {
      if (arrow.classList.contains('carousel__arrow_right')) {
        sizeCarousel -= carouselWidth;
        slideNumber += 1;
      } else {
        sizeCarousel += carouselWidth;
        slideNumber -= 1;
      }

      carouselInner.style.transform = `translateX(${sizeCarousel}px)`;
      showArrow(slideNumber, maxSlideNumber, carouselArrow);
    });
  });

  showArrow(slideNumber, maxSlideNumber, carouselArrow);
}
