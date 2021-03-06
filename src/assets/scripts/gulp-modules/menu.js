/* eslint-disable no-undef */
const menuImage = document.querySelector('[data-menu-img]');
const headLinks = document.querySelectorAll('[data-head-link]');
const subGroups = document.querySelectorAll('[data-subgroup-name]');
const WIDTH = document.documentElement.clientWidth;
let isAnimating = false;
headLinks.forEach((link) => {
  link.addEventListener('mouseenter', function menuFirstEffect() {
    gsap.to(menuImage, { width: '100%' });
    link.removeEventListener('mouseenter', menuFirstEffect);
  });
  link.addEventListener('mouseenter', () => {
    if (link.dataset.headLink.length > 0 && isAnimating === false) {
      const subGroup = document.querySelector(`[data-subgroup-name='${link.dataset.headLink}']`);
      if (WIDTH < 576) {
        link.insertAdjacentElement('afterend', subGroup);
      }
      isAnimating = true;
      gsap.timeline()
        .timeScale(2)
        .set(subGroups, { autoAlpha: 0, display: 'none' }, '<')
        .set(document.querySelectorAll('.plus-vert-line'), { autoAlpha: 1 })
        .set(subGroup, { display: '' })
        .to(subGroup, { autoAlpha: 1 })
        .fromTo(
          subGroup.querySelectorAll('a'),
          { autoAlpha: 0, xPercent: -10 },
          {
            autoAlpha: 1,
            xPercent: 0,
            clearProps: 'all',
            stagger: 0.1,
          },
          '<',
        )
        .to(link.querySelector('.plus-vert-line'), { autoAlpha: 0 }, '<')
        .add(() => {
          isAnimating = false;
        });
    }
  });
});

/** CALL MENU */
const callMenu = document.querySelector('[data-menu-call]');
const menu = document.querySelector('[data-menu]');
const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

