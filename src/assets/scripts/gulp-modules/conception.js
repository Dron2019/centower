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
  pinType: document.body.style.transform ? 'transform' : 'fixed',
});
ScrollTrigger.addEventListener('fixed', () => locoScroll.update());

ScrollTrigger.refresh();


const firstScreenCircle = document.querySelectorAll('[data-first-screen-anim]');
firstScreenCircle.forEach((section) => {
  const morph3 = 'M0 0.672607C155.167 0.672607 199.5 52.0908 199.5 199C199.5 52.0908 251.222 0.672607 399 0.672607C251.222 0.672607 199.5 0.672714 199.5 0.672714C199.5 0.672714 155.167 0.672607 0 0.672607Z';
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
  tl.to(section.querySelector('path'), { attr: { d: morph3 } });
});
