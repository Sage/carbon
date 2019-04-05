import { THEMES } from '..';

export default (palette) => {
  return (
    {
      name: THEMES.classic,

      colors: {
        base: palette.productGreen,
        primary: palette.productGreenShade(21),
        secondary: palette.productGreenShade(41),
        tertiary: palette.productGreenShade(61),

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
