import { THEMES } from '..';

export default (palette) => {
  return (
    {
      name: THEMES.large,

      colors: {
        base: palette.amethyst,
        primary: palette.amethystTint(10),
        secondary: palette.amethystShade(10),
        tertiary: palette.amethystShade(30),
        whiteMix: palette.amethystTint(90)
      }
    }
  );
};
