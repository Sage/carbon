import { THEMES } from '..';

export default (palette) => {
  return (
    {
      name: THEMES.medium,

      colors: {
        base: palette.productBlue,
        primary: palette.productBlueShade(3),
        secondary: palette.productBlueShade(23),
        tertiary: palette.productBlueShade(43)
      }
    }
  );
};
