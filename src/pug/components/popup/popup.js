/* eslint-disable linebreak-style */
import gsap from 'gsap';

/**
 * @param {Object} props
 * @namespace
 * @property {NodeElement}  props.content           - Контент попапа.
 * @property {NodeList}  props.call       - Кнопка вызова попапа
 * @property {Object}  props.styles         - Стили попапа.
 * @property {NodeElement}  [props.close]      - Кнопка закрытия.
 * @property {Function}  props.afterOpenCb - Коллбек после первого открытия попапа.
 */
export default class Popup {
  constructor(props) {
    this.call = props.call;
    this.overlayClass = 'my-popup-overlay';
    this.uniqueClass = `${this.overlayClass}-${Math.random().toString().replace('.', '')}`;
    this.styles = props.styles || {};
    this.content = props.content;
    this.close = props.close;
    this.afterOpenCb = props.afterOpenCb || function () {};
    this.init();
  }

  init() {
    document.body.insertAdjacentHTML('beforeend', this.preparePopup());
    this.mountedPopup = document.querySelector(`.${this.uniqueClass}`);
    Object.entries(this.styles).forEach((el) => {
      // eslint-disable-next-line prefer-destructuring
      this.mountedPopup.style[el[0]] = el[1];
    });
    this.addContent();
    this.handleCallButton();
    this.mountedPopup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(this.uniqueClass)) {
        this.closePopup();
      }
    });
    this.close.addEventListener('click', () => {
      this.closePopup();
    });
    this.afterOpenCb();
  }

  handleCallButton() {
    // eslint-disable-next-line no-prototype-builtins
    if (NodeList.prototype.isPrototypeOf(this.call)) {
      this.call.forEach((button) => {
        button.addEventListener('click', () => {
          this.openPopup();
        });
      });
    } else {
      this.call.addEventListener('click', () => {
        this.openPopup();
      });
    }
  }

  // handleOpeningButtons
  addContent() {
    this.mountedPopup
      .querySelector('.my-popup-content')
      .insertAdjacentElement('beforeend', this.content);
  }

  closePopup() {
    gsap.timeline()
      .timeScale(2)
      .fromTo(
        this.mountedPopup.querySelector('.my-popup-content'),
        { y: 0, autoAlpha: 1 },
        { y: -100, autoAlpha: 0 },
      )
      .fromTo(
        this.mountedPopup,
        { autoAlpha: 1 },
        { autoAlpha: 0 },
      )
      .set(this.mountedPopup, { display: 'none' });
  }

  openPopup() {
    gsap.timeline()
      .timeScale(1.5)
      .set(this.mountedPopup, { display: 'flex' })
      .fromTo(
        this.mountedPopup,
        { autoAlpha: 0 },
        { autoAlpha: 1 },
      )
      .fromTo(
        this.mountedPopup.querySelector('.my-popup-content'),
        { y: -100, autoAlpha: 0 },
        { y: 0, autoAlpha: 1 },
      )
      .add(() => {
        this.afterOpenCb();
      });
  }

  get popupStyles() {
    return `
        <style>
          .my-popup-overlay {
            position:fixed;
            display: none;
            left:0;
            top:0;
            width:100vw;
            height: 100vh;
            justify-content:center;
            align-items: center;
            z-index:1000;
          }
        </style>
      `;
  }

  preparePopup() {
    return `
        <div class="my-popup-overlay ${this.uniqueClass}">
          <div class="my-popup-content">
          </div>
        </div>
        ${this.popupStyles}
      `;
  }
}
