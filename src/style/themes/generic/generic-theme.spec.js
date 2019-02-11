import { assertIsSubset, baseThemeConfig, palette } from '../test-utils';
import genericTheme from '.';

describe('classicTheme', () => {
  it('contains the base theme', () => {
    assertIsSubset(baseThemeConfig, genericTheme);
  });

  it('contains the classicTheme config', () => {
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
