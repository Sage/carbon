import tokens from "@sage/design-tokens/js/base/common";
import type { BasePalette, ThemeObject } from "../theme.types";

export const space = [
  "var(--spacing000)",
  "var(--spacing100)",
  "var(--spacing200)",
  "var(--spacing300)",
  "var(--spacing400)",
  "var(--spacing500)",
  "var(--spacing600)",
  "var(--spacing700)",
  "var(--spacing800)",
  "var(--spacing900)",
  "var(--spacing1000)",
];

export default (palette: BasePalette): ThemeObject => {
  return {
    name: "base",

    palette,

    spacing: 8,

    space,

    colors: {
      // main
      primary: palette.genericGreenShade(15),
      secondary: palette.genericGreenShade(35),
      tertiary: palette.genericGreenShade(55),
      loadingBarBackground: palette.genericGreenTint(70),

      // generic
      white: "#FFFFFF",

      // status
      error: palette.errorRed as string,
      focus: palette.gold as string,
      info: palette.productBlueShade(3),
      warning: palette.carrotOrange as string,
      warningText: palette.carrotOrangeShade(20),
      destructive: {
        hover: palette.errorRedShade(20),
      },
      placeholder: palette.blackOpacity(0.55),
    },

    disabled: {
      background: palette.slateTint(90),
    },

    zIndex: {
      smallOverlay: 10,
      overlay: 1000,
      nav: 2998,
      globalNav: 2999,
      modal: 3000,
      header: 4000,
      fullScreenModal: 5000,
      popover: 6000,
      notification: 7000,
      aboveAll: 9999,
    },

    get compatibility() {
      return {
        ...tokens,

        colorsActionMajor150: this.colors.loadingBarBackground,
        colorsActionMajor500: this.colors.primary,
        colorsActionMajor600: this.colors.secondary,

        colorsActionDisabled500: this.disabled.background,

        colorsSemanticFocus500: this.colors.focus,

        colorsSemanticNegative500: this.colors.error,
        colorsSemanticNegative600: this?.colors?.destructive?.hover,

        colorsSemanticCaution500: this.colors.warning,

        colorsSemanticInfo500: this.colors.info,
      };
    },
  };
};
