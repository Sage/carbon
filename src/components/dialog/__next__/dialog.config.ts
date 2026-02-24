/** New size type following design system naming conventions */
export type Size = "small" | "medium" | "large" | "fullScreen";

/** @deprecated Use Size instead */
export type DialogSizes =
  | "extra-small"
  | "small"
  | "medium-small"
  | "medium"
  | "medium-large"
  | "large"
  | "extra-large";

type PaddingValues = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface ContentPaddingInterface {
  p?: PaddingValues;
  py?: PaddingValues;
  px?: PaddingValues;
}

/** Minimum width for all dialog sizes */
export const DIALOG_MIN_WIDTH = "288px";

/**
 * Size values matching Carbon's defined max-width values.
 * All dialogs have a min-width of 288px.
 */
export const DIALOG_SIZE_CONFIG = {
  small: {
    maxWidth: "540px",
    minWidth: DIALOG_MIN_WIDTH,
  },
  medium: {
    maxWidth: "850px",
    minWidth: DIALOG_MIN_WIDTH,
  },
  large: {
    maxWidth: "1080px",
    minWidth: DIALOG_MIN_WIDTH,
  },
  fullScreen: {
    maxWidth: "100%",
    minWidth: "100%",
  },
} as const;

/** Default size is medium unless specified */
export const DEFAULT_SIZE: Size = "medium";
