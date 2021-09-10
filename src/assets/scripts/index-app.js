import LocomotiveScroll from 'locomotive-scroll';
import i18next from 'i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';
import * as yup from 'yup';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';
import Popup from '../../pug/components/popup/popup';

/** ******************************* */
/*
 * smooth scroll start
 */
global.gsap = gsap;
global.ScrollTrigger = ScrollTrigger;
global.LocomotiveScroll = LocomotiveScroll;
global.axios = axios;
global.Popup = Popup;

/* eslint-disable-next-line */
const locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  smoothMobile: false,
  // inertia: 1.1,
  multiplier: 0.55,
  lerp: 0.05,
});

global.locoScroll = locoScroll;
/*
 * smooth scroll end
 */
/** ******************************* */
/** ******************************* */
/*
 * form handlers start
 */
const forms = [
  '[data-home-contact]',
  '[data-popup-form]',
];
function changFormOverlay($form) {
  const overlay = $form.querySelector('[data-succes-overlay]');
  gsap.timeline()
    .fromTo(overlay, { scale: 0.5, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, ease: 'expo.inOut' });
  console.log(gsap);
  // overlay.style.opacity = 1;
  overlay.style.pointerEvents = 'all';
  overlay.style.visibility = 'visible';
}
forms.forEach((form) => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      succesEventName: 'succesSend',
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => {
          changFormOverlay($form);
        },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-phone]'), typeInput: 'phone' }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(17, i18next.t('field_too_short', { cnt: 17 - 5 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },

      },
    });

    $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
      $form.querySelector('[name="phone"]').focus();
    }, false);
  }
});


document.querySelectorAll('[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    const chbx = checkbox;
    chbx.value = !!chbx.checked;
  });
});
/*
 * form handlers end
 */
function disableScroll() {
  const containersScroll = document.querySelectorAll('[data-disable-page-scroll]');
  containersScroll.forEach((block) => {
    block.addEventListener('mouseenter', () => {
      locoScroll.stop();
    });
    block.addEventListener('mouseleave', () => {
      locoScroll.start();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  disableScroll();
  window.locoScroll.update();
});
/** ******************************* */


const options = {
  rootMargin: '0px',
  threshold: 0.1,
};
const lazyImages = document.querySelectorAll('img[data-src]:not(.swiper-lazy)');

lazyImages.forEach((imageArgs) => {
  const image = imageArgs;
  image.style.opacity = 0;
  image.style.transition = ' .3s ease-out';
  image.addEventListener('load', () => {
    image.style.opacity = 1;
  });
  const target = image;
  const observer = new IntersectionObserver((entries) => {
    /* Content excerpted, show below */
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        image.style.transition = '';
        observer.unobserve(target);
      }
    });
  }, options);
  observer.observe(target);
});
const lazyposter = document.querySelectorAll('[data-poster]');

lazyposter.forEach((imageArgs) => {
  const image = imageArgs;
  image.style.opacity = 0;
  image.style.transition = ' .3s ease-out';
  image.addEventListener('load', () => {
    image.style.opacity = 1;
  });
  const callback = (entries) => {
    /* Content excerpted, show below */
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.poster = lazyImage.dataset.poster;
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const target = image;
  observer.observe(target);
});


const lazyBackgrounds = document.querySelectorAll('[data-background-lazy]');
lazyBackgrounds.forEach((image) => {
  const callback = function (entries, observer) {
    /* Content excerpted, show below */
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.style.backgroundImage = `url(${lazyImage.dataset.src})`;
        observer.unobserve(lazyImage);
      }
    });
  };
  // eslint-disable-next-line no-undef
  const observer = new IntersectionObserver(callback, options);
  const target = image;
  observer.observe(target);
});

window.addEventListener('DOMContentLoaded', () => {
  locoScroll.update();
});
window.addEventListener('load', () => {
  locoScroll.update();
});

const blockForUpdatingLocoScroll = document.querySelectorAll('.page__content>*:last-child, .footer, .about-block-last, .about-block-last');
blockForUpdatingLocoScroll.forEach((image) => {
  const callback = function (entries, observer) {
    /* Content excerpted, show below */
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        locoScroll.update();
        observer.unobserve(image);
      }
    });
  };
  // eslint-disable-next-line no-undef
  const observer = new IntersectionObserver(callback, options);
  const target = image;
  observer.observe(target);
});

// eslint-disable-next-line no-unused-vars
const formCallPopup = new Popup({
  content: document.querySelector('[data-popup-with-form]'),
  call: document.querySelectorAll('[data-call-form-popup]'),
  close: document.querySelector('[data-popup-close]'),
});

document.querySelector('[data-popup-overlay-close]').addEventListener('click', () => {
  gsap.to('[data-succes-overlay]', { autoAlpha: 0 });
});

