import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
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

const StyledProgressTracker = styled.div.attrs(applyBaseTheme)<
  Pick<ProgressTrackerProps, "margin" | "length" | "labelsPosition">
>`
  ${margin}
  text-align: center;
  white-space: nowrap;

  ${({ length }) => css`
    width: ${length};
  `};
  ${({ labelsPosition }) =>
    labelsPosition === "left" &&
    css`
      display: flex;
      align-items: center;
    `}
`;

const StyledProgressBar = styled.span.attrs(applyBaseTheme)<
  Pick<ProgressTrackerProps, "progress" | "error">
>`
  ${({ progress, error }) => css`
    display: flex;
    position: relative;
    background-color: var(--colorsSemanticNeutral200);
    border: 1px solid ${getBorderColour({ progress, error })};
    border-radius: var(--borderRadius400);
    overflow-x: hidden;
    width: 100%;
    min-height: fit-content;
    box-sizing: border-box;
  `}
`;

const fontSizes = {
  small: "var(--fontSizes100)",
  medium: "var(--fontSizes100)",
  large: "var(--fontSizes200)",
};

const StyledValue = styled.span`
  display: inline-block;
  font-weight: 500;
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
  Required<Pick<ProgressTrackerProps, "progress" | "size" | "error">>
>`
  ${({ progress, size, error }) => css`
    position: relative;
    left: 0;
    background-color: ${getBackgroundColour({ progress, error })};
    border-radius: var(--borderRadius400);
    width: ${progress}%;
    min-width: 2px;
    height: ${getHeight(size)};
  `}
`;

export {
  StyledProgressBar,
  InnerBar,
  StyledProgressTracker,
  StyledValuesLabel,
  StyledValue,
  StyledDescription,
};
