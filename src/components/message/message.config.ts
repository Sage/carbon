/**
 * Primary variant colours applied to icon background.
 */
export const variantPrimaryColor = {
  error: "var(--message-contextual-error-bg-default)",
  info: "var(--message-contextual-info-bg-default)",
  success: "var(--message-contextual-success-bg-default)",
  warning: "var(--message-contextual-warning-bg-default)",
  neutral: "var(--colorsSemanticNeutral500)", // deprecated
  ai: "var(--message-contextual-ai-bg-default)",
};

/**
 * Primary variant colours applied to the border.
 */
export const variantPrimaryColorBorder = {
  error: "var(--message-contextual-error-border-default)",
  info: "var(--message-contextual-info-border-default)",
  success: "var(--message-contextual-success-border-default)",
  warning: "var(--message-contextual-warning-border-default)",
  neutral: "var(--colorsSemanticNeutral500)", // deprecated
  ai: "var(--message-contextual-ai-border-default)",
};

/**
 * Subtle variant colours applied to background.
 */
export const variantSubtleColor = {
  error: "var(--message-contextual-error-bg-alt)",
  info: "var(--message-contextual-info-bg-alt)",
  success: "var(--message-contextual-success-bg-alt)",
  warning: "var(--message-contextual-warning-bg-alt)",
  ai: "var(--message-contextual-ai-bg-alt)",
  callout: "var(--message-contextual-callout-bg-alt)",
};

/**
 * Subtle variant colours applied to icon.
 */
export const variantSubtleIconColor = {
  error: "var(--message-contextual-error-icon)",
  info: "var(--message-contextual-info-icon)",
  success: "var(--message-contextual-success-icon) ",
  warning: "var(--message-contextual-warning-icon)",
  ai: "var(--message-contextual-ai-icon)",
  callout: "var(--message-contextual-callout-icon)",
};

/**
 * Size map for medium and large sizes
 *
 * padding: Padding applied do MessageContent
 * subtleGap: Gap applied to MessageContent when variant is subtle
 * contentGap: Gap applied to MessageContentWrapper
 * closeButtonPadding: Padding applied to CloseButtonWrapper
 * contentFont: Font applied to the Message content
 * titleFont: Font applied to the Message title
 */
export const sizeMap = {
  medium: {
    padding:
      "var(--global-space-comp-m) var(--global-space-comp-s) var(--global-space-comp-m) var(--global-space-comp-m)",
    subtleGap: "var(--global-space-comp-m)",
    contentGap: "var(--global-space-comp-2-xs)",
    closeButtonPadding:
      "var(--global-space-comp-s) var(--global-space-comp-s) 0 0",
    contentFont: "var(--global-font-static-comp-regular-m)",
    titleFont: "var(--global-font-static-comp-medium-m)",
  },
  large: {
    padding:
      "var(--global-space-comp-l) var(--global-space-comp-m) var(--global-space-comp-l) var(--global-space-comp-l)",
    subtleGap: "var(--global-space-comp-l)",
    contentGap: "var(--global-space-comp-xs)",
    closeButtonPadding:
      "var(--global-space-comp-m) var(--global-space-comp-m) 0 0",
    contentFont: "var(--global-font-static-comp-regular-l)",
    titleFont: "var(--global-font-static-comp-medium-l)",
  },
};
