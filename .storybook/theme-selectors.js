import classic from '../src/style/themes/classic';
import mintTheme from '../src/style/themes/mint';
import aegeanTheme from '../src/style/themes/aegean';
import none from '../src/style/themes/none';

/** These are for use with https://www.npmjs.com/package/storybook-addon-styled-component-theme */

export const dlsThemeSelector = {
  themes: [mintTheme, aegeanTheme, none],
  buttonAttributes: ['data-theme']
};

export const classicThemeSelector = {
  themes: [classic],
  singleThemeMessage: 'The theme has been locked to Classic for this story.',
  showSingleThemeButton: false
};