const menuTransitions = {
  opening: () => {
    callMenu.classList.add('opened');
    const tl = gsap.timeline();
    tl.add(()=>{
      callMenu.disabled = true;
    });
    if (isFirefox) {
      tl.fromTo(menu,
        { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' },
        { clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)', ease: 'power4.inOut', duration: 1 });
    } else {
      tl.fromTo(menu,
        { webkitClipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' },
        { webkitClipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)', ease: 'power4.inOut', duration: 1 });
    }
    tl.fromTo(menu.querySelector('.menu__image-fixed img'), { autoAlpha: 0, x: 50 }, { autoAlpha: 1, x: 0 }, '<+0.5');
    tl.fromTo(menu.querySelector('.menu__soc-icons-wrap'), { autoAlpha: 0, x: 50 }, { autoAlpha: 1, x: 0 }, '<');
    tl.fromTo(menu.querySelectorAll('.menu__head-links li'),
      { autoAlpha: 0, x: 35 },
      {
        autoAlpha: 1,
        x: 0,
        ease: 'power4.out',
        stagger: 0.075,
        duration: 0.75,
      }, '<');
    /**?????????? ?????????????????? ???????????? */
    tl.add(() => {
      document.querySelector('[data-call-menu-span]').textContent = callMenu.dataset.whenOpened;
    },'<');
    tl.fromTo('[data-close-icon]', { autoAlpha: 0 },{ autoAlpha: 1, duration: 1 },'<');
    tl.to('[data-open-icon]', { autoAlpha: 0, duration: 0.05 }, '<');
    tl.to(
      document.querySelector('[data-menu-call] rect:not(.hover-bg)'),
      {
        fill: 'rgba(0,0,0,0)',
        stroke: 'rgba(152, 152, 152, 1)',
        duration: 0.05
      },
      '<',
      );
      tl.add(()=>{
        setTimeout(() => {
          callMenu.disabled = false;
        }, 700);
      })
      /**?????????? ?????????????????? ???????????? END */
  },
  closing: () => {
    callMenu.classList.remove('opened');
    const tl = gsap.timeline();
    tl.add(()=>{
      callMenu.disabled = true;
    })
    if (isFirefox) {
      tl.fromTo(menu,
        { clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)' },
        { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', ease: 'power4.inOut', duration: 1.5 });
    } else {
      tl.fromTo(menu,
        { webkitClipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)' },
        { webkitClipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', ease: 'power4.inOut', duration: 1.5 });
    }
    tl.fromTo(menu.querySelector('.menu__image-fixed img'), { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: 50 }, '<');
    tl.fromTo(menu.querySelector('.menu__soc-icons-wrap'), { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: 50 }, '<');
    tl.fromTo(
      menu.querySelectorAll('.menu__head-links li'),
      { autoAlpha: 1, x: 0 },
      {
        autoAlpha: 0,
        x: 35,
        ease: 'power4.out',
        stagger: 0.075,
        duration: 0.75,
      },
      '<',
    );
    tl.add(() => {
      document.querySelector('[data-call-menu-span]').textContent = callMenu.dataset.whenClosed;
    },'<');
    tl.fromTo('[data-close-icon]', { autoAlpha: 1 },{ autoAlpha: 0, duration: 0.05 },'<');
    tl.to('[data-open-icon]', { autoAlpha: 1, duration: 0.05 }, '<');
    tl.to(
      document.querySelector('[data-menu-call] rect:not(.hover-bg)'),
      {
        fill: 'rgb(217, 180, 143)',
        stroke: 'rgba(152, 152, 152, 0)',
        duration: 0.05
      },
      '<',
    );
    tl.add(()=>{
      setTimeout(() => {
        callMenu.disabled = false;
      }, 700);
    })
  },
};
callMenu.addEventListener('click', () => {
  // menu.classList.toggle('opened');
  if (!menu.classList.contains('opened')) {
    menuTransitions.opening();
    menu.classList.add('opened');
  } else {
    menuTransitions.closing();
    setTimeout(() => {
      menu.classList.remove('opened');
    }, 2000);
  }
});


const svgs = document.querySelectorAll('[data-motion-svg]');
// locoScroll.destroy();

svgs.forEach((svg) => {
  if (svg.closest('.page-last-section') !== null || svg.closest('.conception-last-section')) return;
  const circle1 = svg.querySelector('.circle1');
  const circle2 = svg.querySelector('.circle2');
  const road1 = svg.querySelector('.road2');
  const road2 = svg.querySelector('.road2');
  const duration = 7;
  const easing = 'linear';
  const tl = gsap.timeline({ paused: true })
    .set(svg, { pointerEvents: 'none' })
    .to(circle1, {
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: easing,
      motionPath: {
        path: road1,
        align: road1,
        // autoRotate: true,
        start: 0.4,
        end: 1.4,
        alignOrigin: [0.5, 0.5],
      },
    }).to(circle2, {
      duration: duration,
      repeat: -1,
      yoyo: true,
      ease: easing,

      motionPath: {
        path: road2,
        align: road2,
        start: 0.94,
        end: 1.94,
        // autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
    }, '<')
    .set(svg, { pointerEvents: 'all' })
    .progress(0);
  svg.closest('.ellipse-common').addEventListener('mouseenter', () => {
    tl.play();
    // tl.resume();
  });
  svg.closest('.ellipse-common').addEventListener('mouseleave', () => {
    tl.pause();
  });
});


/** Mobile callback popup */
function mobPopupHandler() {
  function close(el) {
    gsap.to(el, { autoAlpha: 0 });
  }
  function open(el) {
    gsap.to(el, { autoAlpha: 1 });
  }
  const popup = document.querySelector('[data-mobile-callback-popup]');
  const call = document.querySelectorAll('[data-call-mobile-callback-popup]');
  const closeEl = document.querySelector('[data-mobile-callback-close]');
  closeEl.addEventListener('click', () => close(popup));
  call.forEach(el => el.addEventListener('click', () => open(popup)));
  call.forEach(el => el.addEventListener('touchstart', () => open(popup)));
}

mobPopupHandler();
// document.querySelector('[data-call-mobile-callback-popup]').dispatchEvent(new Event('click'));
// document.querySelector('[data-call-form-popup]').dispatchEvent(new Event('click'));
// document.querySelector('.succes-overlay').style.opacity = 1;
// document.querySelector('.succes-overlay').style.pointerEvents = 'all';