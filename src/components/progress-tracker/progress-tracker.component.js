import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import tagComponent from "../../__internal__/utils/helpers/tags";
import { filterStyledSystemMarginProps } from "../../style/utils";
import {
  StyledProgressBar,
  InnerBar,
  StyledValuesLabel,
  StyledProgressTracker,
  StyledValue,
} from "./progress-tracker.style";
import useResizeObserver from "../../hooks/__internal__/useResizeObserver";
import Logger from "../../__internal__/utils/logger";

let deprecatedWarningTriggered = false;

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
  progress = 0,
  showDefaultLabels = false,
  currentProgressLabel,
  maxProgressLabel,
  orientation,
  direction,
  labelsPosition,
  ...rest
}) => {
  if (!deprecatedWarningTriggered && (orientation || direction)) {
    deprecatedWarningTriggered = true;
    Logger.deprecate(
      "The `orientation` and `direction` props in `ProgressTracker` component are deprecated and will soon be removed."
    );
  }

  const internalOrientation = orientation || "horizontal";
  const internalDirection = direction || "up";

  const barRef = useRef();
  const [barLength, setBarLength] = useState(0);
  const isVertical = internalOrientation === "vertical";
  const prefixLabels =
    (!isVertical && labelsPosition !== "bottom") ||
    (isVertical && labelsPosition === "left");

  const updateBarLength = useCallback(() => {
    if (internalOrientation === "horizontal") {
      setBarLength(`${barRef.current.offsetWidth}px`);
    } else {
      setBarLength(`${barRef.current.offsetHeight}px`);
    }
  }, [barRef, internalOrientation]);

  useLayoutEffect(() => {
    updateBarLength();
  }, [barRef, internalOrientation, updateBarLength]);

  useResizeObserver(barRef, () => {
    updateBarLength();
  });

  const renderValueLabels = () => {
    if (!showDefaultLabels && !currentProgressLabel && !maxProgressLabel) {
      return null;
    }

    const label = (value, defaultValue) => {
      if (value) {
        return value;
      }
      return showDefaultLabels ? defaultValue : undefined;
    };

    return (
      <StyledValuesLabel position={labelsPosition} isVertical={isVertical}>
        {isVertical && internalDirection === "up" && (
          <>
            <StyledValue isMaxValue>
              {label(maxProgressLabel, "100%")}
            </StyledValue>
            <StyledValue>
              {label(currentProgressLabel, `${progress}%`)}
            </StyledValue>
          </>
        )}
        {(internalDirection === "down" || !isVertical) && (
          <>
            <StyledValue>
              {label(currentProgressLabel, `${progress}%`)}
            </StyledValue>
            <StyledValue isMaxValue>
              {label(maxProgressLabel, "100%")}
            </StyledValue>
          </>
        )}
      </StyledValuesLabel>
    );
  };

  const defaultValueNow =
    ariaValueMin + ((ariaValueMax - ariaValueMin) * progress) / 100;

  return (
    <StyledProgressTracker
      size={size}
      length={length}
      isVertical={isVertical}
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
        direction={isVertical ? internalDirection : undefined}
        isVertical={isVertical}
        size={size}
        ref={barRef}
      >
        <InnerBar
          isVertical={isVertical}
          size={size}
          length={barLength}
          progress={progress}
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
  /** Flag to control whether the default value labels (as percentages) should be rendered. */
  showDefaultLabels: PropTypes.bool,
  /** Value to display as current progress. */
  currentProgressLabel: PropTypes.string,
  /** Value to display as the maximum progress limit. */
  maxProgressLabel: PropTypes.string,
  /** The orientation of the component. */
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  /** The direction the bar should move as progress increases, only applies in vertical orientation. */
  direction: PropTypes.oneOf(["up", "down"]),
  /**
   * The position the value label are rendered in.
   * Top/bottom apply to horizontal and left/right to vertical orientation.
   */
  labelsPosition: PropTypes.oneOf(["top", "bottom", "left", "right"]),
};

export default ProgressTracker;
