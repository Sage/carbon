const LOADER_SPINNER_VARIANTS = [
  "action",
  "neutral",
  "inverse",
  "gradient-grey",
  "gradient-white",
] as const;

type LoaderSpinnerVariants = typeof LOADER_SPINNER_VARIANTS[number];

const LOADER_SPINNER_SIZES = [
  "extra-small",
  "small",
  "medium",
  "large",
  "extra-large",
] as const;

type LoaderSpinnerSizes = typeof LOADER_SPINNER_SIZES[number];

type LoaderSpinnerSizeParams = Record<
  LoaderSpinnerSizes,
  {
    wrapperDimensions: number;
    strokeWidth: number;
  }
>;

const LOADER_SPINNER_SIZE_PARAMS: LoaderSpinnerSizeParams = {
  "extra-small": { wrapperDimensions: 20, strokeWidth: 4 },
  small: { wrapperDimensions: 32, strokeWidth: 4 },
  medium: { wrapperDimensions: 56, strokeWidth: 3.3 },
  large: { wrapperDimensions: 80, strokeWidth: 3.7 },
  "extra-large": { wrapperDimensions: 104, strokeWidth: 3.7 },
};

export type { LoaderSpinnerSizes, LoaderSpinnerVariants };
export {
  LOADER_SPINNER_SIZES,
  LOADER_SPINNER_VARIANTS,
  LOADER_SPINNER_SIZE_PARAMS,
};
