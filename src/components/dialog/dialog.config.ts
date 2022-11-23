export const DIALOG_SIZES = [
  "auto",
  "extra-small",
  "small",
  "medium-small",
  "medium",
  "medium-large",
  "large",
  "extra-large",
] as const;
export const TOP_MARGIN = 20;
export const CONTENT_TOP_PADDING = 24;
export const HORIZONTAL_PADDING = 32;
export const CONTENT_BOTTOM_PADDING = 30;

export type DialogSizes = typeof DIALOG_SIZES[number];
