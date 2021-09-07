/* eslint-disable no-undef */
function handleMapLegendOpening() {
  const WIDTH = document.documentElement.clientWidth;
  const legend = document.querySelector('[data-mob-accordeon]');
  const legendTop = legend.querySelector('.map__legend-title');
  const markersText = legend.querySelectorAll('.map__legend-marker-text');
  let percentToScale = document.documentElement.clientWidth > 1680 ? 24 : 20;
  if (WIDTH < 576) percentToScale = 0;
  const mobileOpenFilterButton = document.querySelector('[data-mobile-filter-button]');
  const mobileCloseFilerButton = document.querySelector('[data-mobile-close-legend]');
  gsap.set(legendTop, { yPercent: -100 });
  gsap.set(markersText, { autoAlpha: 0 });
  gsap.set(legend, { clipPath: `polygon(0% 0%, ${percentToScale}% 0%, ${percentToScale}% 100%, 0% 100%)`, webkitClipPath: `polygon(0% 0%, ${percentToScale}% 0%, ${percentToScale}% 100%, 0% 100%)` });
  
  if (WIDTH > 576) {
    legend.addEventListener('mouseenter', openLegend);
    legend.addEventListener('mouseleave', closeLegend);
  } else {
    mobileOpenFilterButton.addEventListener('click', openLegend);
    mobileCloseFilerButton.addEventListener('click', closeLegend);
  }
  function openLegend() {
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
    gsap.to(markersText, { autoAlpha: 0 });
    gsap.fromTo(
      legend,
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', webkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
      { clipPath: `polygon(0% 0%, ${percentToScale}% 0%, ${percentToScale}% 100%, 0% 100%)`, webkitClipPath: `polygon(0% 0%, ${percentToScale}% 0%, ${percentToScale}% 100%, 0% 100%)` },
    );
  }
}
handleMapLegendOpening();
