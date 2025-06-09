import type { PaletteFunction } from "../palette";

export type BasePalette = Record<string, string | PaletteFunction> & {
  blackOpacity: PaletteFunction;
  whiteOpacity: PaletteFunction;
  [key: string]: PaletteFunction;
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
  warningText: string;
  placeholder: string;
}

export interface ThemeObject extends Record<string, unknown> {
  name: string;
  palette: BasePalette;
  spacing: number;
  space: string[];

  colors: Partial<Colors>;

  disabled: {
    background: string;
  };

  zIndex: {
    smallOverlay: number;
    overlay: number;
    popover: number;
    nav: number;
    globalNav: number;
    modal: number;
    header: number;
    fullScreenModal: number;
    notification: number;
    aboveAll: number;
  };

  compatibility: Record<string, string | undefined>;
}
