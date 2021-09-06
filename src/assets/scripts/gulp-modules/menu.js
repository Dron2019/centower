/* eslint-disable no-undef */
const menuImage = document.querySelector('[data-menu-img]');
const headLinks = document.querySelectorAll('[data-head-link]');
const subGroups = document.querySelectorAll('[data-subgroup-name]');
let isAnimating = false;
headLinks.forEach((link) => {
  link.addEventListener('mouseenter', function menuFirstEffect() {
    gsap.to(menuImage, { width: '100%' });
    link.removeEventListener('mouseenter', menuFirstEffect);
  });
  link.addEventListener('mouseenter', () => {
    if (link.dataset.headLink.length > 0 && isAnimating === false) {
      const subGroup = document.querySelector(`[data-subgroup-name='${link.dataset.headLink}']`);
      isAnimating = true;
      gsap.timeline()
        .timeScale(2)
        .set(subGroups, { autoAlpha: 0 }, '<')
        .set(document.querySelectorAll('.plus-vert-line'), { autoAlpha: 1 })
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

const menuTransitions = {
  opening: () => {
    gsap.timeline()
      .set( callMenu, { pointerEvents: 'none' })
      .fromTo(menu,
        { webkitClipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' },
        { webkitClipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)', ease: 'power4.inOut', duration: 2 })
      .fromTo(menu.querySelector('.menu__image-fixed img'), { autoAlpha: 0, x: 50 }, { autoAlpha: 1, x: 0 }, '<+1')
      .fromTo(menu.querySelector('.menu__soc-icons-wrap'), { autoAlpha: 0, x: 50 }, { autoAlpha: 1, x: 0 }, '<')
      .fromTo(menu.querySelectorAll('.menu__head-links li'), { autoAlpha: 0, x: 35 }, { autoAlpha: 1, x: 0, ease: 'power4.out', stagger: 0.075, duration: 0.75 }, '<')
      .add(() => {
        document.querySelector('[data-call-menu-span]').textContent = callMenu.dataset.whenOpened;
      })
      .to('[data-close-icon]', { stroke: '#F3EFE9' })
      .to('[data-open-icon]', { autoAlpha: 0 }, '<')
      .to(
        document.querySelector('[data-menu-call] rect'),
        {
          fill: 'rgba(0,0,0,0)',
          stroke: 'rgba(152, 152, 152, 0.25)',
        },
        '<',
      )
      .set(callMenu, { pointerEvents: 'all' });
  },
  closing: () => {
    gsap.timeline()
      .set(callMenu, { pointerEvents: 'none' })
      .fromTo(menu,
        { webkitClipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)' },
        { webkitClipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', ease: 'power4.inOut', duration: 1.5 })
      .fromTo(menu.querySelector('.menu__image-fixed img'), { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: 50 }, '<')
      .fromTo(menu.querySelector('.menu__soc-icons-wrap'), { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: 50 }, '<')
      .fromTo(menu.querySelectorAll('.menu__head-links li'), { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: 35, ease: 'power4.out', stagger: 0.075, duration: 0.75 }, '<')
      .add(() => {
        document.querySelector('[data-call-menu-span]').textContent = callMenu.dataset.whenClosed;
      })
      .to('[data-close-icon]', { stroke: 'rgba(0,0,0,0)' })
      .to('[data-open-icon]', { autoAlpha: 1 }, '<')
      .to(
        document.querySelector('[data-menu-call] rect'),
        {
          fill: 'rgb(217, 180, 143)',
          stroke: 'rgba(152, 152, 152, 0)',
        },
        '<',
      )
      .set(callMenu, { pointerEvents: 'all' });
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
