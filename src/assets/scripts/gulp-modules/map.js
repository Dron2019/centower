/* eslint-disable no-undef */
// Google map start
function func() {
  const script = document.createElement('script');
  let key = '';
  if (window.location.href.match(/localhost/)) key = '';
  // const key = '';
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
  document.getElementsByTagName('head')[0].appendChild(script);
}
// setTimeout(func, 1000);
const maps = document.querySelectorAll('.map');
const options = {
  rootMargin: '0px',
  threshold: 0.1,
};

maps.forEach((image) => {
  const callback = (entries, observer) => {
    /* Content excerpted, show below */
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        observer.unobserve(image);
        func();
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  const target = image;
  observer.observe(target);
});

// eslint-disable-next-line no-unused-vars
function initMap() {
  const gmarkers1 = [];
  const center = {
    lat: 48.4605169,
    lng: 35.0525155,
  };
  /** Массив, куда записываются выбраные категории */
  const choosedCategories = new Set();
  choosedCategories.add('main');
  /** Елементы, при клике на который будет происходить фильтрация */
  const filterItems = document.querySelectorAll('[data-marker]');
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,
    language: 'en',
    styles : [
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "saturation": 36
              },
              {
                  "color": "#000000"
              },
              {
                  "lightness": 40
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#000000"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 17
              },
              {
                  "weight": 1.2
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#e3b141"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#e0a64b"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#0e0d0a"
              }
          ]
      },
      {
          "featureType": "administrative.neighborhood",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#d1b995"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 21
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#12120f"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "lightness": "-77"
              },
              {
                  "gamma": "4.48"
              },
              {
                  "saturation": "24"
              },
              {
                  "weight": "0.65"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "lightness": 29
              },
              {
                  "weight": 0.2
              }
          ]
      },
      {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#f6b044"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#4f4e49"
              },
              {
                  "weight": "0.36"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#c4ac87"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "color": "#262307"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#a4875a"
              },
              {
                  "lightness": 16
              },
              {
                  "weight": "0.16"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#deb483"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 19
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#0f252e"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#080808"
              },
              {
                  "gamma": "3.14"
              },
              {
                  "weight": "1.07"
              }
          ]
      }
  ]
  });
  const filterMarkers = function (category, categoriesArray) {
    gmarkers1.forEach((el) => {
      if (categoriesArray.has(el.category) || categoriesArray.size === 1) {
        el.setMap(map);
        el.setAnimation(google.maps.Animation.DROP);
      } else {
        el.setMap(null);
      }
    });
  };
  filterItems.forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.stopImmediatePropagation();
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        choosedCategories.add(item.dataset.category);
      } else {
        choosedCategories.delete(item.dataset.category);
      }
      filterMarkers('main', choosedCategories);
    });
  });

  var baseFolder = '/wp-content/themes/centower/assets/images/markers/';
//   const baseFolder = './assets/images/markers/';
  let defaultMarkerSize = new google.maps.Size(40, 53);
  if (document.documentElement.clientWidth < 950) {
    // defaultMarkerSize = new google.maps.Size(40, 53);
  }
  const buildLogoSize = new google.maps.Size(125, 55);
  const markersAdresses = {
    main: `${baseFolder}marker-main.svg`,
    cafe: `${baseFolder}marker-cafe.svg`,
    kinder: `${baseFolder}marker-kindergarten.svg`,
    shop: `${baseFolder}marker-shop.svg`,
    sport: `${baseFolder}marker-sport.svg`,
    education: `${baseFolder}marker-education.svg`,
    meal: `${baseFolder}marker-meal.svg`,
    med: `${baseFolder}marker-medicine.svg`,
    bank: `${baseFolder}marker-bank.svg`,
  };
  const markerPopupStyle = `
        style="
        background: #2D2D2D;
        color:#fff;
        padding:5px 10px;
        font-size: 18px;
        line-height: 22px;"
        `;


  /* beautify preserve:start */
