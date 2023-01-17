import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import useLocale from "../../hooks/__internal__/useLocale";
import tagComponent from "../../__internal__/utils/helpers/tags";
import { filterStyledSystemMarginProps } from "../../style/utils";
import {
  StyledProgressBar,
  InnerBar,
  StyledValuesLabel,
  StyledProgressTracker,
  StyledValue,
  StyledDescription,
} from "./progress-tracker.style";
import useResizeObserver from "../../hooks/__internal__/useResizeObserver";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

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
}) => {
  const l = useLocale();
  const barRef = useRef();
  const [barLength, setBarLength] = useState(0);
  const prefixLabels = labelsPosition !== "bottom";

  const updateBarLength = useCallback(() => {
    setBarLength(`${barRef.current.offsetWidth}px`);
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

    const label = (value, defaultValue) => {
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
      <StyledValuesLabel position={labelsPosition} size={size}>
        {displayedCurrentProgressLabel && (
          <StyledValue>{displayedCurrentProgressLabel}</StyledValue>
        )}

        {displayedMaxProgressLabel && (
          <>
            <span>{customValuePreposition || l.progressTracker.of()}</span>
            <StyledValue>{displayedMaxProgressLabel}</StyledValue>
          </>
        )}

        {description && <StyledDescription>{description}</StyledDescription>}
      </StyledValuesLabel>
    );
  };

  const defaultValueNow =
    ariaValueMin + ((ariaValueMax - ariaValueMin) * progress) / 100;

  return (
    <StyledProgressTracker
      size={size}
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

ProgressTracker.propTypes = {
  ...marginPropTypes,
  /** Specifies an aria label to the component */
  "aria-label": PropTypes.string,
  /** Specifies the aria describedby for the component */
  "aria-describedby": PropTypes.string,
  /** The value of progress to be read out to the user. */
  "aria-valuenow": PropTypes.number,
  /** The minimum value of the progress tracker */
  "aria-valuemin": PropTypes.number,
  /** The maximum value of the progress tracker */
  "aria-valuemax": PropTypes.number,
  /** Prop to define the human readable text alternative of aria-valuenow
   * if aria-valuenow is not a number
   */
  "aria-valuetext": PropTypes.string,
  /** Size of the progress bar. */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** Length of the progress bar, any valid css string. */
  length: PropTypes.string,
  /** Current progress (percentage). */
  progress: PropTypes.number,
  /** If error occurs. */
  error: PropTypes.bool,
  /** Flag to control whether the default value labels (as percentages) should be rendered. */
  description: PropTypes.string,
  /** Value to add a description to the label */
  showDefaultLabels: PropTypes.bool,
  /** Value to display as current progress. */
  currentProgressLabel: PropTypes.string,
  /** Value to display as the maximum progress limit. */
  maxProgressLabel: PropTypes.string,
  /** Value of the preposition defined between Value1 and Value2 on the label. */
  customValuePreposition: PropTypes.string,
  /**
   * The position the value label are rendered in.
   * Top/bottom apply to horizontal and left/right to vertical orientation.
   */
  labelsPosition: PropTypes.oneOf(["top", "bottom"]),
};

export default ProgressTracker;
