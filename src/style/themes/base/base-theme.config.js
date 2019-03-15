export default (palette) => {
  const { atOpacity } = palette,
      blackWithOpacity = atOpacity('#000000');

  const config = {
    colors: {
      // main
      primary: palette.genericGreenTint(15),
      secondary: palette.genericGreenShade(35),
      tertiary: palette.genericGreenShade(55),
      brand: palette.brilliantGreen,

      // generic
      white: '#FFFFFF',

      // status
      error: palette.errorRed,
      warning: palette.gold,
      success: palette.brilliantGreenShade(20),
      info: palette.productBlueShade(3),
      disabled: {
        background: blackWithOpacity(0.1),
        border: palette.slateTint(80),
        disabled: blackWithOpacity(0.55),
        input: palette.slateTint(95)
      },
      destructive: {
        hover: palette.errorRedShade(20)
      }
    },

    text: {
      color: blackWithOpacity(0.9),
      placeholder: blackWithOpacity(0.3),
      size: '14px'
    },

    button: {
      disabled: {
        background: blackWithOpacity(0.1)
      },
      destructive: {
        hover: palette.errorRedShade(20)
      }
    }
  };

  return config;
};
