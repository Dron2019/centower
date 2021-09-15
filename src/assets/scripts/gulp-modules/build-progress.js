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
console.log(buildPopup);
const popupContent = new Proxy(popupContentInit, {
  set(obj, prop, value) {
    renderTargets[prop](value);
    return true;
  },
});

buildPopup.close.addEventListener('click', () =>{
  document.body.style.overflow = '';
})
cards.forEach((card) => {
  card.addEventListener('click', () => {
    requestBuildDetails(card.dataset.id, (response) => {
      popupContent.title = response.title;
      popupContent.text = response.text;
      popupContent.url = response.url;
      popupContent.date = response.date;
    });
    document.body.style.overflow = 'hidden';

  });
});

// cards[0].dispatchEvent(new Event('click'))
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


function activeStatusInCenterOfHorizontalView(){
  let xScrollDistance = 0;
  const statuses = document.querySelectorAll('.status');
  const activeStatus = document.querySelector('.status.active')
  const scrollContainer = document.querySelector('.statuses-wrapper');
  for (let i = 0; i <= statuses.length; i++) {
    if (statuses[i].classList.contains('active') || statuses[i].classList.contains('disabled')) break;
    xScrollDistance += statuses[i].scrollWidth;
  }
  xScrollDistance -= (document.documentElement.clientWidth / 2) - activeStatus.scrollWidth  / 2;
  scrollContainer.scrollTo(xScrollDistance, 0);
}
activeStatusInCenterOfHorizontalView();


document.querySelector('[data-status-anchor]').addEventListener('click',function(evt){
  locoScroll.scrollTo(document.querySelector('.build-status-section'))
});


function horizontalScrolButtons({ forwardButton, backwardButton }, elWithScroll) {
  const delta = 50;
  const scrollEl  = document.querySelector(elWithScroll);
  const right = document.querySelector(forwardButton);
  const left = document.querySelector(backwardButton);
  left.addEventListener('click', () => scrollEl.scrollTo( scrollEl.scrollLeft - delta ,0));
  right.addEventListener('click',() => scrollEl.scrollTo( scrollEl.scrollLeft + delta ,0));
}
horizontalScrolButtons({
  forwardButton: '[data-hor-scroll-right]',
  backwardButton: '[data-hor-scroll-left]',
}, '.statuses-wrapper');