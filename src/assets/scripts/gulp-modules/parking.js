@@include('../libs/smooth-scrollbar/smooth-scrollbar.js')

gsap.registerPlugin(ScrollTrigger);

// Setup
const scroller = document.querySelector('.page__inner');

const bodyScrollBar = Scrollbar.init(scroller, 
  { damping: 0.05, delegateTo: document, alwaysShowTracks: true });

ScrollTrigger.scrollerProxy(".page__inner", {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value;
    }
    return bodyScrollBar.scrollTop;
  }
});

bodyScrollBar.addListener(ScrollTrigger.update);

ScrollTrigger.defaults({ scroller: scroller });
locoScroll.destroy();
document.querySelector('.loader-wrap').remove();

// Only necessary to correct marker position - not needed in production
if (document.querySelector('.gsap-marker-scroller-start')) {		
  const markers = gsap.utils.toArray('[class *= "gsap-marker"]');	

  bodyScrollBar.addListener(({ offset }) => {  
    gsap.set(markers, { marginTop: -offset.y })
  });
}
