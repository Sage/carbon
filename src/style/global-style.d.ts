import { GlobalStyleComponent } from "styled-components";
import { ThemeObject } from "./themes/base";

declare const GlobalStyle: GlobalStyleComponent<
  Record<string, unknown>,
  ThemeObject
>;

export default GlobalStyle;
