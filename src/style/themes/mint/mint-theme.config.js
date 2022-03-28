export default (palette) => {
  return {
    name: "mint",

    colors: {
      primary: palette.productGreenShade(23.5),
      secondary: palette.productGreenShade(41),
      tertiary: palette.productGreenShade(61),
      loadingBarBackground: palette.productGreenTint(70),
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
