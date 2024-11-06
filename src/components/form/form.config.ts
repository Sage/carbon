export const FORM_BUTTON_ALIGNMENTS = ["left", "right"] as const;
export type FormButtonAlignment = (typeof FORM_BUTTON_ALIGNMENTS)[number];
export const formSpacing = {
  0: "var(--spacing000)",
  1: "var(--spacing100)",
  2: "var(--spacing200)",
  3: "var(--spacing300)",
  4: "var(--spacing400)",
  5: "var(--spacing500)",
  6: "var(--spacing600)",
  7: "var(--spacing700)",
};
