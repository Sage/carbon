import styled, { css } from "styled-components";
import { margin } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { TrackerVariants } from "./progress-tracker.component";
import {
  progressTrackerSizeMap,
  progressBarVariants,
} from "./progress-tracker.config";

interface StyledProgressTrackerProps {
  $length?: string;
  $labelsPosition?: "top" | "bottom" | "left";
  $size: "small" | "medium" | "large";
}

export const StyledProgressTracker = styled.div.attrs(
  applyBaseTheme,
)<StyledProgressTrackerProps>`
  ${margin}

  ${({ $length, $labelsPosition, $size }) => css`
    display: flex;
    flex-direction: column;
    gap: ${progressTrackerSizeMap[$size].gap};
    width: ${$length};

    ${$labelsPosition === "left" &&
    css`
      flex-direction: row;
      align-items: center;
    `}
  `};
`;

interface StyledProgressBarProps {
  $variant: TrackerVariants;
  $size: "small" | "medium" | "large";
  $progress?: number;
}

export const StyledProgressBar = styled.span.attrs(
  applyBaseTheme,
)<StyledProgressBarProps>`
  ${({ $variant, $size, $progress }) => css`
    display: block;
    overflow: hidden;
    width: 100%;
    height: ${progressTrackerSizeMap[$size].barHeight};
    border-radius: ${progressTrackerSizeMap[$size].barBorderRadius};
    background: var(--progress-bg-default);
    box-shadow: inset 0 0 0 var(--global-borderwidth-xs)
      var(--progress-border-default);

    ::after {
      content: "";
      display: block;
      width: ${$progress}%;
      height: ${progressTrackerSizeMap[$size].barHeight};
      background-color: ${progressBarVariants[$variant]};
      border-radius: ${progressTrackerSizeMap[$size].barBorderRadius};
    }
  `}
`;

interface StyledLabelProps {
  $size: "small" | "medium" | "large";
  $labelWidth?: string;
}

export const StyledValue = styled.span<StyledLabelProps>`
  ${({ $size }) => css`
    font: ${progressTrackerSizeMap[$size].valueFont};
  `};
`;

export const StyledValuesWrapper = styled.span`
  display: flex;
  gap: var(--global-space-comp-xs);
`;

export const StyledLabelWrapper = styled.div<StyledLabelProps>`
  ${({ $size, $labelWidth }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--global-space-comp-s);
    white-space: nowrap;

    color: var(--progress-label-default);
    font: ${progressTrackerSizeMap[$size].regularFont};

    ${$labelWidth &&
    css`
      width: ${$labelWidth};
      flex-shrink: 0;
    `}
  `};
`;
