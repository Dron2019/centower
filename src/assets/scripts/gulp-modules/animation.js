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


const paralaxImages = document.querySelectorAll('[data-paralax]');
paralaxImages.forEach((image) => {
  const wrap = document.createElement('div');
  wrap.style.overflow = 'hidden';
  image.parentElement.prepend(wrap);
  gsap.set(image, { willChange: 'transform', scale: 1.1 });
  wrap.prepend(image);

  gsap.timeline({
    ease: 'none',
    scrollTrigger: {
      trigger: wrap,
      scrub: 0.5,
      // markers: true,
    },
  })
    .fromTo(image, {
      y: -35,
    }, {
      y: 35,
      ease: 'linear',
    });
});


const splitTolines = document.querySelectorAll('[data-split-to-lines]');
splitTolines.forEach((eleArgs) => {
  const elem = eleArgs;
  elem.innerHTML = elem.innerHTML.replace(/~/g, '');
  return;
  if (document.documentElement.clientWidth < 1024) {
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

const svgMaskParalax = document.querySelectorAll('[data-svg-paralax]');
svgMaskParalax.forEach((svg) => {
  // gsap.set(svg.querySelector('[mask] path'), { willChange: 'transform' });
  gsap.timeline({
    ease: 'none',
    scrollTrigger: {
      trigger: svg,
      scrub: 0.5,
      // markers: true,
    },
  })
    .fromTo(svg.querySelector('[mask] path'), {
      y: -95,
    }, {
      y: 95,
      ease: 'linear',
    });
});
