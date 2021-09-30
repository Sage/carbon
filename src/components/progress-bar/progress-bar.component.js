import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import tagComponent from "../../utils/helpers/tags/tags";
import StyledProgressBar, {
  InnerBar,
  StyledLabel,
  StyledProgress,
  StyledValue,
  StyledMaxValue,
} from "./progress-bar.style";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const ProgressBar = ({
  size = "medium",
  progress,
  value,
  maxValue,
  colour = "default",
  ...rest
}) => {
  return (
    <>
      <StyledProgress
        size={size}
        value={!!value}
        {...rest}
        {...tagComponent("progress-bar", rest)}
      >
        <StyledProgressBar size={size}>
          <InnerBar size={size} progress={progress} colour={colour} />
        </StyledProgressBar>
        {(value || maxValue) && (
          <StyledLabel>
            <StyledValue>
              {value && (value === true ? `${progress}%` : value)}
            </StyledValue>
            <StyledMaxValue>
              {maxValue && (maxValue === true ? "100%" : maxValue)}
            </StyledMaxValue>
          </StyledLabel>
        )}
      </StyledProgress>
    </>
  );
};

ProgressBar.propTypes = {
  ...marginPropTypes,
  /** Size of the progress bar. */
  size: PropTypes.oneOf(["small", "medium", "large"]),
  /** Current progress (percentage). */
  progress: PropTypes.number,
  /** Value to display as current progress (shows current percentage for true) */
  value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Value to display as 100% progress (shows "100%" for true) */
  maxValue: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** "traffic" changes colour of status bar depending on current progress. */
  colour: PropTypes.oneOf(["default", "traffic"]),
};

export default ProgressBar;
