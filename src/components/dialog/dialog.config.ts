export const DIALOG_SIZES = [
  "auto",
  "extra-small",
  "small",
  "medium-small",
  "medium",
  "medium-large",
  "large",
  "extra-large",
  "maximise",
] as const;

export type DialogSizes = (typeof DIALOG_SIZES)[number];
