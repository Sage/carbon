import { THEMES } from '..';

export default (palette) => {
  return (
    {
      name: THEMES.small,

      colors: {
        base: palette.productGreen,
        primary: palette.productGreenShade(21),
        secondary: palette.productGreenShade(41),
        tertiary: palette.productGreenShade(61),
        whiteMix: palette.productGreenTint(90),
        hoveredTabKeyline: palette.productGreenTint(30)
      }
    }
  );
};
