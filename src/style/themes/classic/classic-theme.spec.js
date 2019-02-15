import { assertIsSubset, baseThemeConfig, palette } from '../test-utils';
import classicTheme from '.';


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
