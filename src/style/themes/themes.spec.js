import mergeWithBase from './base';
import classicTheme from './classic';
import genericTheme from './generic';
import smallBusinessTheme from './small_business';
import mediumBusinessTheme from './medium_business';
import largeBusinessTheme from './large_business';
import colorConfig from '../color-config';
import generatePalette from '../palette';
import atOpacity from '../utils/at_opacity';

describe('Theming', () => {
  const themeNames = ['smallBusiness', 'mediumBusiness', 'largeBusiness', 'generic', 'classicCarbon'];

  const blackWithOpacity = atOpacity('#000000');
  let palette, baseTheme, baseThemeConfig;

  beforeEach(() => {
    palette = { ...generatePalette(colorConfig), atOpacity };
    baseThemeConfig = {
      colors: {
        white: '#FFFFFF',
        error: palette.errorRed,
        warning: palette.gold,
        sageLogo: palette.brilliantGreen,
        success: palette.brilliantGreenShade(20),
        info: palette.productBlueShade(3),
        text: {
          body: blackWithOpacity(0.9),
          disabled: blackWithOpacity(0.55),
          placeholder: blackWithOpacity(0.3)
        }
      }
    };
  });

  describe('base theme object', () => {
    it('matches the base theme config', () => {
      const emptyTheme = () => ({});
      expect(mergeWithBase(emptyTheme)).toEqual(baseThemeConfig);
    });
  });

  describe('smallBusinessTheme', () => {
    it('contains the base theme', () => {
      
    });

    it('contains the smallBusinessTheme config', () => {

    });
  });
});
