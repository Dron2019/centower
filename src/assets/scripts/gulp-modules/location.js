/* eslint-disable no-undef */
function handleMapLegendOpening() {
  const legend = document.querySelector('[data-mob-accordeon]');
  const legendTop = legend.querySelector('.map__legend-title');
  const markersText = legend.querySelectorAll('.map__legend-marker-text');
  const percentToScale = document.documentElement.clientWidth > 1680 ? 24 : 20;
  gsap.set(legendTop, { yPercent: -100 });
  gsap.set(markersText, { autoAlpha: 0 });
  gsap.set(legend, { clipPath: `polygon(0% 0%, ${percentToScale}% 0%, ${percentToScale}% 100%, 0% 100%)`, webkitClipPath: `polygon(0% 0%, ${percentToScale}% 0%, ${percentToScale}% 100%, 0% 100%)` });
  legend.addEventListener('mouseenter', () => {
    gsap.to(legendTop, { yPercent: 0 });
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
  });
  legend.addEventListener('mouseleave', () => {
    gsap.to(legendTop, { yPercent: -100 });
    gsap.to(markersText, { autoAlpha: 0 });
    gsap.fromTo(
      legend,
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', webkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
      { clipPath: `polygon(0% 0%, ${percentToScale}% 0%, ${percentToScale}% 100%, 0% 100%)`, webkitClipPath: `polygon(0% 0%, ${percentToScale}% 0%, ${percentToScale}% 100%, 0% 100%)` },
    );
  });
}
handleMapLegendOpening();