function handleVisibilityOnScroll(elems = [], direction = 'up') {
  elems.forEach((elem) => {
    switch (direction) {
      case 'down':
        elem[0].classList.add(elem[1]);
        break;
      default:
        elem[0].classList.remove(elem[1]);
        break;
    }
  });
}
const header = document.querySelector('header');
locoScroll.on('scroll', (position) => {
  if (position.scroll.y > 75) {
    handleVisibilityOnScroll([
      [header, 'not-on-top'],
    ], 'down');
  } else {
    handleVisibilityOnScroll([
      [header, 'not-on-top'],
    ]);
  }
});

/**
 * 
 * @param {NodeElement} link 
 * @description - анимация прелоадера перед переходом по внутренней ссылке
 *
 */
function handleUnloadLinks(link) {
  const isChangeLocationLink = link.href.match(/\/#|tel:|mailto:/g);
  const isBlank = link.getAttribute('target');
  link.addEventListener('click', (evt) => {
    if (isBlank === null && isChangeLocationLink === null) evt.preventDefault();
    gsap.set('.loader-wrap', { transition: 'none' });
    const timline  = gsap.timeline();
    
    if (link.closest('.page-last-section') !== null || link.closest('.conception-last-section') !== null) {
      const svgForMotion =link.closest('.page-last-section').querySelector('.ellipse-common__decor');
      console.log(svgForMotion);
      timline.add(motionPathLastLink(svgForMotion));
    }
    if (isChangeLocationLink === null) {
      timline.set(link, { pointerEvents: 'none' });
        timline.fromTo('.loader-wrap', {
          yPercent: 100,
          autoAlpha: 1,
          
        },{
          yPercent: 0,
          autoAlpha: 1,
          ease: 'power4.out',
          duration: 1.25,
        },'<+1')
        // timline.to('.loader-wrap', {
        //   autoAlpha: 1,
        //   duration: 0.45,
        //   ease: 'power4.in'
        // },'<+1')
        timline.fromTo('.right-letters', { yPercent: 0 }, { yPercent: -120 }, '<+1')
        .fromTo('.left-letters', { yPercent: 0 }, { yPercent: 120 }, '<')
        .add(() => {
          window.location = link.href;
        });
    }
  });
}

/**
 * 
 * @param {NodeElement} svg 
 * @description две звездочки движутся по указаному внутри елемента пути
 * @returns gsap.timeline
 */
function motionPathLastLink(svg) {
  const circle1 = svg.querySelector('.circle1');
  const circle2 = svg.querySelector('.circle2');
  const road1 = svg.querySelector('.road2');
  const road2 = svg.querySelector('.road2');
  console.log(MotionPathPlugin.getRawPath(road1));
  console.log(MotionPathPlugin.sliceRawPath(MotionPathPlugin.getRawPath(road1), 0, 0));
  const beginOfPath = MotionPathPlugin.sliceRawPath(MotionPathPlugin.getRawPath(road1), 0, 0)[0];
  gsap.set(circle1, { x: beginOfPath[0], y: beginOfPath[1] })
  const tl = gsap.timeline()
    .set(svg, { pointerEvents: 'none' })
    .to(circle1, {
      duration: 1,
      repeat: 0,
      // yoyo: true,
      ease: 'power1.inOut',
      motionPath: {
        path: road1,
        align: road1,
        // autoRotate: true,
        start: 0.4,
        end: 0.65,
        
        alignOrigin: [0.5, 0.5],
      },
    }).to(circle2, {
      duration: 1,
      repeat: 0,
      // yoyo: true,
      ease: 'power1.inOut',

      motionPath: {
        path: road2,
        align: road2,
        start: 0.935,
        end:  1.185,
        // autoRotate: true,
        alignOrigin: [0.5, 0.5],
      },
    }, '<')
    // .set([circle1,circle2], { transform: '' })
    .set(svg, { pointerEvents: 'all' })
    .progress(0);
    return tl;
}
document.querySelectorAll('a').forEach(handleUnloadLinks);


document.querySelectorAll('.mobile-prevent-default').forEach((el) => {
  if (document.documentElement.clientWidth < 950) {
    el.addEventListener('click', evt => evt.preventDefault());
    el.addEventListener('touchstart', evt => evt.preventDefault());
  }
});

/**Перенос блока с текстом на типичных страницах на моб версии */
function transferBlocksOnMobile() {
  if (document.documentElement.clientWidth > 576) return; 
  const blocks = document.querySelectorAll('.page-section-common-block');
  blocks.forEach((block) => {
    const svgOnFirstSection = document.querySelector('.round-image-on-first-section');
    const ellipseOnFirstSection = block.querySelector('.ellipse-common');
    if (svgOnFirstSection !== null && ellipseOnFirstSection !== null) {
      svgOnFirstSection.insertAdjacentElement('afterend', ellipseOnFirstSection)
    }
  })
};

transferBlocksOnMobile();


/* anchor links handler in locomotive scroll START */
window.addEventListener('DOMContentLoaded', () => {
  const anchor = document.querySelector(`[data-anchor="${window.location.hash}"]`);
  // eslint-disable-next-line no-undef
  if (anchor !== null && locoScroll !== undefined) {
    // eslint-disable-next-line no-undef
    console.log('here');
    locoScroll.scrollTo(anchor, { offset: -150 });
  }
});
/* anchor links handler in locomotive scroll END */