import { THEMES } from '..';

export default (palette) => {
  return (
    {
      name: THEMES.classic,

      colors: {
        base: palette.blue,
        primary: palette.blue,
        secondary: palette.navyBlue,
        tertiary: palette.productBlueTint(61)
      },

      disabled: {
        text: palette.slate
      }
    }
  );
};
