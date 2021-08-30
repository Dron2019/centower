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
    scrub: 0.3,
    markers: true,
  },
})
  .fromTo(dev3Img, {
    y: -50,
  }, {
    y: 50,
  })
  .fromTo('.developer-paragraph-with-text img', {
    y: -50,
  }, {
    y: 50,
  }, '<');
gsap.set('.developer-img2 img', { scale: 1.2 });
gsap.timeline({
  ease: 'none',
  scrollTrigger: {
    trigger: '.developer-img2',
    scrub: 0.25,
    markers: true,
  },
})
  .fromTo('.developer-img2 img', {
    y: -50,
  }, {
    y: 50,
  });

gsap.timeline({
  ease: 'none',
  scrollTrigger: {
    trigger: '.dev-mask2',
    scrub: 0.25,
    markers: true,
  },
})
  .fromTo('[mask="url(#mask1)"] path', {
    y: -50,
  }, {
    y: 50,
  });


function timelineParams(params, trigger = undefined) {
  const initialParams = {
    scrollTrigger: {
      trigger,
      scrub: 0.25,
      markers: true,
    },
  };
  return Object.assign(initialParams, params);
};