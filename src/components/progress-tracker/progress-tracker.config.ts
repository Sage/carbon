export const progressTrackerSizeMap = {
  small: {
    gap: "var(--global-space-comp-s)",
    barHeight: "var(--global-size-5-xs)",
    barBorderRadius: "var(--global-radius-action-xs)",
    valueFont: "var(--global-font-static-comp-medium-m)",
    regularFont: "var(--global-font-static-comp-regular-m)",
  },
  medium: {
    gap: "var(--global-space-comp-s)",
    barHeight: "var(--global-size-4-xs)",
    barBorderRadius: "var(--global-radius-action-s)",
    valueFont: "var(--global-font-static-comp-medium-l)",
    regularFont: "var(--global-font-static-comp-regular-l)",
  },
  large: {
    gap: "var(--global-space-comp-m)",
    barHeight: "var(--global-size-3-xs)",
    barBorderRadius: "var(--global-radius-action-m)",
    valueFont: "var(--global-font-static-comp-medium-l)",
    regularFont: "var(--global-font-static-comp-regular-l)",
  },
};

export const progressBarVariants = {
  neutral: "var(--progress-fg-default)",
  warning: "var(--progress-fg-caution)",
  information: "var(--progress-fg-info)",
  error: "var(--progress-fg-error)",
  success: "var(--progress-fg-alt)",
};
