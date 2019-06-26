import { THEMES } from '..';

export default (palette) => {
  const { atOpacity } = palette,
      baseWithOpacity = atOpacity(palette.productBlue);

  return (
    {
      name: THEMES.medium,

      colors: {
        base: palette.productBlue,
        primary: palette.productBlueShade(3),
        secondary: palette.productBlueShade(23),
        tertiary: palette.productBlueShade(43),
        whiteMix: palette.productBlueTint(90),
        withOpacity: baseWithOpacity(0.55),
        hoveredTabKeyline: palette.productBlueTint(30)
      }
    }
  );
};
