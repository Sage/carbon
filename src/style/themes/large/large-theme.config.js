import { THEMES } from '..';

export default (palette) => {
  const { atOpacity } = palette,
      baseWithOpacity = atOpacity(palette.amethyst);

  return (
    {
      name: THEMES.large,

      colors: {
        base: palette.amethyst,
        primary: palette.amethystTint(10),
        secondary: palette.amethystShade(10),
        tertiary: palette.amethystShade(30),
        whiteMix: palette.amethystTint(90),
        withOpacity: baseWithOpacity(0.55),
        hoveredTabKeyline: palette.amethystTint(30)
      }
    }
  );
};
