const smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
const settings = {
  outputStyle: 'scss', /* less || scss || sass || styl */
  columns: 24, /* number of grid columns */
  offset: '25px', /* gutter width px || % || rem */
  mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
  fields: '60px',
  container: {
    maxWidth: '1680px', /* max-width оn very large screen */
    fields: '60px', /* side fields */
  },
  breakPoints: { 
    lg: {
      width: '1200px', /* -> @media (max-width: 1100px) */
    },
    md: {
      width: '992px',
    },
    sm: {
      width: '950px',
      fields: '20px', /* set fields only if you want to change container.fields */
    },
    xs: {
      width: '575px',
      fields: '15px',
    },
    /*
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
  },
};

smartgrid('./src/assets/styles/assets', settings);
