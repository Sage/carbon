// eslint-disable-next-line no-restricted-imports
import { color as styledColor } from "styled-system";

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
 * e.g. when the mint theme in the ThemeProvider is merged with the base theme in the defaultProps
 *
 * The purpose of this function is to intercept any palette colors, we only want styled-system to deal with CSS strings
 * and theme.colors.
 *
 * This allows us to keep our themes as plain objects.
 */

export const toColor = (theme, color) => {
  const { palette } = theme;

  const percentage = color.match(/\d+/);
  const method = color.match(/[a-zA-Z]+/);

  if (method in palette) {
    const match = palette[method];
    if (typeof match === "function") {
      const arg = ["blackOpacity", "whiteOpacity"].includes(method.toString())
        ? `0.${percentage}`
        : percentage;

      return match(arg);
    }
    return match;
  }

  return color;
};

export default ({ color, bg, backgroundColor, ...rest }) => {
  return styledColor({
    ...rest,
    ...(color && { color: toColor(rest.theme, color) }),
    ...((bg || backgroundColor) && {
      bg: toColor(rest.theme, bg || backgroundColor),
    }),
  });
};
