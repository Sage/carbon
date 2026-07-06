import React from "react";
import { MarginProps } from "styled-system";
import useLocale from "../../hooks/__internal__/useLocale";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import {
  StyledProgressBar,
  StyledLabelWrapper,
  StyledProgressTracker,
  StyledValue,
  StyledValuesWrapper,
} from "./progress-tracker.style";

export type TrackerVariants =
  | "neutral"
  | "warning"
  | "information"
  | "error"
  | "success";

export interface ProgressTrackerProps extends MarginProps, TagProps {
  /** Size of the progress bar. */
  size?: "small" | "medium" | "large";
  /** Length of the component, any valid css string. */
  length?: string;
  /** Current progress (percentage). */
  progress?: number;
  /**
   * Flag to control error state.
   * @deprecated Please use variant="error" instead.
   */
  error?: boolean;
  /** Value to add a description to the label */
  description?: string;
  /** Value to display as current progress. */
  currentProgressLabel?: string;
  /** Value to display as the maximum progress limit. */
  maxProgressLabel?: string;
  /** Value of the preposition defined between Value1 and Value2 on the label. */
  customValuePreposition?: string;
  /** The position the value label are rendered in. */
  labelsPosition?: "top" | "bottom" | "left";
  /** Label width when position is "left" */
  labelWidth?: string;
  /** Variant of the progress bar */
  variant?: TrackerVariants;
}

export const ProgressTracker = ({
  size = "medium",
  length = "256px",
  error,
  progress = 0,
  description,
  currentProgressLabel,
  customValuePreposition,
  maxProgressLabel,
  labelsPosition = "top",
  labelWidth,
  variant = "neutral",
  ...rest
}: ProgressTrackerProps) => {
  const l = useLocale();
  const prefixLabels = labelsPosition !== "bottom";
  const internalVariant = error ? "error" : variant;

  const renderValueLabels = () => {
    let displayedCurrentProgressLabel, displayedMaxProgressLabel;

    if (currentProgressLabel) {
      displayedCurrentProgressLabel = currentProgressLabel;
      displayedMaxProgressLabel = maxProgressLabel || undefined;
    } else {
      displayedCurrentProgressLabel = `${progress}%`;
      displayedMaxProgressLabel = "100%";
    }

    return (
      <StyledLabelWrapper
        data-role="values-label"
        $size={size}
        $labelWidth={labelWidth}
      >
        <StyledValuesWrapper>
          <StyledValue data-element="current-progress-label" $size={size}>
            {displayedCurrentProgressLabel}
          </StyledValue>

          {displayedMaxProgressLabel && (
            <>
              <span data-element="custom-preposition">
                {customValuePreposition || l.progressTracker.of()}
              </span>
              <StyledValue data-element="max-progress-label" $size={size}>
                {displayedMaxProgressLabel}
              </StyledValue>
            </>
          )}
        </StyledValuesWrapper>

        {description && (
          <span data-element="progress-tracker-description">{description}</span>
        )}
      </StyledLabelWrapper>
    );
  };

  return (
    <StyledProgressTracker
      $length={length}
      $labelsPosition={labelsPosition}
      $size={size}
      {...rest}
      {...tagComponent("progress-bar", rest)}
    >
      {prefixLabels && renderValueLabels()}
      <StyledProgressBar
        data-role="progress-bar"
        aria-hidden="true"
        $variant={internalVariant}
        $size={size}
        $progress={progress}
      />
      {!prefixLabels && renderValueLabels()}
    </StyledProgressTracker>
  );
};

ProgressTracker.displayName = "ProgressTracker";

export default ProgressTracker;
