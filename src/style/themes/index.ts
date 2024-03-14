import sageTheme from "./sage";
import mintTheme from "./mint";

export { sageTheme, mintTheme };
export { default as baseTheme } from "./base";
export { default as noTheme } from "./none";

export type { ThemeObject } from "./base";
export const carbonThemeList = [mintTheme, sageTheme];
