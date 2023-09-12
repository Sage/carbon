export const PORTRAIT_SHAPES = ["circle", "square"];
type PortraitSize = "XS" | "S" | "M" | "ML" | "L" | "XL" | "XXL";
export const PORTRAIT_SIZES: PortraitSize[] = [
  "XS",
  "S",
  "M",
  "ML",
  "L",
  "XL",
  "XXL",
];
type PortraitSizeParams = Record<
  PortraitSize,
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
