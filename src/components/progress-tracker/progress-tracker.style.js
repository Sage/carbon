import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";
import {
  OUTER_TRACKER_LENGTH,
  PROGRESS_TRACKER_SIZES,
} from "./progress-tracker.config";

const StyledProgressTracker = styled.div`
  ${margin}
  text-align: center;
  white-space: nowrap;
  ${({ isVertical }) => css`
    ${!isVertical &&
    `
      width: ${OUTER_TRACKER_LENGTH};
    `}
    ${isVertical &&
    `
      height: ${OUTER_TRACKER_LENGTH};
      display: flex;
    `}
  `}
`;

const StyledProgressBar = styled.span`
  ${({ direction, isVertical, size }) => css`
    display: flex;
    position: relative;
    background-color: var(--colorsSemanticNeutral200);

    ${!isVertical &&
    css`
      overflow-x: hidden;
      height: ${getHeight(size)};
      width: 100%;
    `}
    ${isVertical &&
    css`
      overflow-y: hidden;
      width: ${getHeight(size)};
      height: 100%;

      ${direction === "up" &&
      `
        align-items: flex-end;
      `}
    `}
  `}
`;

const StyledValue = styled.span`
  color: var(--colorsUtilityYin090);
  ${({ isMaxValue }) => css`
    ${isMaxValue && `color: var(--colorsUtilityYin055);`}
    ${!isMaxValue && `font-weight: bold;`}
  `}
`;

const StyledValuesLabel = styled.span`
  text-align: start;
  display: flex;
  justify-content: space-between;
  ${({ isVertical, position, size }) => css`
    font: ${getTypographyToken(size)};

    ${isVertical &&
    css`
      flex-direction: column;

      ${position !== "left" &&
      css`
        padding-left: 4px;
      `}

      ${position === "left" &&
      css`
        padding-right: 4px;

        ${StyledValue} {
          text-align: right;
        }
      `}
    `}

    ${!isVertical &&
    css`
      ${position !== "bottom" &&
      css`
        padding-bottom: 4px;
      `}

      ${position === "bottom" &&
      css`
        padding-top: 4px;
      `}
    `}
  `}
`;

const InnerBar = styled.span`
  ${({ isVertical, progress, size }) => css`
    position: absolute;
    left: 0;
    background-color: ${getInnerBarColour(progress)};

    ${!isVertical &&
    css`
      width: calc(${OUTER_TRACKER_LENGTH} * ${progress / 100});
      min-width: 2px;
      height: ${getHeight(size)};
    `}
    ${isVertical &&
    css`
      height: calc(${OUTER_TRACKER_LENGTH} * ${progress / 100});
      min-height: 2px;
      width: ${getHeight(size)};
    `}
  `}
`;

function getHeight(size) {
  switch (size) {
    case "small":
      return "var(--sizing050)";
    case "large":
      return "var(--sizing200)";
    default:
      return "var(--sizing100)";
  }
}

function getTypographyToken(size) {
  switch (size) {
    case "small":
      return "var(--typographyProgressTrackerValueLabelS)";
    case "large":
      return "var(--typographyProgressTrackerValueLabelL)";
    default:
      return "var(--typographyProgressTrackerValueLabelM)";
  }
}

function getInnerBarColour(progress) {
  if (progress >= 100) return "var(--colorsSemanticPositive500)";
  return "var(--colorsSemanticNeutral500)";
}

StyledProgressTracker.defaultProps = {
  theme: baseTheme,
};

StyledProgressBar.defaultProps = {
  size: "medium",
};

InnerBar.defaultProps = {
  progress: 0,
  size: "medium",
};

InnerBar.propTypes = {
  size: PropTypes.oneOf(PROGRESS_TRACKER_SIZES),
  progress: PropTypes.number,
  isVertical: PropTypes.bool,
};

StyledProgressTracker.propTypes = {
  theme: PropTypes.object,
  isVertical: PropTypes.bool,
};

StyledValuesLabel.propTypes = {
  isVertical: PropTypes.bool,
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

StyledValue.propTypes = {
  isMaxValue: PropTypes.bool,
};

StyledProgressBar.propTypes = {
  direction: PropTypes.oneOf(["up", "down"]),
  isVertical: PropTypes.bool,
  size: PropTypes.oneOf(PROGRESS_TRACKER_SIZES),
};

export {
  StyledProgressBar,
  InnerBar,
  StyledProgressTracker,
  StyledValuesLabel,
  StyledValue,
};
