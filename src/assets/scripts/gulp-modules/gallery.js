/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-proto */
/** СТрелка переключатель в зависимости от положения на єкране */

function sideSwitchArrow(swiper, arrowArgs, conArgs) {
  const arrow = arrowArgs;
  const container = conArgs;
  const mediumCordValue = document.documentElement.clientWidth / 2;
  document.body.append(arrow);
  container.style.cursor = 'none';
  arrow.style.cursor = 'none';
  arrow.style.zIndex = 10;
  arrow.__proto__.hide = function some() {
    this.style.opacity = '0';
    this.style.pointerEvents = 'none';
  };
  arrow.__proto__.show = function some() {
    this.style.opacity = '1';
    // this.style.pointerEvents = 'auto';
  };
  arrow.dataset.side = 'leftSide';


  container.addEventListener('mousemove', desktopNavButtonHandler);
  container.addEventListener('mouseenter', () => {
    arrow.show();
  });
  container.addEventListener('mouseleave', () => {
    arrow.hide();
  });
  if (document.documentElement.clientWidth < 769) {
    window.removeEventListener('mousemove', desktopNavButtonHandler);
    arrow.remove();
  }

  /** Записывает координаты обьекта, на котором нужно скрыть стрелку переключения слайдера */
  /** ms ---> main-screen */


  function desktopNavButtonHandler(evt) {
    // arrow.style.position = 'fixed';
    arrow.style.left = `${evt.clientX - 18}px`;
    arrow.style.top = `${evt.clientY - 18}px`;

    getCursorSide(evt.clientX);
    handleArrowVisibility(evt);
  }


  function handleArrowVisibility() {
  }

  function getCursorSide(x) {
    if (x < (mediumCordValue)) {
      arrow.classList.add('left-side');
      arrow.dataset.side = 'leftSide';
      // switchGallerySlide('leftSide');
    } else {
      arrow.classList.remove('left-side');
      arrow.dataset.side = 'rightSide';
      // switchGallerySlide('rightSide')
    }
  }
  container.addEventListener('click', () => {
    switchGallerySlide(arrow.dataset.side);
  });
  if (document.documentElement.clientWidth < 576) {
    container.removeEventListener('click', clickToChange);
  }
  const navigate = {
    leftSide: () => {
      swiper.slidePrev();
    },
    rightSide: () => {
      swiper.slideNext();
    },
  };

  function switchGallerySlide(side) {
    navigate[side]();
    return navigate.side;
  }


  // eslint-disable-next-line no-unused-vars
}

/** СТрелка переключатель в зависимости от положения на єкране END */
const swiper = new Swiper('[data-swiper]', {
  loop: true,
  speed: 1000,
});


const currentSlideShow = [
  document.querySelector('[data-first-digit]'),
  document.querySelector('[data-second-digit]'),
];
currentSlideShow[0].textContent = 0;
currentSlideShow[1].textContent = swiper.realIndex + 1;
document.querySelector('.gallery-nav__all').textContent = swiper.imagesLoaded - 2;
swiper.on('activeIndexChange', (self) => {
  const splitedIndex = (self.realIndex + 1).toString().split('');
  const firstDigit = splitedIndex.length > 1 ? splitedIndex[0] : 0;
  const secondDigit = splitedIndex.length > 1 ? splitedIndex[1] : splitedIndex[0];
  gsap.timeline()
    .fromTo(currentSlideShow[1], { yPercent: 0 }, { yPercent: 100 })
    .add(() => {
      currentSlideShow[1].textContent = secondDigit;
    })
    .fromTo(currentSlideShow[1], { yPercent: -100 }, { yPercent: 0 });
  if (currentSlideShow[0].textContent != firstDigit) {
    gsap.timeline()
      .fromTo(currentSlideShow[0], { yPercent: 0 }, { yPercent: 100 })
      .add(() => {
        currentSlideShow[0].textContent = firstDigit;
      })
      .fromTo(currentSlideShow[0], { yPercent: -100 }, { yPercent: 0 });
  }
});

sideSwitchArrow(
  swiper,
  document.querySelector('.moving-arrow'),
  document.querySelector('[data-swiper]'),
);


window.addEventListener('wheel',function some(evt){
  locoScroll.scrollTo(document.querySelector('.swiper-wrapper'));
  window.removeEventListener('wheel', some);
});
// locoScroll.scrollTo(document.querySelector('.swiper-wrapper'));