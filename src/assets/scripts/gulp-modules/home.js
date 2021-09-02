/* eslint-disable no-use-before-define */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-undef */
locoScroll.destroy();
document.querySelector('.page__content').style.transform = '';
document.querySelector('body').style.overflow = 'hidden';
gsap.registerPlugin(MotionPathPlugin);
function changeScreenWithEffects(toOpenElement, toCloseElement, cb = () => {}, direction = 1) {
  const SPEED = 0.9;
  const EASE = 'power2.inOut';
  const openSlideInnerElems = toOpenElement.querySelectorAll('.ms-slide-text-wrap>*');
  switch (direction) {
    case -1:
      gsap.timeline()
        .timeScale(SPEED)
        .set(toOpenElement, { display: '', yPercent: -100 }, '<')
        .to(toCloseElement, {
          yPercent: 100, autoAlpha: 1, duration: 2, ease: EASE,
        }, '<')
        .to(toCloseElement.querySelector('img'), { scale: 1.2, duration: 2, ease: EASE,}, '<')
        .fromTo(
          toOpenElement,
          { yPercent: -100, autoAlpha: 1 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 2,
            ease: EASE,
          },
          '<',
          )
        .fromTo(openSlideInnerElems, { y: -100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: EASE, duration: 2, stagger: 0.1 }, '<')
        // .from(toOpenElement.querySelectorAll('.ms-slide-text-wrap>*'), { stagger: 0.1, autoAlpha: 0, y: -150, duration: 2, clearProps: 'all' }, '<')
        .fromTo(
          toOpenElement.querySelector('img'), 
          { scale: 1.2 }, 
          { scale: 1, duration: 2, ease: EASE,}, 
          '<')
        .set(toCloseElement, { display: 'none' })
        .add(() => {
          // locoScroll.update();
          cb();
        });
      break;
    case 1:
      gsap.timeline()
        .timeScale(SPEED)
        .set(toOpenElement, { display: '', yPercent: 100 }, '<')
        .to(toCloseElement, {
          yPercent: -100, autoAlpha: 1, duration: 2, ease: EASE,
        }, '<')
        .to(toCloseElement.querySelector('img'), { scale: 1.2, duration: 1.75, ease: EASE, }, '<')
        .fromTo(
          toOpenElement,
          { yPercent: 100, autoAlpha: 1 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 2,
            ease: EASE,
          },
          '<',
        )
        .fromTo(openSlideInnerElems, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: EASE, duration: 2, stagger: 0.1 }, '<')
        // .from(toOpenElement.querySelectorAll('.ms-slide-text-wrap>*'), { stagger: 0.1, autoAlpha: 0, y: 150, duration: 2, clearProps: 'all' }, '<')
        .fromTo(
          toOpenElement.querySelector('img'), 
          { scale: 1.2 }, 
          { scale: 1, duration: 2, ease: EASE,}, 
          '<')
        .set(toCloseElement, { display: 'none' })
        .add(() => {
          // locoScroll.update();
          cb();
        });
      break;
    default:
      break;
  }
}

function insertUrlParam(key, value) {
  if (window.history.pushState) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({ path: newurl }, '', newurl);
  }
}


const overlay = document.querySelector('.ms-slider-overlay ');
const slides = document.querySelectorAll('.ms-slide');
const navs = document.querySelectorAll('[data-circle]');
const nextSlideButton = document.querySelector('[data-ms-next-slide]');
const params = {
  isOnSlider: false,
  isAnimating: false,
  curentIndex: 0,
  url: 'slide',
  autoSlide: setTimeout(() => {
    
  }, 7000),
};

navs.forEach(resetStrokeValue);
navs.forEach((el, index) => {
  el.addEventListener('click', function () {
    if (params.isAnimating === true) return;
    clearTimeoutAndSetNew();
    simulatePathDrawing(navs[index], 1.5, '5');
    resetStrokeValue(navs[params.curentIndex]);
    params.isAnimating = true;
    changeScreenWithEffects(slides[index], slides[params.curentIndex], () => {
      params.curentIndex = index;
      params.isAnimating = false;
      insertUrlParam(params.url, index);
    });
    
  });
});
gsap.set('.ms-slide:not(:first-child)', { display: 'none' });

window.addEventListener('load', function () {
  const urlString = window.location.href;
  const url = new URL(urlString);
  const c = +url.searchParams.get(params.url);
  if (typeof c === 'number' && slides[c] !== undefined && +c !== 0) {
    params.isAnimating = true;
    changeScreenWithEffects(
      slides[c],
      slides[0],
      () => {
        params.curentIndex = c;
        params.isAnimating = false;
        insertUrlParam(params.url, c);
      },
    );
    clearTimeoutAndSetNew();
  }
});

nextSlideButton.addEventListener('click',function(evt){

  if (params.isAnimating === true) return;
  const nextIndex = getNextIndex(params.curentIndex, slides, 1);
  simulatePathDrawing(navs[nextIndex], 1.5, '5');
  resetStrokeValue(navs[params.curentIndex]);
  params.isAnimating = true;
  changeScreenWithEffects(slides[nextIndex], slides[params.curentIndex], () => {
    params.curentIndex = nextIndex;
    params.isAnimating = false;
    insertUrlParam(params.url, nextIndex);
  });
  clearTimeoutAndSetNew();
});

