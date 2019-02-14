import { assertIsSubset, baseThemeConfig, palette } from '../test-utils';
import mediumTheme from '.';


describe('classicTheme', () => {
  it('contains the base theme', () => {
    assertIsSubset(baseThemeConfig, mediumTheme);
  });

  it('contains the classicTheme config', () => {
    const medBusinessConfig = {
      colors: {
        base: palette.productBlue,
        primary: palette.productBlueShade(3),
        secondary: palette.productBlueShade(23),
        tertiary: palette.productBlueShade(43)
      }
    };

    assertIsSubset(medBusinessConfig, mediumTheme);
  });
});
