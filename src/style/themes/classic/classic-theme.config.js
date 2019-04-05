import { THEMES } from '..';

export default (palette) => {
  return (
    {
      name: THEMES.classic,

      colors: {
        base: palette.blue,
        primary: palette.blue,
        secondary: palette.navyBlue,
        tertiary: palette.productBlueTint(61),

        // generic
        greyDarkBlue50: '#8099a4'
      },

      text: {
        color: palette.blue
      },

      disabled: {
        text: palette.slate,
        input: '#1e499f',
        disabled: '#b3c2c8',
        border: '#4d7080'
      }
    }
  );
};
