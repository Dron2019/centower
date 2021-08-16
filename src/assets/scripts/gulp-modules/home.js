/* eslint-disable no-use-before-define */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-undef */
gsap.registerPlugin(MotionPathPlugin);
function changeScreenWithEffects(toOpenElement, toCloseElement, cb = () => {}, direction = 1) {
  switch (direction) {
    case 1:
      gsap.timeline()
        .timeScale(1)
        .set(toOpenElement, { display: '', yPercent: -100 }, '<')
        .to(toCloseElement, {
          yPercent: 100, autoAlpha: 1, clearProps: 'all', duration: 2, ease: 'power4.out',
        }, '<')
        .fromTo(
          toOpenElement,
          { yPercent: -100, autoAlpha: 1 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.5,
            ease: 'power4.out',
          },
          '<',
        )
        .set(toCloseElement, { display: 'none' })
        .add(() => {
          locoScroll.update();
          cb();
        });
      break;
    case -1:
      gsap.timeline()
        .timeScale(1)
        .set(toOpenElement, { display: '', yPercent: 100 }, '<')
        .to(toCloseElement, {
          yPercent: -100, autoAlpha: 1, clearProps: 'all', duration: 2, ease: 'power4.out',
        }, '<')
        .fromTo(
          toOpenElement,
          { yPercent: 100, autoAlpha: 1 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.5,
            ease: 'power4.out',
          },
          '<',
        )
        .set(toCloseElement, { display: 'none' })
        .add(() => {
          locoScroll.update();
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

const tl = gsap.timeline({ paused: true })
  .to('#circle1', {
    duration: 5,
    repeat: 0,
    // yoyo: true,
    ease: 'power1.inOut',
    motionPath: {
      path: '#road1',
      align: '#road1',
      // autoRotate: true,
      end: 1,
      alignOrigin: [0.5, 0.5],
    },
  }).to('#circle2', {
    duration: 5,
    repeat: 0,
    // yoyo: true,
    ease: 'power1.inOut',

    motionPath: {
      path: '#road2',
      align: '#road2',
      // autoRotate: true,
      alignOrigin: [0.5, 0.5],
    },
  }, '<').progress(0);


const svg = document.querySelector('[data-motion-svg]');
// locoScroll.destroy();
svg.addEventListener('mouseenter', function () {
  tl.restart();
});


const overlay = document.querySelector('.ms-slider-overlay ');
const slides = document.querySelectorAll('.ms-slide');
const navs = document.querySelectorAll('[data-circle]');
const params = {
  isOnSlider: false,
  isAnimating: false,
  curentIndex: 0,
  url: 'slide',
};

navs.forEach(resetStrokeValue);
navs.forEach((el, index) => {
  el.addEventListener('click', function () {
    simulatePathDrawing(navs[index], 1.5, '5');
    resetStrokeValue(navs[params.curentIndex]);
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
    changeScreenWithEffects(
      slides[c],
      slides[0],
      () => {
        params.curentIndex = c;
        params.isAnimating = false;
        insertUrlParam(params.url, c);
      },
    );
  }
});
overlay.addEventListener('mouseenter', function () {
  locoScroll.stop();
  params.isOnSlider = true;
});
overlay.addEventListener('mouseleave', function () {
  locoScroll.start();
  params.isOnSlider = false;
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
  }
}, true);


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
