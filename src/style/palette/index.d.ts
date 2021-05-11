import { ColorConfig } from "../color-config";

export interface Palette {
  [key: string]: (weight: number) => string;
}

declare function generatePalette(config: ColorConfig): Palette;
