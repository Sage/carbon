export default (palette) => {
  return {
    name: 'classic',

    spacing: 5,

    colors: {
      base: palette.productGreen,
      primary: palette.productGreenShade(21),
      secondary: palette.productGreenShade(41),
      tertiary: palette.productGreenShade(61),

      // generic
      baseBlue: '#255BC7',
      greyDarkBlue50: '#8099a4',
      warning: palette.gold
    },

    disabled: {
      text: palette.slate,
      input: '#1e499f',
      disabled: '#b3c2c8',
      border: '#4d7080'
    }
  };
};
