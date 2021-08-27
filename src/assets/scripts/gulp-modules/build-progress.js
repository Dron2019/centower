/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
const popupContentInit = {
  title: 'Title',
  url: 'https://google.com',
};
const cards = document.querySelectorAll('[data-card]');
const popup = document.querySelector('[data-build-popup]');
const renderTargets = {
  title: () => {
  },
  text: (val) => {
    document.querySelector('[data-detail-text]').innerHTML = val;
  },
  date: (val) => {
    document.querySelector('[data-detail-date]').innerHTML = val;
  },
  url: (val) => {
    document.querySelector('[data-detail-frame]').src = val;
  },
};
const buildPopup = new Popup({
  call: cards,
  content: popup,
  close: document.querySelector('[data-detail-close]'),
});

const popupContent = new Proxy(popupContentInit, {
  set(obj, prop, value) {
    renderTargets[prop](value);
    return true;
  },
});


cards.forEach((card) => {
  card.addEventListener('click', () => {
    requestBuildDetails(card.dataset.id, (response) => {
      popupContent.title = response.title;
      popupContent.text = response.text;
      popupContent.url = response.url;
      popupContent.date = response.date;
    });
  });
});


function requestBuildDetails(id, cb = () => {}) {
  const sendData = new FormData();
  sendData.append('action', 'build');
  sendData.append('id', id);
  fetch('./static/build-test.php', {
    method: 'POST',
    body: sendData,
  })
    .then(el => el.json())
    .then((el) => {
      cb(el);
    });
}
