import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";
import { PROGRESS_TRACKER_SIZES } from "./progress-tracker.config";

const StyledProgressTracker = styled.div`
  ${margin}
  text-align: center;
  white-space: nowrap;

  ${({ length }) =>
    css`
      width: ${length};
    `};
`;

const StyledProgressBar = styled.span`
  ${({ size, progress, error }) => css`
    display: flex;
    position: relative;
    background-color: var(--colorsSemanticNeutral200);
    border: 1px solid ${getBorderColour(progress, error)};
    border-radius: 25px;
    overflow-x: hidden;
    height: ${getHeight(size)};
    width: 100%;
  `}
`;

const fontSizes = {
  small: "var(--fontSizes100)",
  medium: "var(--fontSizes100)",
  large: "var(--fontSizes200)",
};

const StyledValue = styled.span`
  display: inline-block;
  font-weight: bold;
`;

const StyledDescription = styled.span`
  color: var(--colorsUtilityYin055);
  margin-left: 4px;
`;

const StyledValuesLabel = styled.span`
  text-align: start;
  display: flex;
  justify-content: flex-start;
  gap: 4px;
  font-size: ${({ size }) => fontSizes[size]};
  ${({ position }) => position === "bottom" && "margin-top: 8px"};
  ${({ position }) => position !== "bottom" && "margin-bottom: 8px"};
`;

const InnerBar = styled.span`
  ${({ progress, size, length, error }) => css`
    position: relative;
    left: 0;
    background-color: ${getBackgroundColour(progress, error)};
    border-radius: 25px;
    width: calc(${length} * ${progress / 100});
    min-width: 2px;
    height: ${getHeight(size)};
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
  if (error) return "var(--colorsSemanticNegative500)";
  if (progress >= 100) return "var(--colorsSemanticPositive500)";
  return "var(--colorsSemanticNeutral500)";
}

function getBorderColour(progress, error) {
  if (error) return "var(--colorsSemanticNegative500)";
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
};

StyledProgressTracker.propTypes = {
  theme: PropTypes.object,
};

StyledValuesLabel.propTypes = {
  position: PropTypes.oneOf(["top", "bottom", "left", "right"]),
};

StyledValue.propTypes = {
  isMaxValue: PropTypes.bool,
};

StyledProgressBar.propTypes = {
  size: PropTypes.oneOf(PROGRESS_TRACKER_SIZES),
};

export {
  StyledProgressBar,
  InnerBar,
  StyledProgressTracker,
  StyledValuesLabel,
  StyledValue,
  StyledDescription,
};
