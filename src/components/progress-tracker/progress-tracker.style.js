import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";
import { PROGRESS_TRACKER_SIZES } from "./progress-tracker.config";

const StyledProgressTracker = styled.div`
  ${margin}
  text-align: center;
  white-space: nowrap;

  ${({ isVertical, length }) => css`
    ${!isVertical &&
    `
      width: ${length};
    `}
    ${isVertical &&
    `
      height: ${length};
      display: flex;
    `}
  `}
`;

const StyledProgressBar = styled.span`
  ${({ direction, isVertical, size, progress, error }) => css`
    display: flex;
    position: relative;
    background-color: var(--colorsSemanticNeutral200);
    border: 1px solid ${getBorderColour(progress, error)};
    border-radius: 25px;

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
  flex-basis: 30px;
  margin-right: 8px;
  ${({ isMaxValue, foo }) => css`
    ${console.log(foo, "here is foo")}
    ${!isMaxValue &&
    foo &&
    css`
      font-weight: bold;
    `}
    ${isMaxValue && `color: var(--colorsUtilityYin055)`}
  `}
`;

const StyledValuesLabel = styled.span`
  text-align: start;
  display: flex;
  justify-content: flex-start;
  ${({ isVertical, position }) => css`
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
  ${({ isVertical, progress, size, length, error }) => css`
    position: absolute;
    left: 0;
    background-color: ${getBackgroundColour(progress, error)};
    border-radius: 25px;

    ${!isVertical &&
    css`
      width: calc(${length} * ${progress / 100});
      min-width: 2px;
      height: ${getHeight(size)};
    `}
    ${isVertical &&
    css`
      height: calc(${length} * ${progress / 100});
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

function getBackgroundColour(progress, error) {
  if (error === true) return "var(--colorsSemanticNegative500)";
  if (progress >= 100) return "var(--colorsSemanticPositive500)";
  return "var(--colorsSemanticNeutral500)";
}

function getBorderColour(progress, error) {
  if (error === true) return "var(--colorsSemanticNegative500)";
  if (progress === 100) return "var(--colorsSemanticPositive500)";
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