const markersData =[
    {
      content: `<div ${markerPopupStyle}>Apricot private kindergarten</div>`,
      type: 'education',
      icon: { url: markersAdresses.education, scaledSize: defaultMarkerSize },
      position: { lat: 48.465315387607184, lng: 35.057751142925454 },
    },
    {
      content: `<div ${markerPopupStyle}>Середня школа №21</div>`,
      type: 'education',
      icon: { url: markersAdresses.education, scaledSize: defaultMarkerSize },
      position: { lat: 48.46599832746873, lng: 35.035520993734906 },
    },
    {
      content: `<div ${markerPopupStyle}>Specialized School № 71</div>`,
      type: 'education',
      icon: { url: markersAdresses.education, scaledSize: defaultMarkerSize },
      position: { lat: 48.453248601385674, lng: 35.05303045487341 },
    },
    {
      content: `<div ${markerPopupStyle}>Public School № 19</div>`,
      type: 'education',
      icon: { url: markersAdresses.education, scaledSize: defaultMarkerSize },
      position: { lat: 48.47094936663253, lng: 35.04204412631592 },
    },
    {
      content: `<div ${markerPopupStyle}>Public School # 23</div>`,
      type: 'education',
      icon: { url: markersAdresses.education, scaledSize: defaultMarkerSize },
      position: { lat: 48.456664020583055, lng: 35.064875090349446 },
    },
    {
      content: `<div ${markerPopupStyle}>СЕРЕДНЯ ЗАГАЛЬНООСВІТНЯ ШКОЛА №18-ЗАГАЛЬНООСВІТНІЙ НАВЧАЛЬНИЙ ЗАКЛАД І-ІІІ СТУПЕНІВ</div>`,
      type: 'education',
      icon: { url: markersAdresses.education, scaledSize: defaultMarkerSize },
      position: { lat: 48.46161597031695, lng: 35.04504820053086 },
    },
    {
      content: `<div ${markerPopupStyle}>Частный Садик в Днепре Kids Community "ONE-SEVEN"</div>`,
      type: 'kinder',
      icon: { url: markersAdresses.kinder, scaledSize: defaultMarkerSize },
      position: { lat: 48.471336133614976, lng: 35.03685137327689 },
    },
    {
      content: `<div ${markerPopupStyle}>Pryvatnyy Sadochok Abrykos</div>`,
      type: 'kinder',
      icon: { url: markersAdresses.kinder, scaledSize: defaultMarkerSize },
      position: { lat: 48.463681795385654, lng: 35.055691210123925 },
    },
    {
      content: `<div ${markerPopupStyle}>Детский сад «Незабудка», №292</div>`,
      type: 'kinder',
      icon: { url: markersAdresses.kinder, scaledSize: defaultMarkerSize },
      position: { lat: 48.45956960171781, lng: 35.026422944201244 },
    },
    {
      content: `<div ${markerPopupStyle}>MGym Menorah Fitness</div>`,
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 48.46439387763201, lng: 35.05418917394757 },
    },
    {
      content: `<div ${markerPopupStyle}>Фитнес клуб «Титан»</div>`,
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 48.457222324039435, lng: 35.06015440703152 },
    },
    {
      content: `<div ${markerPopupStyle}>Фитнес клуб Арт Спорт (Art Sport)</div>`,
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 48.45273073669595, lng: 35.06246119771413 },
    },
    {
      content: `<div ${markerPopupStyle}>BODY SKILL</div>`,
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 48.46874754085126, lng: 35.04041334790478 },
    },
    {
      content: `<div ${markerPopupStyle}>"Fit4YoU", fitness center</div>`,
      type: 'sport',
      icon: { url: markersAdresses.sport, scaledSize: defaultMarkerSize },
      position: { lat: 48.46840609056688, lng: 35.04513403595683 },
    },
    {
      content: `<div ${markerPopupStyle}>Le Silpo</div>`,
      type: 'shop',
      icon: { url: markersAdresses.shop, scaledSize: defaultMarkerSize },
      position: { lat: 48.461132459942284, lng: 35.05051473559797 },
    },
    {
      content: `<div ${markerPopupStyle}>Silpo</div>`,
      type: 'shop',
      icon: { url: markersAdresses.shop, scaledSize: defaultMarkerSize },
      position: { lat: 48.46836345230476, lng: 35.04870817081795 },
    },
    {
      content: `<div ${markerPopupStyle}>VARUS</div>`,
      type: 'shop',
      icon: { url: markersAdresses.shop, scaledSize: defaultMarkerSize },
      position: { lat: 48.45092507828519, lng: 35.05939811503264 },
    },
    {
      content: `<div ${markerPopupStyle}>Troits'kyi market</div>`,
      type: 'shop',
      icon: { url: markersAdresses.shop, scaledSize: defaultMarkerSize },
      position: { lat: 48.460001227315786, lng: 35.04120210554774 },
    },
    {
      content: `<div ${markerPopupStyle}>ATB-Market</div>`,
      type: 'shop',
      icon: { url: markersAdresses.shop, scaledSize: defaultMarkerSize },
      position: { lat: 48.45815135871281, lng: 35.043691195611544 },
    },
    {
      content: `<div ${markerPopupStyle}>Atrium</div>`,
      type: 'shop',
      icon: { url: markersAdresses.shop, scaledSize: defaultMarkerSize },
      position: { lat: 48.458464418106765, lng: 35.05995611151711 },
    },
    {
      content: `<div ${markerPopupStyle}>MOST-City</div>`,
      type: 'shop',
      icon: { url: markersAdresses.shop, scaledSize: defaultMarkerSize },
      position: { lat: 48.4668309274389, lng: 35.05072931234366 },
    },
    {
      content: `<div ${markerPopupStyle}>Passage</div>`,
      type: 'shop',
      icon: { url: markersAdresses.shop, scaledSize: defaultMarkerSize },
      position: { lat: 48.46512358856377, lng: 35.04759649209093 },
    },
    {
      content: `<div ${markerPopupStyle}>Moya Eko Apteka</div>`,
      type: 'med',
      icon: { url: markersAdresses.med, scaledSize: defaultMarkerSize },
      position: { lat: 48.45900937395898, lng: 35.05401233723831 },
    },
    {
      content: `<div ${markerPopupStyle}>Аптека Доброго Дня</div>`,
      type: 'med',
      icon: { url: markersAdresses.med, scaledSize: defaultMarkerSize },
      position: { lat: 48.461937066199035, lng: 35.057509937931414 },
    },
    {
      content: `<div ${markerPopupStyle}>Apteka Ooo Mehafarm</div>`,
      type: 'med',
      icon: { url: markersAdresses.med, scaledSize: defaultMarkerSize },
      position: { lat: 48.46210781339058, lng: 35.044935741574605 },
    },
    {
      content: `<div ${markerPopupStyle}>Med-Servys</div>`,
      type: 'med',
      icon: { url: markersAdresses.med, scaledSize: defaultMarkerSize },
      position: { lat: 48.4674291462819, lng: 35.050858059312624 },
    },
    {
      content: `<div ${markerPopupStyle}>Аптека Медакадемии</div>`,
      type: 'med',
      icon: { url: markersAdresses.med, scaledSize: defaultMarkerSize },
      position: { lat: 48.46333148478816, lng: 35.05021432912371 },
    },
    {
      content: `<div ${markerPopupStyle}>Apteka</div>`,
      type: 'med',
      icon: { url: markersAdresses.med, scaledSize: defaultMarkerSize },
      position: { lat: 48.45863584093205, lng: 35.04373411188863 },
    },
    {
      content: `<div ${markerPopupStyle}>Mechnikov Hospital</div>`,
      type: 'med',
      icon: { url: markersAdresses.med, scaledSize: defaultMarkerSize },
      position: { lat: 48.45456526747864, lng: 35.069440403053314 },
    },
    {
      content: `<img style="background:white" src="${markersAdresses.main}">`,
      position: { lat: 48.4605169, lng: 35.0525155 },
      type: 'main',
      zIndex: 1000,
      icon: { url: markersAdresses.main, scaledSize: buildLogoSize },
    },
    {
      content: `<div ${markerPopupStyle}>DoubleDecker Cake and Coffee</div>`,
      type: 'cafe',
      icon: { url: markersAdresses.cafe, scaledSize: defaultMarkerSize },
      position: { lat: 48.46364368364381, lng: 35.048803320872345 },
    },
    {
      content: `<div ${markerPopupStyle}>CULTURIST</div>`,
      type: 'cafe',
      icon: { url: markersAdresses.cafe, scaledSize: defaultMarkerSize },
      position: { lat: 48.458535402921676, lng: 35.05878113866792 },
    },
    {
      content: `<div ${markerPopupStyle}>Cafe "nose"</div>`,
      type: 'cafe',
      icon: { url: markersAdresses.cafe, scaledSize: defaultMarkerSize },
      position: { lat: 48.45606645345308, lng: 35.05015515414826 },
    },
    {
      content: `<div ${markerPopupStyle}>Eight Coffeebar</div>`,
      type: 'cafe',
      icon: { url: markersAdresses.cafe, scaledSize: defaultMarkerSize },
      position: { lat: 48.458250803912584, lng: 35.053191414928406 },
    },
    {
      content: `<div ${markerPopupStyle}>Lyuba Kava</div>`,
      type: 'cafe',
      icon: { url: markersAdresses.cafe, scaledSize: defaultMarkerSize },
      position: { lat: 48.45825791890177, lng: 35.05206488707753 },
    },
    {
      content: `<div ${markerPopupStyle}>SHEPIT coffeebar</div>`,
      type: 'cafe',
      icon: { url: markersAdresses.cafe, scaledSize: defaultMarkerSize },
      position: { lat: 48.45740411240071, lng: 35.054071179405454 },
    },
    {
      content: `<div ${markerPopupStyle}>Try Bobry</div>`,
      type: 'cafe',
      icon: { url: markersAdresses.cafe, scaledSize: defaultMarkerSize },
      position: { lat: 48.46283976825555, lng: 35.05056285001356 },
    },
    {
      content: `<div ${markerPopupStyle}>GIANIVINO</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.45932871423038, lng: 35.056919685571 },
    },
    {
      content: `<div ${markerPopupStyle}>Reporter Restaurant&coffe </div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.462192358108304, lng: 35.0515928183175 },
    },
    {
      content: `<div ${markerPopupStyle}>Sokho Restoran I Bar </div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.46109672214478, lng: 35.05115293602935 },
    },
    {
      content: `<div ${markerPopupStyle}>Senator Restaurant</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.45948168313202, lng: 35.0534274493217 },
    },
    {
      content: `<div ${markerPopupStyle}>Balkon</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.45944610901843, lng: 35.04500531276535 },
    },
    {
      content: `<div ${markerPopupStyle}>Kafe Mendeleevʹ</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.45878442575683, lng: 35.05837344302182 },
    },
    {
      content: `<div ${markerPopupStyle}>Black Sheep</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.4621994725338, lng: 35.04885696506616 },
    },
    {
      content: `<div ${markerPopupStyle}>Anchousna Vid Chornomorky</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.4630176267448, lng: 35.05278371919109 },
    },
    {
      content: `<div ${markerPopupStyle}>Puri Chveni/Пури Чвени</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.461566283323144, lng: 35.04730128374882 },
    },
    {
      content: `<div ${markerPopupStyle}>Old Pal bar</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.461815291271115, lng: 35.04838489623351 },
    },
    {
      content: `<div ${markerPopupStyle}>Lumber Gastro Bar</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.46207852691645, lng: 35.048063031139044 },
    },
    {
      content: `<div ${markerPopupStyle}>Gianni МАГАЗИН</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.45936784586007, lng: 35.05690359233385 },
    },
    {
      content: `<div ${markerPopupStyle}>Mamoyu Klyanusʹ</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.461978924382365, lng: 35.06102346540692 },
    },
    {
      content: `<div ${markerPopupStyle}>Artist</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.4576816011424, lng: 35.0628044521776 },
    },
    {
      content: `<div ${markerPopupStyle}>Abajour</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.46016470147594, lng: 35.06429576041565 },
    },
    {
      content: `<div ${markerPopupStyle}>Dollar</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.46017893092978, lng: 35.069231025100166 },
    },
    {
      content: `<div ${markerPopupStyle}>Holyi Shef</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.45667125046294, lng: 35.05038045975157 },
    },
    {
      content: `<div ${markerPopupStyle}>Papa Carla</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.45702701001192, lng: 35.059607259088835 },
    },
    {
      content: `<div ${markerPopupStyle}>Рыночные Отношения</div>`,
     type: 'meal',
      icon: { url: markersAdresses.meal, scaledSize: defaultMarkerSize },
      position: { lat: 48.46439185459654, lng: 35.052435221497454 },
    },
    {
      content: `<div ${markerPopupStyle}>Credit Agricole Bank</div>`,
      type: 'bank',
      icon: { url: markersAdresses.bank, scaledSize: defaultMarkerSize },
      position: { lat: 48.45978880100821, lng: 35.049431147147764 },
    },
    {
      content: `<div ${markerPopupStyle}>Ukrsibbank Bnp Paribas Group</div>`,
      type: 'bank',
      icon: { url: markersAdresses.bank, scaledSize: defaultMarkerSize },
      position: { lat: 48.46400768987496, lng: 35.04832607706236 },
    },
    {
      content: `<div ${markerPopupStyle}>PrivatBank</div>`,
      type: 'bank',
      icon: { url: markersAdresses.bank, scaledSize: defaultMarkerSize },
      position: { lat: 48.46477601636916, lng: 35.05131942244082 },
    },
    {
      content: `<div ${markerPopupStyle}>Отделение ПриватБанка</div>`,
      type: 'bank',
      icon: { url: markersAdresses.bank, scaledSize: defaultMarkerSize },
      position: { lat: 48.46343143736989, lng: 35.04938823186054 },
    },
    {
      content: `<div ${markerPopupStyle}>МТБ БАНК</div>`,
      type: 'bank',
      icon: { url: markersAdresses.bank, scaledSize: defaultMarkerSize },
      position: { lat: 48.46365909346169, lng: 35.04890543421886 },
    },
    {
      content: `<div ${markerPopupStyle}>Відділення ПУМБ</div>`,
      type: 'bank',
      icon: { url: markersAdresses.bank, scaledSize: defaultMarkerSize },
      position: { lat: 48.45742663926395, lng: 35.058851065390094 },
    },
  ];  
