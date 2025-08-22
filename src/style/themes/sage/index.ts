import tokens from "@sage/design-tokens/js/base/common";
import { mergeWithBase } from "../base";
import { BasePalette } from "../theme.types";

export default {
  ...mergeWithBase((palette: BasePalette) => ({
    colors: {
      primary: palette.productGreenShade(23.5),
      secondary: palette.productGreenShade(41),
      tertiary: palette.productGreenShade(61),
      loadingBarBackground: palette.productGreenTint(70),
    },
  })),
  compatibility: {
    ...tokens,
    tempColorsSemanticCaution600: "#C93E08",
  },
  name: "sage",
};
