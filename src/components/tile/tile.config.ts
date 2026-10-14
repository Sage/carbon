import type {
  Roundness,
  LegacyRoundness,
  DeprecatedTileVariants,
  TileVariants,
} from "./tile.component";

export const TILE_ORIENTATIONS = ["horizontal", "vertical"];
export const TILE_THEMES = ["tile", "transparent", "active", "grey"];
export const TILE_BORDER_VARIANTS = [
  "default",
  "info",
  "selected",
  "negative",
  "positive",
  "caution",
];
export const TILE_HIGHLIGHT_VARIANTS = [
  "gradient",
  "success",
  "neutral",
  "error",
  "warning",
  "info",
  "important",
];

export const STATUS_KEYLINE_VARIANTS = [
  "ai",
  "informational",
  "positive",
  "warning",
  "negative",
  "neutral",
  "important",
];

export const HIGHLIGHT_VARIANT_TO_STATUS_KEYLINE_MAP: Record<
  (typeof TILE_HIGHLIGHT_VARIANTS)[number],
  (typeof STATUS_KEYLINE_VARIANTS)[number]
> = {
  success: "positive",
  neutral: "neutral",
  error: "negative",
  warning: "warning",
  info: "informational",
  important: "important",
  gradient: "ai",
};

export const TILE_ROUNDNESS_VALUE_MAP: Record<
  LegacyRoundness | Roundness,
  Roundness
> = {
  default: "curved",
  curved: "curved",
  moderate: "moderate",
  small: "moderate",
  large: "moderate",
};

export const TILE_VARIANT_DEPRECATION_MAP: Record<
  DeprecatedTileVariants,
  TileVariants
> = {
  tile: "standard",
  transparent: "standard",
  active: "positive",
  grey: "alt",
};
