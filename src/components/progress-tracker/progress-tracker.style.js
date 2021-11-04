import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";
import {
  OUTER_TRACKER_LENGTH,
  PROGRESS_TRACKER_SIZES,
  PROGRESS_TRACKER_VARIANTS,
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
  ${({ direction, isVertical, size, theme }) => css`
    display: flex;
    position: relative;
    background-color: ${theme.progressTracker.background};

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
  ${({ isMaxValue, theme }) => css`
    ${isMaxValue &&
    `
      color: ${theme.text.placeholder};
    `}
    ${!isMaxValue &&
    `
      font-weight: bold;
    `}
  `}
`;

const StyledValuesLabel = styled.span`
  text-align: start;
  display: flex;
  justify-content: space-between;
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
  ${({ isVertical, progress, size, theme, variant }) => css`
    position: absolute;
    left: 0;
    background-color: ${getInnerBarColour(variant, progress, theme)};

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
      return "4px";
    case "large":
      return "16px";
    default:
      return "8px";
  }
}

function getInnerBarColour(variant, progress, theme) {
  if (progress >= 100) return theme.colors.success;
  if (variant === "default") return theme.progressTracker.innerBackground;
  if (progress < 20) return theme.colors.error;
  return theme.progressTracker.trafficNeutral;
}

StyledProgressTracker.defaultProps = {
  theme: baseTheme,
};

StyledProgressBar.defaultProps = {
  theme: baseTheme,
  size: "medium",
};

InnerBar.propTypes = {
  size: PropTypes.oneOf(PROGRESS_TRACKER_SIZES),
  progress: PropTypes.number,
  variant: PropTypes.oneOf(PROGRESS_TRACKER_VARIANTS),
};

InnerBar.defaultProps = {
  progress: 0,
  theme: baseTheme,
  size: "medium",
  variant: "default",
};

StyledValue.defaultProps = {
  theme: baseTheme,
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
};
