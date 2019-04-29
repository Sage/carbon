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
      whiteMix: palette.genericGreenTint(90),

      // generic
      white: '#FFFFFF',

      // element
      border: palette.slateTint(40),

      // status
      error: palette.errorRed,
      focus: palette.goldTint(50),
      info: palette.productBlueShade(3),
      success: palette.brilliantGreenShade(20),
      warning: palette.carrotOrange
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
      text: blackWithOpacity(0.3),
      button: '#e6ebed',
      buttonText: 'rgba(0,0,0,.2)',
      background: palette.slateTint(90)
    },

    icon: {
      focus: palette.slateTint(20)
    },

    shadows: {
      depth1: '0 5px 5px 0 rgba(0,20,29,0.2), 0 10px 10px 0 rgba(0,20,29,0.1)',
      depth2: '0 10px 20px 0 rgba(0,20,29,0.2), 0 20px 40px 0 rgba(0,20,29,0.1)',
      depth3: '0 10px 30px 0 rgba(0,20,29,0.1), 0 30px 60px 0 rgba(0,20,29,0.1)',
      depth4: '0 10px 40px 0 rgba(0,20,29,0.04), 0 50px 80px 0 rgba(0,20,29,0.1)',
      cards: '0 3px 3px 0 rgba(0,20,29,0.2), 0 2px 4px 0 rgba(0,20,29,0.15)'
    }
  };
};
