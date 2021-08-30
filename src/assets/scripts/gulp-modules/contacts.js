const pathe = document.querySelector('[data-line-test] path');
const dValueInit = pathe.getAttribute('d').split(' ');

const amplitude = 100;
// dValue[4] = +dValue[4] + Math.sin(2 * new Date().getTime());
let time = 0;
function render() {
  time += 1;
  const dValue = pathe.getAttribute('d').split(' ');
  const medVal = Array.from(dValue[6].split('C'));
  dValue[4] = +dValue[4] + (amplitude * Math.sin(time).toFixed(1));
  dValue[7] = +dValue[7] + (amplitude * Math.sin(time).toFixed(1));
  medVal[0] = +medVal[0] + (amplitude * Math.sin(time).toFixed(1));
  dValue[6] = medVal.join('C');
  gsap.to(pathe, {
    attr: {
      d: dValue.join(' '),
    },
    duration: .5,
    ease: 'none',
  });

  setTimeout(() => {
    requestAnimationFrame(render);
  }, 500);
}
render();

// const amplitude1 = 62.5;
// const path1 = document.querySelector('[data-line-test1] path');
// console.log(path1.getAttribute('d').split(' '));

// let time1 = 0;
// function render1() {
//   time1 += 1;
//   const dValue = path1.getAttribute('d').split(' ');
//   const medVal = Array.from(dValue[7].split('C'));
//   dValue[5] = +62.5 + (amplitude1 * Math.sin(time).toFixed(1));
//   dValue[8] = +62.5 + (amplitude1 * Math.sin(time).toFixed(1));
//   medVal[0] = 62.5 + (amplitude1 * Math.sin(time).toFixed(1));
//   dValue[7] = medVal.join('C');
//   gsap.to(path1, {
//     attr: {
//       d: dValue.join(' '),
//     },
//     duration: .5,
//     ease: 'linear',
//   });

//   setTimeout(() => {
//     requestAnimationFrame(render1);
//   }, 500);
// }
// render1();

window.add = 0;
function movePath(svg) {
  const amplitude1 = 62.5;
  const path1 = svg.querySelector('path');
  let time1 = 0;
  console.log(path1.getAttribute('d').split(' '));
  function render1() {
    time1 += 1;
    const dValue = path1.getAttribute('d').split(' ');
    const medVal = Array.from(dValue[7].split('C'));
    dValue[5] = +62.5 + (amplitude1 * Math.sin(window.add ).toFixed(1));
    dValue[8] = +62.5 + (amplitude1 * Math.sin(window.add ).toFixed(1));
    medVal[0] = 62.5 + (amplitude1 * Math.sin(window.add ).toFixed(1));
    dValue[7] = medVal.join('C');
    gsap.to(path1, {
      attr: {
        d: dValue.join(' '),
      },
      duration: 1,
      ease: 'linear',
    });
  
    setTimeout(() => {
      requestAnimationFrame(render1);
    }, 1000);
  }
  render1();
}

// movePath(document.querySelector('[data-line-test1]'));




const morph1 = `M0 125L1430 125V62.1211C1430 62.1211 1140.32 0 708.523 0C276.728 0 0 62.1211 0 62.1211V125Z`;
const morph2 = `M0 125L1430 125V62.1211C1430 62.1211 1140.32 125 708.523 125C276.728 125 0 62.1211 0 62.1211V125Z`;
gsap.timeline({ repeat: 10, yoyo: true })
  .fromTo(document.querySelector('[data-line-test1] path'), {
    attr: {
      d: morph1
    }
  }, {
    attr: {
      d: morph2
    }
  }
  
  )
