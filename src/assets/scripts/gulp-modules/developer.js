/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
gsap.registerPlugin(ScrollTrigger);
/* eslint-disable no-undef */
locoScroll.on('scroll', () => {
  // eslint-disable-next-line no-unused-expressions
  ScrollTrigger.update;
});

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return (arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y);
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector('[data-scroll-container]').style.transform ? 'transform' : 'fixed',
});
ScrollTrigger.addEventListener('fixed', () => locoScroll.update());

ScrollTrigger.refresh();
const mediaScreenScaleCoeficient = window.innerWidth > 576 ? 1 : 0.25;
// gsap.defaults({
//   ease: 'none',
//   duration: 1,
// });
gsap.set('.developer-img3 img', { scale: 1.2 });
gsap.set('.developer-paragraph-with-text__img img', { scale: 1.2 });
const dev3 = document.querySelector('.developer-img3');
const dev3Img = dev3.querySelector('img');
gsap.timeline({
  ease: 'none',
  scrollTrigger: {
    trigger: dev3,
    scrub: 0.5,
    // markers: true,
  },
})
  .fromTo(dev3Img, {
    y: -45 * mediaScreenScaleCoeficient,
  }, {
    y: 45 * mediaScreenScaleCoeficient,
    ease: 'linear',
  })
  .fromTo('.developer-paragraph-with-text img', {
    y: -45 * mediaScreenScaleCoeficient,
  }, {
    y: 45 * mediaScreenScaleCoeficient,
    ease: 'linear',
  }, '<');
gsap.set('.developer-img2 img', { scale: 1.2 });
gsap.timeline({
  ease: 'none',
  scrollTrigger: {
    trigger: '.developer-img2',
    scrub: 0.5,
    // markers: true,
  },
})
  .fromTo('.developer-img2 img', {
    y: -45 * mediaScreenScaleCoeficient,
  }, {
    y: 45 * mediaScreenScaleCoeficient,
    ease: 'linear',
  });

gsap.timeline({
  ease: 'none',
  scrollTrigger: {
    trigger: '.dev-mask2',
    scrub: 0.5,
    // markers: true,
  },
})
  .fromTo('[mask="url(#mask1)"] path', {
    y: -45 * mediaScreenScaleCoeficient,
  }, {
    y: 45 * mediaScreenScaleCoeficient,
    ease: 'linear',
  });


function timelineParams(params, trigger = undefined) {
  const initialParams = {
    scrollTrigger: {
      trigger,
      scrub: 0.5,
      // markers: true,
    },
  };
  return Object.assign(initialParams, params);
}


const splitTolines = document.querySelectorAll('[data-split-to-lines]');
splitTolines.forEach((eleArgs) => {
  const elem = eleArgs;
  if (document.documentElement.clientWidth < 2500) {
    elem.innerHTML = elem.innerHTML.replace(/~/g, '');
  } else {
    gsap.set(elem, { perspective: 250 });
    const text = elem.innerHTML.split('~').reduce((accArg, el) => {
      let acc = accArg;
      acc += `<div style="white-space:nowrap; overflow:hidden;">
        <div style="display:inline-block">${el}</div>
      </div>`;
      return acc;
    }, '');
    elem.innerHTML = text;
    const n = 0.4 / elem.querySelectorAll('div>div').length;
    const tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        triggerHook: 0.9,
        trigger: elem,
        start: '0% bottom',
      },
    });
    // tl.fromTo(
    //   elem.querySelectorAll('div>div'),
    //   {
    //     y: 0,
    //     z: 0.01,
    //     rotationX: -90,
    //     rotationY: 0,
    //     rotationZ: 0,
    //   },
    //   {
    //     y: 0,
    //     z: 0.01,
    //     rotationX: 0,
    //     rotationY: 0.01,
    //     rotationZ: 0,
    //     duration: 0.9,
    //     stagger: 0.075,
    //     ease: 'power4.out',
    //   },
    // );
    elem.querySelectorAll('div>div').forEach(((t, i) => {
      tl.fromTo(t, {
        y: 0,
        z: 0.01,
        rotationX: -90,
        rotationY: 0,
        rotationZ: 0,
      }, {
        y: 0,
        z: 0.01,
        rotationX: 0,
        rotationY: 0.01,
        rotationZ: 0,
        duration: 0.9,
      }, 0.1 + n * i);
      tl.fromTo(t, {
        autoAlpha: 0,
      }, {
        autoAlpha: 1,
        ease: 'power4.out',
        duration: 1,
      }, 0.1 + n * i);
    }
    ));
  }
});
