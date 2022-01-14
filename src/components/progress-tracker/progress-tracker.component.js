import React from "react";
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

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const ProgressTracker = ({
  size = "medium",
  progress = 0,
  showDefaultLabels = false,
  currentProgressLabel,
  maxProgressLabel,
  orientation = "horizontal",
  direction = "up",
  labelsPosition,
  ...rest
}) => {
  const isVertical = orientation === "vertical";
  const prefixLabels =
    (!isVertical && labelsPosition !== "bottom") ||
    (isVertical && labelsPosition === "left");

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
        {isVertical && direction === "up" && (
          <>
            <StyledValue isMaxValue>
              {label(maxProgressLabel, "100%")}
            </StyledValue>
            <StyledValue>
              {label(currentProgressLabel, `${progress}%`)}
            </StyledValue>
          </>
        )}
        {(direction === "down" || !isVertical) && (
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

  return (
    <StyledProgressTracker
      size={size}
      isVertical={isVertical}
      {...rest}
      {...tagComponent("progress-bar", rest)}
    >
      {prefixLabels && renderValueLabels()}
      <StyledProgressBar
        direction={isVertical ? direction : undefined}
        isVertical={isVertical}
        size={size}
      >
        <InnerBar isVertical={isVertical} size={size} progress={progress} />
      </StyledProgressBar>
      {!prefixLabels && renderValueLabels()}
    </StyledProgressTracker>
  );
};

ProgressTracker.propTypes = {
  ...marginPropTypes,
  /** Size of the progress bar. */
  size: PropTypes.oneOf(["small", "medium", "large"]),
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
