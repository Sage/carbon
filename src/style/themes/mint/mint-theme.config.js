export default (palette) => {
  return {
    name: "mint",

    colors: {
      base: palette.productGreen,
      primary: palette.productGreenShade(23.5),
      secondary: palette.productGreenShade(41),
      tertiary: palette.productGreenShade(61),
      whiteMix: palette.productGreenTint(90),
      hoveredTabKeyline: palette.productGreenTint(30),
      disabled: palette.productGreenTint(40),
      loadingBarBackground: palette.productGreenTint(70),
    },

    stepSequence: {
      completedText: palette.productGreenShade(23),
    },

    get compatibility() {
      return {
        colorsActionMajor500: this.colors.primary,
        colorsActionMajor600: this.colors.secondary,
        colorsActionMajor150: this.colors.loadingBarBackground,

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
