import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { MarginProps } from "styled-system";
import useLocale from "../../hooks/__internal__/useLocale";
import tagComponent from "../../__internal__/utils/helpers/tags";
import {
  StyledProgressBar,
  InnerBar,
  StyledValuesLabel,
  StyledProgressTracker,
  StyledValue,
  StyledDescription,
} from "./progress-tracker.style";
import useResizeObserver from "../../hooks/__internal__/useResizeObserver";

export interface ProgressTrackerProps extends MarginProps {
  /** Specifies an aria label to the component */
  "aria-label"?: string;
  /** Specifies the aria describedby for the component */
  "aria-describedby"?: string;
  /** The value of progress to be read out to the user. */
  "aria-valuenow"?: number;
  /** The minimum value of the progress tracker */
  "aria-valuemin"?: number;
  /** The maximum value of the progress tracker */
  "aria-valuemax"?: number;
  /** Prop to define the human readable text alternative of aria-valuenow
   * if aria-valuenow is not a number
   */
  "aria-valuetext"?: string;
  /** Size of the progress bar. */
  size?: "small" | "medium" | "large";
  /** Length of the progress bar, any valid css string. */
  length?: string;
  /** Current progress (percentage). */
  progress?: number;
  /** If error occurs. */
  error?: boolean;
  /** Flag to control whether the default value labels (as percentages) should be rendered. */
  description?: string;
  /** Value to add a description to the label */
  showDefaultLabels?: boolean;
  /** Value to display as current progress. */
  currentProgressLabel?: string;
  /** Value to display as the maximum progress limit. */
  maxProgressLabel?: string;
  /** Value of the preposition defined between Value1 and Value2 on the label. */
  customValuePreposition?: string;
  /**
   * The position the value label are rendered in.
   * Top/bottom apply to horizontal and left/right to vertical orientation.
   */
  labelsPosition?: "top" | "bottom";
}

const ProgressTracker = ({
  "aria-label": ariaLabel = "progress tracker",
  "aria-describedby": ariaDescribedBy,
  "aria-valuenow": ariaValueNow,
  "aria-valuemin": ariaValueMin = 0,
  "aria-valuemax": ariaValueMax = 100,
  "aria-valuetext": ariaValueText,
  size = "medium",
  length = "256px",
  error = false,
  progress = 0,
  description,
  showDefaultLabels = false,
  currentProgressLabel,
  customValuePreposition,
  maxProgressLabel,
  labelsPosition,
  ...rest
}: ProgressTrackerProps) => {
  const l = useLocale();
  const barRef = useRef<HTMLDivElement>(null);
  const [barLength, setBarLength] = useState("0px");
  const prefixLabels = labelsPosition !== "bottom";

  const updateBarLength = useCallback(() => {
    setBarLength(`${barRef.current?.offsetWidth}px`);
  }, []);

  useLayoutEffect(() => {
    updateBarLength();
  }, [updateBarLength]);

  useResizeObserver(barRef, () => {
    updateBarLength();
  });

  const renderValueLabels = () => {
    if (!showDefaultLabels && !currentProgressLabel) {
      return null;
    }

    const label = (value?: string, defaultValue?: string) => {
      if (value) {
        return value;
      }

      return showDefaultLabels ? defaultValue : undefined;
    };

    const displayedCurrentProgressLabel = label(
      currentProgressLabel,
      `${progress}%`
    );

    const displayedMaxProgressLabel = label(maxProgressLabel, "100%");

    return (
      <StyledValuesLabel labelsPosition={labelsPosition} size={size}>
        {displayedCurrentProgressLabel && (
          <StyledValue data-element="current-progress-label">
            {displayedCurrentProgressLabel}
          </StyledValue>
        )}

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

  const defaultValueNow =
    ariaValueMin + ((ariaValueMax - ariaValueMin) * progress) / 100;

  return (
    <StyledProgressTracker
      length={length}
      {...rest}
      {...tagComponent("progress-bar", rest)}
      role="progressbar"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-valuenow={
        ariaValueNow === undefined ? defaultValueNow : ariaValueNow
      }
      aria-valuemin={ariaValueMin}
      aria-valuemax={ariaValueMax}
      aria-valuetext={ariaValueText}
    >
      {prefixLabels && renderValueLabels()}
      <StyledProgressBar
        size={size}
        ref={barRef}
        progress={progress}
        error={error}
      >
        <InnerBar
          data-element="inner-bar"
          size={size}
          length={barLength}
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
