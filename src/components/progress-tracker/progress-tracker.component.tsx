import React from "react";
import { MarginProps } from "styled-system";
import useLocale from "../../hooks/__internal__/useLocale";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import {
  StyledProgressBar,
  InnerBar,
  StyledValuesLabel,
  StyledProgressTracker,
  StyledValue,
  StyledDescription,
} from "./progress-tracker.style";

export interface ProgressTrackerProps extends MarginProps, TagProps {
  /** Size of the progress bar. */
  size?: "small" | "medium" | "large";
  /** Length of the component, any valid css string. */
  length?: string;
  /** Current progress (percentage). */
  progress?: number;
  /** Flag to control error state. */
  error?: boolean;
  /** Value to add a description to the label */
  description?: string;
  /** Value to display as current progress. */
  currentProgressLabel?: string;
  /** Value to display as the maximum progress limit. */
  maxProgressLabel?: string;
  /** Value of the preposition defined between Value1 and Value2 on the label. */
  customValuePreposition?: string;
  /**
   * The position the value label are rendered in.
   */
  labelsPosition?: "top" | "bottom" | "left";
  /** Label width when position is "left" */
  labelWidth?: string;
}

const ProgressTracker = ({
  size = "medium",
  length = "256px",
  error = false,
  progress = 0,
  description,
  currentProgressLabel,
  customValuePreposition,
  maxProgressLabel,
  labelsPosition = "top",
  labelWidth,
  ...rest
}: ProgressTrackerProps) => {
  const l = useLocale();
  const prefixLabels = labelsPosition !== "bottom";

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
      <StyledValuesLabel
        data-role="values-label"
        labelsPosition={labelsPosition}
        size={size}
        labelWidth={labelWidth}
      >
        <StyledValue data-element="current-progress-label">
          {displayedCurrentProgressLabel}
        </StyledValue>

        {displayedMaxProgressLabel && (
          <>
            <span data-element="custom-preposition">
              {customValuePreposition || l.progressTracker.of()}
            </span>
            <StyledValue data-element="max-progress-label">
              {displayedMaxProgressLabel}
            </StyledValue>
          </>
        )}

        {description && (
          <StyledDescription data-element="progress-tracker-description">
            {description}
          </StyledDescription>
        )}
      </StyledValuesLabel>
    );
  };

  return (
    <StyledProgressTracker
      length={length}
      {...rest}
      {...tagComponent("progress-bar", rest)}
      labelsPosition={labelsPosition}
    >
      {prefixLabels && renderValueLabels()}
      <StyledProgressBar
        data-role="progress-bar"
        progress={progress}
        error={error}
        aria-hidden="true"
      >
        <InnerBar
          data-element="inner-bar"
          data-role="inner-bar"
          size={size}
          progress={progress}
          error={error}
        />
      </StyledProgressBar>
      {!prefixLabels && renderValueLabels()}
    </StyledProgressTracker>
  );
};

ProgressTracker.displayName = "ProgressTracker";

export default ProgressTracker;
