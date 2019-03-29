import { THEMES } from '..';

export default (palette) => {
  const { atOpacity } = palette,
      blackWithOpacity = atOpacity('#000000');

  return {
    name: THEMES.base,

    colors: {
      // main
      primary: palette.genericGreenTint(15),
      secondary: palette.genericGreenShade(35),
      tertiary: palette.genericGreenShade(55),
      brand: palette.brilliantGreen,
      border: palette.slateTint(40),

      // generic
      white: '#FFFFFF',

      // status
      error: palette.errorRed,
      focus: palette.gold,
      info: palette.productBlueShade(3),
      success: palette.brilliantGreenShade(20),
      warning: palette.gold
    },

    text: {
      color: blackWithOpacity(0.9),
      placeholder: blackWithOpacity(0.3),
      size: '14px'
    },

    disabled: {
      border: palette.slateTint(80),
      disabled: blackWithOpacity(0.55),
      input: palette.slateTint(95),
      background: palette.slateTint(95)
    }
  };
};
