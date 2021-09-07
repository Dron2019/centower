gsap.registerPlugin(MotionPathPlugin);


const svg404 = document.querySelectorAll('.pattern-404');
const pathes404 = document.querySelectorAll('.pattern-404 .pattern-letter');
const motion404Path = document.querySelector('.pattern-path');
function multipleByRandom(digit) {
  return digit * Math.random();
}
pathes404.forEach((el, i) => {
  const bottomValue = multipleByRandom(-50);
  const topAmplitudeValue = multipleByRandom(50);
  gsap.timeline({ repeat: -1, yoyo: true })
    .to(el,
      { x: i % 2 === 0 ? topAmplitudeValue : bottomValue, duration: 5 })
    .to(el,
      { x: i % 2 === 0 ? bottomValue : topAmplitudeValue, duration: 5 });
});


// gsap.to(svg404, { rotate: 360 });
// window.addEventListener('click',function(evt){

//   gsap.fromTo(svg404, { rotate: 0 }, { rotate: 360 });
// });

locoScroll.destroy();
document.querySelector('.header').classList.add('not-on-top');
