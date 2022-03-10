import { Palette } from "../../palette";

export interface ColorsWithHex {
  [key: string]: string;
}

type BasePalette = Palette &
  ColorsWithHex & {
    blackOpacity: (opacity: number) => string;
    whiteOpacity: (opacity: number) => string;
  };

export interface Colors {
  primary: string;
  secondary: string;
  tertiary: string;
  loadingBarBackground: string;

  // generic
  white: "#FFFFFF";

  // status
  error: string;
  focus: string;
  info: string;
  warning: string;
  destructive: {
    hover: string;
  };
}

export interface ThemeObject {
  name: string;
  palette: BasePalette;
  spacing: number;
  space: string[];

  colors: Colors;

  disabled: {
    background: string;
  };

  zIndex: {
    smallOverlay: number;
    overlay: number;
    popover: number;
    nav: number;
    modal: number;
    header: number;
    fullScreenModal: number;
    notification: number;
    aboveAll: number;
  };
}

declare const baseTheme: ThemeObject;

declare function mergeWithBase(configureTheme: ThemeObject): ThemeObject;

export default baseTheme;
export { mergeWithBase };
