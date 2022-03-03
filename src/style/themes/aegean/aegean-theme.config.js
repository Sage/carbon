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
        colorsActionMajor150: this.colors.loadingBarBackground,
        colorsActionMajor500: this.colors.primary,
        colorsActionMajor600: this.colors.secondary,
        colorsActionMajor700: this.colors.tertiary,

        colorsComponentsMenuAutumnStandard600: this.colors.primary,
        colorsComponentsMenuSpringChild600: this.colors.primary,
        colorsComponentsMenuAutumnChild600: this.colors.primary,
        colorsComponentsMenuSummerChild600: this.colors.primary,
        colorsComponentsMenuWinterChild600: this.colors.primary,
        colorsComponentsMenuSpringChildAlt600: this.colors.primary,
        colorsComponentsMenuAutumnChildAlt600: this.colors.primary,
        colorsComponentsMenuWinterChildAlt600: this.colors.primary,
        colorsComponentsMenuSummerChildAlt600: this.colors.primary,

        colorsBaseTheme: this.colors.primary,
      };
    },
  };
};
