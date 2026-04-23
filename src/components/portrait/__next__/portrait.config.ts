import { PortraitShapes, PortraitSizes } from "./portrait.component";

export const PORTRAIT_SHAPES: PortraitShapes[] = ["circle", "square"];
export const PORTRAIT_SIZES: PortraitSizes[] = [
  "XS",
  "S",
  "M",
  "ML",
  "L",
  "XL",
  "XXL",
];
type PortraitSizeParams = Record<
  PortraitSizes,
  { dimensions: number; iconDimensions: number }
>;
export const PORTRAIT_SIZE_PARAMS: PortraitSizeParams = {
  XS: { dimensions: 24, iconDimensions: 16 },
  S: { dimensions: 32, iconDimensions: 20 },
  M: { dimensions: 40, iconDimensions: 24 },
  ML: { dimensions: 56, iconDimensions: 32 },
  L: { dimensions: 72, iconDimensions: 40 },
  XL: { dimensions: 104, iconDimensions: 56 },
  XXL: { dimensions: 128, iconDimensions: 64 },
};
