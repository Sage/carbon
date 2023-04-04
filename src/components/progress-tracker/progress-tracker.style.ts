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
  Pick<ProgressTrackerProps, "margin" | "length">
>`
  ${margin}
  text-align: center;
  white-space: nowrap;

  ${({ length }) =>
    css`
      width: ${length};
    `};
`;

const StyledProgressBar = styled.span<
  Pick<ProgressTrackerProps, "size" | "progress" | "error">
>`
  ${({ size, progress, error }) => css`
    display: flex;
    position: relative;
    background-color: var(--colorsSemanticNeutral200);
    border: 1px solid ${getBorderColour({ progress, error })};
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

const StyledValuesLabel = styled.span<
  Pick<ProgressTrackerProps, "size" | "labelsPosition">
>`
  text-align: start;
  display: flex;
  justify-content: flex-start;
  gap: 4px;
  font-size: ${({ size }) => size && fontSizes[size]};
  ${({ labelsPosition }) => labelsPosition === "bottom" && "margin-top: 8px"};
  ${({ labelsPosition }) =>
    labelsPosition !== "bottom" && "margin-bottom: 8px"};
`;

const InnerBar = styled.span<
  Pick<ProgressTrackerProps, "progress" | "size" | "length" | "error">
>`
  ${({ progress, size = "medium", length, error }) => css`
    position: relative;
    left: 0;
    background-color: ${getBackgroundColour({ progress, error })};
    border-radius: 25px;
    width: calc(${length} * ${progress && progress / 100});
    min-width: 2px;
    height: ${getHeight(size)};
  `}
`;

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
