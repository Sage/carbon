import { ThemeObject } from "../base";
import { BasePalette } from "../base/base-theme.config";

export default (palette: BasePalette): Partial<ThemeObject> => {
  return {
    name: "aegean",

    colors: {
      primary: palette.productBlueShade(3),
      secondary: palette.productBlueShade(23),
      tertiary: palette.productBlueShade(43),
      loadingBarBackground: palette.productBlueTint(70),
    },

    get compatibility() {
      return {
        colorsActionMajor150: this?.colors?.loadingBarBackground,
        colorsActionMajor500: this?.colors?.primary,
        colorsActionMajor600: this?.colors?.secondary,
        colorsActionMajor700: this?.colors?.tertiary,

        colorsComponentsMenuAutumnStandard600: this?.colors?.primary,
        colorsComponentsMenuSpringChild600: this?.colors?.primary,
        colorsComponentsMenuAutumnChild600: this?.colors?.primary,
        colorsComponentsMenuSummerChild600: this?.colors?.primary,
        colorsComponentsMenuWinterChild600: this?.colors?.primary,
        colorsComponentsMenuSpringChildAlt600: this?.colors?.primary,
        colorsComponentsMenuAutumnChildAlt600: this?.colors?.primary,
        colorsComponentsMenuWinterChildAlt600: this?.colors?.primary,
        colorsComponentsMenuSummerChildAlt600: this?.colors?.primary,

        colorsBaseTheme: this?.colors?.primary,
      };
    },
  };
};
