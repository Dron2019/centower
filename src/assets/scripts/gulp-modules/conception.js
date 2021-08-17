/* eslint-disable no-undef */
const svgs = document.querySelectorAll('[data-motion-svg]');
// locoScroll.destroy();

svgs.forEach((svg) => {
  const circle1 = svg.querySelector('.circle1');
  const circle2 = svg.querySelector('.circle2');
  const road1 = svg.querySelector('.road1');
  const road2 = svg.querySelector('.road2');
  const tl = gsap.timeline({ paused: true })
    .to(circle1, {
      duration: 5,
      repeat: 0,
      // yoyo: true,
      ease: 'power1.inOut',
      motionPath: {
        path: road1,
        align: road1,
        // autoRotate: true,
        end: 1,
        alignOrigin: [0.5, 0.5],
      },
    }).to(circle2, {
      duration: 5,
      repeat: 0,
      // yoyo: true,
      ease: 'power1.inOut',

      motionPath: {
        path: road2,
        align: road2,
        // autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
    }, '<').progress(0);
  svg.addEventListener('mouseenter', () => {
    tl.restart();
  });
});
