export type SubtleSelectSize = "small" | "medium" | "large";

interface SubtleSelectSizeConfig {
  height: string;
  checkmarkWidth: string;
  controlFont: string;
  optionFont: string;
  inlinePadding: string;
  blockPadding: string;
}

export const subtleSelectSizeConfig: Record<
  SubtleSelectSize,
  SubtleSelectSizeConfig
> = {
  small: {
    height: "var(--global-size-s)",
    checkmarkWidth: "var(--global-size-2-xs)",
    controlFont: "var(--global-font-static-comp-medium-s)",
    optionFont: "var(--global-font-static-comp-regular-s)",
    inlinePadding: "var(--global-space-comp-s)",
    blockPadding: "var(--global-space-comp-xs)",
  },
  medium: {
    height: "var(--global-size-m)",
    checkmarkWidth: "var(--global-size-xs)",
    controlFont: "var(--global-font-static-comp-medium-m)",
    optionFont: "var(--global-font-static-comp-regular-m)",
    inlinePadding: "var(--global-space-comp-m)",
    blockPadding: "var(--global-space-comp-s)",
  },
  large: {
    height: "var(--global-size-l)",
    checkmarkWidth: "var(--global-size-xs)",
    controlFont: "var(--global-font-static-comp-medium-l)",
    optionFont: "var(--global-font-static-comp-regular-l)",
    inlinePadding: "var(--global-space-comp-l)",
    blockPadding: "var(--global-space-comp-m)",
  },
};