/* beautify preserve:end */
  const infowindow = new google.maps.InfoWindow({
    content: '',
    maxWidth: 200,
  });
  markersData.forEach((marker) => {
    const category = marker.type;
    const mapMarker = new google.maps.Marker({
      map,
      category,
      zIndex: marker.zIndex || 1,
      icon: marker.icon,
      position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
    });

    google.maps.event.addListener(mapMarker, 'click', function () {
      infowindow.setContent(marker.content);
      infowindow.open(map, mapMarker);
      map.panTo(this.getPosition());
    });
    mapMarker.name = marker.type;
    gmarkers1.push(mapMarker);
  });
}

window.addEventListener('load', () => {
  /** Выдвижная панель маркеров на мобильной версии */
  const legend = document.querySelector('[data-mob-accordeon]');
  if (legend === null) return;
  const legendTitle = legend.querySelector('.map__legend-title');
  legendTitle.addEventListener('click', () => {
    legend.classList.toggle('opened');
    // добавить плавность появление блока с маркерами
    // if (legend.classList.contains('opened')) {
    //   gsap.fromTo('.map__legend-markers-wrap', { height: 0 },
    //     { height: '50vh' });
    // } else {
    //   gsap.fromTo('.map__legend-markers-wrap', { height: '50vh' }, { height: 0 });
    // }
  });
  legend.addEventListener('mouseenter', () => {
    if (locoScroll !== undefined) locoScroll.stop();
  });
  legend.addEventListener('mouseleave', () => {
    if (locoScroll !== undefined) locoScroll.start();
  });
});
