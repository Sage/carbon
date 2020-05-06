import { create } from '@storybook/theming';

export default create({
  base: 'light',

  colorPrimary: 'red',
  colorSecondary: '#0073C2',

  // UI
  appBg: '#F2F5F6',
  appContentBg: 'white',
  appBorderColor: '#ccd6db',

  // Typography
  fontBase: '"Lato", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'rgba(0,0,0,0.9)',
  textInverseColor: 'rgba(255,255,255,1)',

  // Toolbar default and active colors
  barTextColor: 'white',
  barSelectedColor: '#00DC00',
  barBg: '#003349',

  // Form colors
  inputBg: 'white',
  inputBorder: '#668592',
  inputTextColor: 'rgba(0,0,0,0.9)',
  inputBorderRadius: 0,

  brandTitle: 'Sage DLS in Carbon',
  brandUrl: 'https://carbon.sage.com',
  brandImage: 'carbon-by-sage-logo.png',
});
