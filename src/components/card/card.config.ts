export const CARD_SPACING = ["small", "medium", "large"] as const;
export const CARD_ALIGNS = ["left", "center", "right"] as const;
export type CardAlign = (typeof CARD_ALIGNS)[number];
export type CardSpacing = (typeof CARD_SPACING)[number];
