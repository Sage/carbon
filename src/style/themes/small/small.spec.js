import { assertIsSubset, baseThemeConfig, palette } from '../test-utils';
import smallTheme from '.';


describe('classicTheme', () => {
  it('contains the base theme', () => {
    assertIsSubset(baseThemeConfig, smallTheme);
  });

  it('contains the smallTheme config', () => {
    const smallBusinessConfig = {
      colors: {
        base: palette.productGreen,
        primary: palette.productGreenShade(21),
        secondary: palette.productGreenShade(41),
        tertiary: palette.productGreenShade(61)
      }
    };

    assertIsSubset(smallBusinessConfig, smallTheme);
  });
});
