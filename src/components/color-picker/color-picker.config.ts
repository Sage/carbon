export const COLOR_PICKER_COLORS = [
  "blue",
  "teal",
  "green",
  "lime",
  "orange",
  "red",
  "pink",
  "purple",
  "gray",
  "slate",
] as const;

export type ColorPickerColor = (typeof COLOR_PICKER_COLORS)[number];

export type ColorPickerPalette = "muted" | "rich";
