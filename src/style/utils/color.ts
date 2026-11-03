import tokens from "@sage/design-tokens/js/base/common";
import type { ThemeObject } from "../themes/theme.types";

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

export const toColor = (theme: ThemeObject, color: string) => {
  if (color.startsWith("--") && color.slice(2) in tokens) {
    return `var(${color})`;
  }

  const { palette } = theme;

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
  const theme = rest.theme as ThemeObject;
  const resolveColor = (value: string) => {
    const direct = theme.colors[value as keyof ThemeObject["colors"]];
    const nested = value.split(".").reduce<unknown>((result, key) => {
      if (result && typeof result === "object")
        return (result as Record<string, unknown>)[key];
      return undefined;
    }, theme.colors);
    return (
      (typeof direct === "string" ? direct : undefined) ??
      (typeof nested === "string" ? nested : undefined) ??
      toColor(theme, value)
    );
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
