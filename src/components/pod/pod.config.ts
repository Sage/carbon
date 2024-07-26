export const POD_SIZES = [
  "extra-small",
  "small",
  "medium",
  "large",
  "extra-large",
] as const;
export const POD_ALIGNMENTS = ["left", "center", "right"] as const;
export const POD_VARIANTS = [
  "primary",
  "secondary",
  "tertiary",
  "tile",
  "transparent",
] as const;

export type PodSize = (typeof POD_SIZES)[number];
export type PodAlignment = (typeof POD_ALIGNMENTS)[number];
export type PodVariant = (typeof POD_VARIANTS)[number];
