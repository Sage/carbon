import type { ThemeObject } from "../themes/theme.types";

/**
 *
 * Converts theme properties to the string in form of css variable definitions.
 * Then this string can be used as variable definitions in global or local
 * scope, which allows for achieving compatibility when using design tokens in
 * form of CSS variables along with styled-components ThemeProvider.
 *
 */

export default (theme: ThemeObject | Record<string, string>): string =>
  Object.entries(theme)
    .map(([key, value]) => `--${key}: ${value};`)
    .join("\r\n");
