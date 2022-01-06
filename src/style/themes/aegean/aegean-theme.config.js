import atOpacity from "../../utils/at-opacity";

export default (palette) => {
  const baseWithOpacity = atOpacity(palette.productBlue);

  return {
    name: "aegean",

    colors: {
      base: palette.productBlue,
      primary: palette.productBlueShade(3),
      secondary: palette.productBlueShade(23),
      tertiary: palette.productBlueShade(43),
      whiteMix: palette.productBlueTint(90),
      withOpacity: baseWithOpacity(0.55),
      hoveredTabKeyline: palette.productBlueTint(30),
      disabled: palette.productBlueTint(40),
      loadingBarBackground: palette.productBlueTint(70),
    },

    stepSequence: {
      completedText: palette.productBlueShade(23),
    },

    get compatibility() {
      return {
        colorsActionMajor500: this.colors.primary,
        colorsActionMajor600: this.colors.secondary,
        colorsActionMajor150: this.colors.loadingBarBackground,
      };
    },
  };
};
