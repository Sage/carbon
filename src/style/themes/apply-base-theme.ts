import baseTheme from "./base";

interface ApplyBaseThemeArgs {
  theme: object;
  [key: string]: unknown;
}

/**
 * To be used by a styled component, this util applies Carbon's base theme to the component if no theme is provided from a parent `ThemeProvider`.
 * Otherwise, it preserves the provided theme.
 *
 * @see {@link https://styled-components.com/docs/api#themeprovider | `ThemeProvider`} docs
 */
export default ({ theme, ...props }: ApplyBaseThemeArgs) => {
  return {
    // A styled component's `theme` prop defaults to an empty object if ThemeProvider is not used.
    // This ensures that the base theme is applied if no theme is provided.
    theme: Object.keys(theme).length === 0 ? baseTheme : theme,
    ...props,
  };
};
