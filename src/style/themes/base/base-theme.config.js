import inputConfig from './components/input';
import inputPresentationConfig from './components/input-presentation';
import inputIconToggleConfig from './components/input-icon-toggle';

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
      borderColor: palette.slateTint(80),
      disabled: {
        backgroundColor: palette.slateTint(85)
      }
    },

    components: {
      input: inputConfig(blackWithOpacity),
      inputPresentation: inputPresentationConfig({ palette, blackWithOpacity }),
      inputIconToggle: inputIconToggleConfig({ palette, blackWithOpacity })
    }
  };
};
