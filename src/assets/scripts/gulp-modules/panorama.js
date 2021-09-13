
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
locoScroll.scrollTo(document.querySelector('.panorama-wrapper__faq'), { 
  offset: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) * -1
});
