import styled, { css } from "styled-components";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";
import { ProgressTrackerProps } from "./progress-tracker.component";

function getHeight(size?: string) {
  switch (size) {
    case "small":
      return "var(--sizing050)";
    case "large":
      return "var(--sizing200)";
    default:
      return "var(--sizing100)";
  }
}

function getBackgroundColour({
  progress,
  error,
}: Pick<ProgressTrackerProps, "progress" | "error">) {
  if (error) return "var(--colorsSemanticNegative500)";
  if (progress && progress >= 100) return "var(--colorsSemanticPositive500)";
  return "var(--colorsSemanticNeutral500)";
}

function getBorderColour({
  progress,
  error,
}: Pick<ProgressTrackerProps, "progress" | "error">) {
  if (error) return "var(--colorsSemanticNegative500)";
  if (progress === 100) return "var(--colorsSemanticPositive500)";
  return "var(--colorsSemanticNeutral500)";
}

const StyledProgressTracker = styled.div<
  Pick<ProgressTrackerProps, "margin" | "length" | "labelsPosition">
>`
  ${margin}
  text-align: center;
  white-space: nowrap;

  ${({ length }) =>
    css`
      width: ${length};
    `};
  ${({ labelsPosition }) =>
    labelsPosition === "left" &&
    css`
      display: flex;
      align-items: center;
    `}
`;

const StyledProgressBar = styled.span<
  Pick<ProgressTrackerProps, "size" | "progress" | "error">
>`
  ${({ size, progress, error, theme }) => css`
    display: flex;
    position: relative;
    background-color: var(--colorsSemanticNeutral200);
    border: 1px solid ${getBorderColour({ progress, error })};
    border-radius: ${theme.roundedCornersOptOut
      ? "25px"
      : "var(--borderRadius400)"};
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

const labelsPositionMargin = { top: "bottom", bottom: "top", left: "right" };

const StyledValuesLabel = styled.span<
  Pick<ProgressTrackerProps, "size" | "labelsPosition" | "labelWidth">
>`
  text-align: start;
  display: flex;
  justify-content: flex-start;
  gap: 4px;
  font-size: ${({ size }) => size && fontSizes[size]};

  ${({ labelsPosition }) =>
    labelsPosition &&
    `
      margin-${labelsPositionMargin[labelsPosition]}: var(--spacing100);
    `};

  ${({ labelWidth }) =>
    labelWidth &&
    css`
      width: ${labelWidth};
      flex-shrink: 0;
    `};
`;

const InnerBar = styled.span<
  Pick<ProgressTrackerProps, "progress" | "size" | "length" | "error">
>`
  ${({ progress, size = "medium", length, error, theme }) => css`
    position: relative;
    left: 0;
    background-color: ${getBackgroundColour({ progress, error })};
    border-radius: ${theme.roundedCornersOptOut
      ? "25px"
      : "var(--borderRadius400)"};
    width: calc(${length} * ${progress && progress / 100});
    min-width: 2px;
    height: ${getHeight(size)};
  `}
`;

InnerBar.defaultProps = {
  theme: baseTheme,
};

StyledProgressBar.defaultProps = {
  theme: baseTheme,
};

StyledProgressTracker.defaultProps = {
  theme: baseTheme,
};

export {
  StyledProgressBar,
  InnerBar,
  StyledProgressTracker,
  StyledValuesLabel,
  StyledValue,
  StyledDescription,
};
