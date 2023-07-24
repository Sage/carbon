import sageTheme from "./sage";
import mintTheme from "./mint";
import aegeanTheme from "./aegean";

export { sageTheme, mintTheme, aegeanTheme };
export { default as baseTheme } from "./base";
export { default as noTheme } from "./none";

export type { ThemeObject } from "./base";
export const carbonThemeList = [mintTheme, aegeanTheme, sageTheme];
