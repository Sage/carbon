import { createContext } from "react";

export type ScreenSizes = "small" | "large";

export interface TokensContextProps {
  /** Sets screen size to apply appropriate token set */
  screenSize: ScreenSizes;
}

export default createContext<TokensContextProps>({ screenSize: "large" });
