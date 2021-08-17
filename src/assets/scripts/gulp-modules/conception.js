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