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
gsap.set('.developer-img3 img', { scale: 1.2 });
const dev3 = document.querySelector('.developer-img3');
const dev3Img = dev3.querySelector('img');
gsap.timeline({
  scrollTrigger: {
    trigger: dev3,
    scrub: 0.5,
    markers: true,
    end: '0% top',
  },
})
  .fromTo(dev3Img, {
    y: -50,
  }, {
    y: 50,
  });
