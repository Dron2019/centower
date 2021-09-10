/* eslint-disable no-undef */
function handleMapLegendOpening() {
  const WIDTH = document.documentElement.clientWidth;
  const legend = document.querySelector('[data-mob-accordeon]');
  const legendTop = legend.querySelector('.map__legend-title');
  const markersText = legend.querySelectorAll('.map__legend-marker-text');
  let percentToScale = document.documentElement.clientWidth > 1680 ? 45 : 35;
  if (WIDTH < 576) percentToScale = 0;
  const mobileOpenFilterButton = document.querySelector('[data-mobile-filter-button]');
  const mobileCloseFilerButton = document.querySelector('[data-mobile-close-legend]');

  const locationLegendState = {
    status: 'close',
  };
  const locationStateProxy = new Proxy(locationLegendState, {
    set: (obj, prop, value) => {
      if (value === 'open') {
        mobileOpenFilterButton.style.display = 'none';
      } else {
        
        mobileOpenFilterButton.style.display = '';
      }
      return true;
    }
  })
  gsap.set(legendTop, { yPercent: -100 });
  gsap.set(markersText, { autoAlpha: 0 });
  gsap.set(legend, 
    { 
      clipPath: `polygon(0% 0%, ${percentToScale}% 0%, ${percentToScale}% 100%, 0% 100%)`, 
      webkitClipPath: `polygon(0% 0%, ${percentToScale}% 0%, ${percentToScale}% 100%, 0% 100%)` 
    });
  
  if (WIDTH > 576) {
    legend.addEventListener('mouseenter', openLegend);
    legend.addEventListener('mouseleave', closeLegend);
  } else {
    mobileOpenFilterButton.addEventListener('click', openLegend);
    mobileCloseFilerButton.addEventListener('click', closeLegend);
  }
  function openLegend() {
    locationStateProxy.status = 'open';
    gsap.to(markersText, { autoAlpha: 1, stagger: 0.05 });
    gsap.fromTo(
      legend,
      {
        clipPath: `polygon(0% 0%, ${percentToScale}% 0%, ${percentToScale}% 100%, 0% 100%)`,
        webkitClipPath: `polygon(0% 0%, ${percentToScale}% 0%, ${percentToScale}% 100%, 0% 100%)`,
      },
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        webkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'power4.inOut',
        duration: 1.2,
      },
    );
  }
  function closeLegend() {
    locationStateProxy.status = 'close';
    console.log('closing');
    gsap.to(markersText, { autoAlpha: 0, duration: 0.1 });
    gsap.fromTo(
      legend,
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', webkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
      { clipPath: `polygon(0% 0%, ${percentToScale}% 0%, ${percentToScale}% 100%, 0% 100%)`, webkitClipPath: `polygon(0% 0%, ${percentToScale}% 0%, ${percentToScale}% 100%, 0% 100%)` },
      '<'
    );
  }
}
handleMapLegendOpening();
