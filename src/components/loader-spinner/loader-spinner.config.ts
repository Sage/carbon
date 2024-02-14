type LoaderSpinnerSizes =
  | "extra-small"
  | "small"
  | "medium"
  | "large"
  | "extra-large";

type LoaderSpinnerVariants =
  | "action"
  | "neutral"
  | "inverse"
  | "gradient-grey"
  | "gradient-white";

const LOADER_SPINNER_SIZES: LoaderSpinnerSizes[] = [
  "extra-small",
  "small",
  "medium",
  "large",
  "extra-large",
];

const LOADER_SPINNER_VARIANTS: LoaderSpinnerVariants[] = [
  "action",
  "neutral",
  "inverse",
  "gradient-grey",
  "gradient-white",
];

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
