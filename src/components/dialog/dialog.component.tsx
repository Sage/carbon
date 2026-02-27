import React, { forwardRef } from "react";
import type {
  DialogProps as NextDialogProps,
  DialogHandle,
  ContentPaddingInterface,
  Size,
} from "./__internal__/__next__/dialog.component";
import { Dialog as NextDialog } from "./__internal__/__next__/dialog.component";
import Logger from "../../__internal__/utils/logger";

// Legacy size values that get mapped to the new Size type
type DialogSizes =
  | "extra-small"
  | "small"
  | "medium-small"
  | "medium"
  | "medium-large"
  | "large"
  | "extra-large"
  | "auto"
  | "maximise";

export interface DialogProps extends Omit<NextDialogProps, "size"> {
  /** @deprecated Use `size="fullscreen"` instead. */
  fullscreen?: boolean;
  /** @deprecated Use `gradientKeyLine` instead. */
  highlightVariant?: string;
  /** @deprecated Use `contentPadding` instead. */
  disableContentPadding?: boolean;
  /** @deprecated */
  disableClose?: boolean;
  /** @deprecated */
  pagesStyling?: boolean;
  /**
   * Size — accepts both legacy values (extra-small, medium-small, etc.)
   * and new values (small, medium, large, fullscreen).
   */
  size?: DialogSizes | Size;
}

const mapLegacySizeToSize = (
  legacySize?: DialogSizes | Size,
  fullscreen?: boolean,
): Size => {
  if (fullscreen) return "fullscreen";
  switch (legacySize) {
    case "extra-small":
    case "small":
      return "small";
    case "medium-small":
    case "medium":
      return "medium";
    case "medium-large":
    case "large":
    case "extra-large":
      return "large";
    case "fullscreen":
      return "fullscreen";
    case "auto":
      return "fullscreen";
    case "maximise":
      return "fullscreen";
    default:
      return "medium";
  }
};

const mapHighlightVariantToGradientKeyLine = (
  highlightVariant?: string,
  gradientKeyLine?: boolean,
): boolean => {
  if (gradientKeyLine !== undefined) return gradientKeyLine;
  return highlightVariant !== undefined && highlightVariant !== "default";
};

let dialogLegacyWarned = false;
let deprecatedFullscreenTrigger = false;
let deprecatedHighlightVariantTrigger = false;
let deprecatedDisableCloseTrigger = false;
let deprecatedPagesStylingTrigger = false;

export const Dialog = forwardRef<DialogHandle, DialogProps>(
  (
    {
      disableClose,
      pagesStyling,
      fullscreen,
      highlightVariant,
      disableContentPadding,
      size: sizeProp = "medium",
      gradientKeyLine,
      ...rest
    },
    ref,
  ) => {
    if (!dialogLegacyWarned) {
      Logger.warn(
        "Warning: This version of the `Dialog` component is a migration wrapper...",
      );
      dialogLegacyWarned = true;
    }

    if (!deprecatedFullscreenTrigger && fullscreen !== undefined) {
      deprecatedFullscreenTrigger = true;
      Logger.deprecate(
        'The fullscreen prop in Dialog is deprecated. Please use size="fullscreen" instead.',
      );
    }

    if (!deprecatedHighlightVariantTrigger && highlightVariant !== undefined) {
      deprecatedHighlightVariantTrigger = true;
      Logger.deprecate(
        "The highlightVariant prop is deprecated. Please use gradientKeyLine instead.",
      );
    }

    if (!deprecatedDisableCloseTrigger && disableClose !== undefined) {
      deprecatedDisableCloseTrigger = true;
      Logger.deprecate(
        "The disableClose prop in Dialog is deprecated and will soon be removed.",
      );
    }

    if (!deprecatedPagesStylingTrigger && pagesStyling !== undefined) {
      deprecatedPagesStylingTrigger = true;
      Logger.deprecate(
        "The pagesStyling prop in Dialog is deprecated and will soon be removed.",
      );
    }

    // Map legacy props to new API
    const computedSize = mapLegacySizeToSize(sizeProp, fullscreen);
    const computedGradientKeyLine = mapHighlightVariantToGradientKeyLine(
      highlightVariant,
      gradientKeyLine,
    );

    return (
      <NextDialog
        ref={ref}
        size={computedSize}
        gradientKeyLine={computedGradientKeyLine}
        disableContentPadding={disableContentPadding}
        {...rest}
      />
    );
  },
);

Dialog.displayName = "Dialog";
export default Dialog;
export type { DialogHandle, ContentPaddingInterface };
