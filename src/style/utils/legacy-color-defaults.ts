import baseColors from "../color-config";
import generatePalette from "../palette";
import type { PaletteFunction } from "../palette";
import addHexSymbols from "./add-hex-symbols";
import atOpacity from "./at-opacity";

// Keep public legacy color aliases working without constructing a legacy theme.
// New APIs should use design tokens directly.
const paletteFunctions = generatePalette(baseColors);
const paletteColors = addHexSymbols(baseColors);

export const defaultPalette: Record<string, string | PaletteFunction> = {
  ...paletteFunctions,
  ...paletteColors,
  blackOpacity: atOpacity("#000000"),
  whiteOpacity: atOpacity("#FFFFFF"),
};

export const defaultColors = {
  primary: paletteFunctions.genericGreenShade(15),
  secondary: paletteFunctions.genericGreenShade(35),
  tertiary: paletteFunctions.genericGreenShade(55),
  loadingBarBackground: paletteFunctions.genericGreenTint(70),
  white: "#FFFFFF",
  error: paletteColors.errorRed,
  focus: paletteColors.gold,
  info: paletteFunctions.productBlueShade(3),
  warning: paletteColors.carrotOrange,
  warningText: paletteFunctions.carrotOrangeShade(20),
  destructive: { hover: paletteFunctions.errorRedShade(20) },
  placeholder: atOpacity("#000000")("0.55"),
};
