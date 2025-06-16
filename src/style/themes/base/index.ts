import configureBase from "./base-theme.config";
import baseColors from "../../color-config";
import atOpacity from "../../utils/at-opacity";
import { mergeDeep } from "../../utils/merge-deep";
import generatePalette from "../../palette";
import addHexSymbols from "../../utils/add-hex-symbols";
import type { BasePalette, ThemeObject } from "../theme.types";

const colors = generatePalette(baseColors);
const colorsWithHex = addHexSymbols(baseColors);
const blackOpacity = atOpacity("#000000");
const whiteOpacity = atOpacity("#FFFFFF");

const palette: BasePalette = {
  ...colors,
  ...colorsWithHex,
  blackOpacity,
  whiteOpacity,
};

const baseTheme = configureBase(palette);

export default baseTheme;

export const mergeWithBase = (
  configureTheme: (p: BasePalette) => Partial<ThemeObject>,
): Partial<ThemeObject> => {
  const themeToMergeWithBase = configureTheme(palette);

  return {
    ...mergeDeep(baseTheme, themeToMergeWithBase),
    palette,
  };
};
