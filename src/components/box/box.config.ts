import { space } from "../../style/themes/base/base-theme.config";

export default {
  light: {
    thumb: "var(--colorsUtilityMajor300)",
    track: "var(--colorsUtilityMajor025)",
  },

  dark: {
    thumb: "var(--colorsUtilityMajor200)",
    track: "var(--colorsUtilityMajor400)",
  },

  gap: (gapValue: number | string) => {
    if (typeof gapValue === "number") {
      return space[gapValue];
    }

    return gapValue;
  },
};
