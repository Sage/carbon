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
      info: palette.productBlueShade(3),

      text: {
        body: blackWithOpacity(0.9),
        disabled: blackWithOpacity(0.55),
        placeholder: blackWithOpacity(0.3)
      }
    },
    input: {
 
      backgroundColor: 'transparent',
      disabled: palette.slateTint(85),
      lineHeight: '16px',
      height: '32px',
      readOnly: 'transparent',
      border: palette.slateTint(80),
      color: blackWithOpacity(85),
      textHighlight: palette.slateShade(80),
      dimensions: {
        small: {
          height: '32px',
          fontSize: '14px',
          paddingLeft: '8px',
          paddingRight: '8px',
          width: '80px'
        },
        medium: {
          height: '40px',
          fontSize: '14px',
          paddingLeft: '11px',
          paddingRight: '11px',
          width: '128px'
        },
        large: {
          height: '48px',
          fontSize: '16px',
          paddingLeft: '13px',
          paddingRight: '13px',
          width: '256px'
        }
      }
    }
  };
};
