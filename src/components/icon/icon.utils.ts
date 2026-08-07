import { ICON_COLOR_TYPES, IconColor } from "./icon.style";

const LEGACY_WHITE_COLORS = new Set([
  "white",
  "#fff",
  "#ffffff",
  "rgb(255,255,255)",
  "rgb(255, 255, 255)",
  "rgba(255,255,255,1)",
  "rgba(255, 255, 255, 1)",
]);

export const isLegacyWhiteColor = (colorValue: string): boolean =>
  LEGACY_WHITE_COLORS.has(colorValue);

export const resolveSemanticColor = (
  colorValue?: string,
): IconColor | undefined => {
  if (!colorValue) return undefined;
  if (!ICON_COLOR_TYPES.some((color) => color === colorValue)) return undefined;
  return colorValue as IconColor;
};
