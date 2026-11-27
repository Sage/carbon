import tokens from "@sage/design-tokens/js/base/common";
import { defaultColors, defaultPalette } from "./legacy-color-defaults";
import { getScaleValue, type Scale } from "./style-prop-compat";
import type { PaletteFunction } from "../palette";

type ColorTheme = {
  colors?: Scale;
  palette?: Record<string, string | PaletteFunction>;
};

/*
 * styled-system/color allows users to use a color from the theme, from the `colors` object.
 *
 * The DLS defines colors in shades or tints rather than explicitly listing all possible colours
 * e.g. goldTint10, brilliantGreenShade55
 *
 * In our palette we have methods to access these colors
 * e.g. palette.goldTint(10)
 *
 * We could use a proxy to make those calls directly on the theme however styled-components expects the theme to be a
 * plain object and does not allow us to merge a theme from a ThemeProvider with a theme defined as a defaultProp if
 * both of those have a Proxy.
 * e.g. when the none theme in the ThemeProvider is merged with the base theme in the defaultProps
 *
 * The purpose of this function is to intercept any palette colors, we only want styled-system to deal with CSS strings
 * and theme.colors.
 *
 * This allows us to keep our themes as plain objects.
 */

export const toColor = (theme: ColorTheme | undefined, color: string) => {
  if (color.startsWith("--") && color.slice(2) in tokens) {
    return `var(${color})`;
  }

  const palette: Record<string, string | PaletteFunction> =
    theme?.palette ?? defaultPalette;

  const percentage = color.match(/\d+/);
  const method = color.match(/[a-zA-Z]+/)?.toString();

  if (method && method in palette) {
    const match = palette[method];
    if (typeof match === "function") {
      const arg = ["blackOpacity", "whiteOpacity"].includes(method)
        ? `0.${percentage}`
        : percentage;

      return match(arg as string);
    }

    return match;
  }

  return color;
};

export default ({
  color,
  bg,
  backgroundColor,
  ...rest
}: Record<string, unknown>): {
  color?: string;
  backgroundColor?: string;
  opacity?: string | number;
} => {
  const theme = rest.theme as ColorTheme | undefined;
  const resolveColor = (value: string) => {
    const resolved = toColor(theme, value);
    // Preserve palette-first resolution, then the consumer's color scale.
    const scaled = getScaleValue(resolved, theme?.colors ?? defaultColors);
    return typeof scaled === "string" ? scaled : resolved;
  };
  const styles: {
    color?: string;
    backgroundColor?: string;
    opacity?: string | number;
  } = {};

  if (color) styles.color = resolveColor(color as string);
  if (bg || backgroundColor) {
    styles.backgroundColor = resolveColor(
      (bg as string) || (backgroundColor as string),
    );
  }
  if (rest.opacity !== undefined)
    styles.opacity = rest.opacity as string | number;

  return styles;
};
