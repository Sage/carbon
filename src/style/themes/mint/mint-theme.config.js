export default (palette) => {
  return {
    name: "mint",

    colors: {
      base: palette.productGreen,
      primary: palette.productGreenShade(25),
      secondary: palette.productGreenShade(45),
      tertiary: palette.productGreenShade(65),
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
      };
    },
  };
};
