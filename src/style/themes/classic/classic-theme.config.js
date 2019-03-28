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
        blue: '#255BC7'
      },

      text: {
        color: '#255bc7'
      },

      disabled: {
        input: '#1e499f',
        disabled: '#b3c2c8',
        border: '#4d7080'
      }
    }
  );
};
