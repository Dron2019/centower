
const panoramaOverlay = document.querySelector('[data-panorama-faq]');
const panoramaWrapper = document.querySelector('[data-panorama-wrapper]');
const panorama = document.querySelector('[data-panorama]');
panoramaWrapper.addEventListener('mouseenter', () => {
  panorama.style.pointerEvents = '';
});
panoramaWrapper.addEventListener('mouseleave', () => {
  panorama.style.pointerEvents = 'none';
});
panoramaOverlay.addEventListener('click', () => {
  panoramaOverlay.style.display = 'none';
});
window.addEventListener('touchstart', (evt) => {
  console.log(evt.target);
  panoramaOverlay.style.display = 'none';
  panorama.dispatchEvent(new Event('focus'))
});
window.cunter = 1;
window.addEventListener('message',function(evt){
  console.log('i recieved message');
  window.cunter++
  if (window.cunter > 2) {
    panoramaOverlay.style.display = 'none';
  }
});

if (document.documentElement.clientWidth > 575) {
  locoScroll.scrollTo(document.querySelector('.panorama-wrapper__faq'), { 
    offset: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) * -1
  });
}