overlay.addEventListener('mouseenter', function () {
  locoScroll.stop();
  params.isOnSlider = true;
});
overlay.addEventListener('mouseleave', function () {
  locoScroll.start();
  params.isOnSlider = false;
  clearTimeout(params.autoSlide);
  params.autoSlide = setTimeout(() => {
  }, 7000);
});
window.addEventListener('wheel', function (evt) {
  if (params.isOnSlider && params.isAnimating === false) {

    evt.preventDefault();
    params.isAnimating = true;
    const direction = evt.deltaY > 0 ? 1 : -1;
    const nextIndex = getNextIndex(params.curentIndex, slides, direction);
    simulatePathDrawing(navs[nextIndex], 1.5, '5');
    resetStrokeValue(navs[params.curentIndex]);
    changeScreenWithEffects(
      slides[nextIndex],
      slides[params.curentIndex],
      () => {
        params.curentIndex = nextIndex;
        params.isAnimating = false;
        insertUrlParam(params.url, nextIndex);
      },
      direction,
    );
    clearTimeoutAndSetNew();
  }
}, true);
window.addEventListener('blur', function() {
  clearTimeout(params.autoSlide);
  params.autoSlide = setTimeout(() => {
  }, 7000);
});

// gsap.defaults({ duration: 1 });

function simulatePathDrawing(pathArgs, strokeWidth = '3', duration = '1.5') {
  const path = pathArgs;
  // if (path.done) return;
  // var path = document.querySelector('.squiggle-animated path');
  const length = path.getTotalLength();
  // Clear any previous transition
  // eslint-disable-next-line no-multi-assign
  path.style.transition = path.style.WebkitTransition = 'none';
  // Set up the starting positions
  path.style.strokeDasharray = `${length} ${length}`;
  path.style.strokeDashoffset = length;
  // Trigger a layout so styles are calculated & the browser
  // picks up the starting position before animating
  path.getBoundingClientRect();
  // Define our transition
  // eslint-disable-next-line no-multi-assign
  path.style.transition = path.style.WebkitTransition = `stroke-dashoffset ${duration}s ease-in-out`;
  // Go!
  path.style.strokeDashoffset = '0';
  path.style.strokeWidth = strokeWidth;
  // path.style.stroke = '#F7F7F7';
  // path.done = true;
}

function resetStrokeValue(pathArgs) {
  const path = pathArgs;
  const length = path.getTotalLength();
  // Clear any previous transition
  // eslint-disable-next-line no-multi-assign
  path.style.transition = path.style.WebkitTransition = 'none';
  // Set up the starting positions
  path.style.strokeDasharray = `${length} ${length}`;
  path.style.strokeDashoffset = length;
}

function clearTimeoutAndSetNew() {
  clearTimeout(params.autoSlide);
  params.autoSlide = setTimeout(() => {
    const nextIndex = getNextIndex(params.curentIndex, slides, 1);
    simulatePathDrawing(navs[nextIndex], 1.5, '7');
    resetStrokeValue(navs[params.curentIndex]);
    changeScreenWithEffects(
      slides[nextIndex],
      slides[params.curentIndex],
      () => {
        params.curentIndex = nextIndex;
        params.isAnimating = false;
        insertUrlParam(params.url, nextIndex);
      },
      1,
    );
    clearTimeoutAndSetNew();
  }, 7000);
}

/**
 * @param {number} current текущий слайд
 * @param {NodeList} $nodeList коллекция слайдов
 * @param {number} direction направление (-1 или 1)
 * @returns {number} nextIndex
 * @description Получение следующего индекса
 */
function getNextIndex(current, $nodeList, direction) {
  let nextIndex = current + direction;
  if (params.curentIndex === $nodeList.length - 1 && direction > 0) {
    nextIndex = 0;
  } else if (params.curentIndex === 0 && direction < 0) {
    nextIndex = slides.length - 1;
  }
  return nextIndex;
}




function some() {
  const section = document.querySelector('[data-curtain]');

const d11 = 'M 0 0 Q 55 0 110 0 Q 110 0 110 0 Q 97 2 -1 0 Q 0 0 0 0'
const d12 = 'M 0 0 Q 55 0 110 0 Q 110 0 110 0 Q 107 110 -1 0 Q 0 0 0 0';
const d13 = 'M 0 0 Q 55 0 110 0 Q 110 0 110 0 Q 107 110 35 48 Q -1 92 0 67';
const d14 = 'M 780 1031 Q 492 776 7 982 L 1 -61 Q 392 -474 743 -38 Z';
const d15 = 'M 0 0 Q 37 86 110 0 Q 110 0 110 0 Q 107 110 34 98 Q -1 92 0 67';
const d16 = 'M 0 67 Q 31 25 121 70 Q 121 70 120 70 Q 107 110 34 98 Q -1 92 0 67';
const d17 = 'M 0 67 Q 40 110 121 70 Q 121 70 120 70 Q 107 110 34 98 Q -1 92 0 67';



  const tl = gsap.timeline({
    paused: true,
    scrollTrigger: {
      triggerHook: 1,
      trigger: section,
      // start: '0% bottom',
      end: '200% bottom',
      // scrub: 0.5,
    },
  });
  // tl.timeScale(0.5);
  tl.to(section.querySelector('path'), { ease: 'none', attr: { d: d11 } });
  tl.to(section.querySelector('path'), { ease: 'none', attr: { d: d12 } });
  tl.to(section.querySelector('path'), { ease: 'none', attr: { d: d13 } });
  // // tl.to(section.querySelector('path'), { ease: 'linear', attr: { d: d14 } });
  tl.to(section.querySelector('path'), { ease: 'none', attr: { d: d15 } });
  tl.to(section.querySelector('path'), { ease: 'none', attr: { d: d17 } });
  // tl.play();
  gsap.to(tl, {time:tl.duration(), duration:tl.duration(), 
    ease:"power3.easeInOut", repeat:10, yoyo:true, repeatDelay:1, delay:1});
}

// some();