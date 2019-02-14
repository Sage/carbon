import { assertIsSubset, baseThemeConfig, palette } from '../test-utils';
import largeTheme from '.';


describe('classicTheme', () => {
  fit('contains the base theme', () => {
    assertIsSubset(baseThemeConfig, largeTheme);
  });

  it('contains the classicTheme config', () => {
    const largeBusinessConfig = {
      colors: {
        base: palette.amethyst,
        primary: palette.amethystTint(10),
        secondary: palette.amethystShade(10),
        tertiary: palette.amethystShade(30)
      }
    };

    assertIsSubset(largeBusinessConfig, largeTheme);
  });
});
