gsap.registerPlugin(MotionPathPlugin);


const svg404 = document.querySelectorAll('.pattern-404');
const pathes404 = document.querySelectorAll('.pattern-404 .pattern-letter');
const motion404Path = document.querySelector('.pattern-path');

pathes404.forEach((el, i) => {

  const bottomValue = multipleByRandom(-50);
  const topAmplitudeValue = multipleByRandom(50);
  gsap.timeline({ repeat: -1 })
    .to(el,
      { x: i % 2 === 0 ? multipleByRandom(50) : multipleByRandom(-50), duration: 10 })
    .to(el,
      { x: i % 2 === 0 ? multipleByRandom(-50) : multipleByRandom(50), duration: 10 })
});

function multipleByRandom(digit) {
  return digit*Math.random();
}

// gsap.to(svg404, { rotate: 360 });
// window.addEventListener('click',function(evt){
  
//   gsap.fromTo(svg404, { rotate: 0 }, { rotate: 360 });
// });