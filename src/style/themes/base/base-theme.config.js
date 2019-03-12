export default (palette) => {
  const { atOpacity } = palette,
      blackWithOpacity = atOpacity('#000000');

  return {
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
      info: palette.productBlueShade(3)
    },

    text: {
      color: blackWithOpacity(0.9),
      disabled: blackWithOpacity(0.55),
      placeholder: blackWithOpacity(0.3),
      size: '14px'
    },

    input: {
      borderColor: palette.slateTint(40),

      small: {
        height: '32px',
        padding: '8px'
      },
      medium: {
        height: '40px',
        padding: '11px'
      },
      large: {
        height: '48px',
        padding: '13px'
      },
      disabled: {
        backgroundColor: palette.slateTint(95),
        borderColor: palette.slateTint(80)
      },
      hover: {
        borderColor: palette.slateTint(40)
      },
      active: {
        border: `outline: 3px solid ${palette.gold};`
      }
    }
  };
};
