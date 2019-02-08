import mergeWithBase from './base';
import classicTheme from './classic';
import genericTheme from './generic';
import smallBusinessTheme from './small_business';
import mediumBusinessTheme from './medium_business';
import largeBusinessTheme from './large_business';
import colorConfig from '../color-config';
import generatePalette from '../palette';
import atOpacity from '../utils/at_opacity';

const isObject = (obj) => {
  return typeof obj === 'object' && obj !== null;
};

const assertIsSubset = (obj, comparison) => {
  if (!isObject(obj)) {
    // no further nesting, assert that values are equal
    expect(obj).toEqual(comparison);
    return;
  }

  const objKeys = Object.keys(obj);
  const comparisonKeys = Object.keys(comparison);

  objKeys.forEach((key) => {
    // assert that keys are present
    expect(comparisonKeys.includes(key)).toBeTruthy();

    // repeat for nested objects
    assertIsSubset(obj[key], comparison[key]);
  });
};

describe('Theming', () => {
  const blackWithOpacity = atOpacity('#000000');
  let palette, baseThemeConfig;

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
      assertIsSubset(baseThemeConfig, smallBusinessTheme);
    });

    it('contains the smallBusinessTheme config', () => {
      const smallBusinessConfig = {
        colors: {
          base: palette.productGreen,
          primary: palette.productGreenShade(21),
          secondary: palette.productGreenShade(41),
          tertiary: palette.productGreenShade(61)
        }
      };

      assertIsSubset(smallBusinessConfig, smallBusinessTheme);
    });
  });

  describe('mediumBusinessTheme', () => {
    it('contains the base theme', () => {
      assertIsSubset(baseThemeConfig, mediumBusinessTheme);
    });

    it('contains the mediumBusinessTheme config', () => {
      const medBusinessConfig = {
        colors: {
          base: palette.productBlue,
          primary: palette.productBlueShade(3),
          secondary: palette.productBlueShade(23),
          tertiary: palette.productBlueShade(43)
        }
      };

      assertIsSubset(medBusinessConfig, mediumBusinessTheme);
    });
  });

  describe('largeBusinessTheme', () => {
    it('contains the base theme', () => {
      assertIsSubset(baseThemeConfig, largeBusinessTheme);
    });

    it('contains the largeBusinessTheme config', () => {
      const largeBusinessConfig = {
        colors: {
          base: palette.amethyst,
          primary: palette.amethystTint(10),
          secondary: palette.amethystShade(10),
          tertiary: palette.amethystShade(30)
        }
      };

      assertIsSubset(largeBusinessConfig, largeBusinessTheme);
    });
  });

  describe('genericTheme', () => {
    it('contains the base theme', () => {
      assertIsSubset(baseThemeConfig, genericTheme);
    });

    it('contains the genericTheme config', () => {
      const genericThemeConfig = {
        colors: {
          base: palette.genericGreen,
          primary: palette.genericGreenTint(15),
          secondary: palette.genericGreenShade(35),
          tertiary: palette.genericGreenShade(55)
        }
      };

      assertIsSubset(genericThemeConfig, genericTheme);
    });
  });

  describe('classicTheme', () => {
    it('contains the base theme', () => {
      assertIsSubset(baseThemeConfig, classicTheme);
    });

    it('contains the classicTheme config', () => {
      const classicThemeConfig = {
        colors: {
          base: palette.productGreen,
          primary: palette.productGreenShade(21),
          secondary: palette.productGreenShade(41),
          tertiary: palette.productGreenShade(61)
        }
      };

      assertIsSubset(classicThemeConfig, classicTheme);
    });
  });
});
