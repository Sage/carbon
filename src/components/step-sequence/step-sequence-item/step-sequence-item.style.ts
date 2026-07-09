import styled, { css } from "styled-components";
import { StepSequenceProps } from "../step-sequence.component";
import { StepSequenceItemProps } from "./step-sequence-item.component";

const sizeMap = {
  small: {
    indicatorFont: "var(--global-font-static-comp-medium-m)",
    indicatorSize: "var(--global-size-xs)",
    indicatorBorderWidth: "var(--global-borderwidth-s)",
    itemGap: "var(--global-space-comp-m)",
    itemMinWidth: "var(--global-size-xl)",
    labelFont: "var(--global-font-static-subheading-m)",
    descriptionFont: "var(--global-font-static-comp-regular-m)",
    labelWrapperPadding: "var(--global-space-comp-xs)",
  },
  medium: {
    indicatorFont: "var(--global-font-static-comp-medium-l)",
    indicatorSize: "var(--global-size-s)",
    indicatorBorderWidth: "var(--global-borderwidth-m)",
    itemGap: "var(--global-space-comp-l)",
    itemMinWidth: "var(--global-size-2-xl)",
    labelFont: "var(--global-font-static-subheading-l)",
    descriptionFont: "var(--global-font-static-comp-regular-l)",
    labelWrapperPadding: "var(--global-space-comp-s)",
  },
};

interface StyledStepSequenceProps {
  $orientation?: StepSequenceProps["orientation"];
  $size: "small" | "medium";
}

export const StyledStepSequenceItem = styled.li<StyledStepSequenceProps>`
  ${({ $size, $orientation }) => css`
    display: flex;
    list-style-type: none;
    max-width: 720px;

    gap: ${sizeMap[$size].itemGap};

    ${$orientation === "horizontal" &&
    css`
      flex: 1 0 0;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      min-width: ${sizeMap[$size].itemMinWidth};
    `}

    ${$orientation === "vertical" &&
    css`
      min-height: 72px;
      padding: var(--global-space-comp-s) 0 var(--global-space-comp-l) 0;
    `}
  `}
`;

interface StyledIndicatorProps {
  $status?: StepSequenceItemProps["status"];
  $size: "small" | "medium";
}

export const StyledIndicator = styled.span<StyledIndicatorProps>`
  ${({ $status, $size }) => css`
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    border-radius: var(--global-radius-container-circle);
    font: ${sizeMap[$size].indicatorFont};
    min-height: ${sizeMap[$size].indicatorSize};
    min-width: ${sizeMap[$size].indicatorSize};

    ${$status === "incomplete" &&
    css`
      color: var(--progress-stepindicator-label-default);
      box-shadow: inset 0 0 0 ${sizeMap[$size].indicatorBorderWidth}
        var(--progress-stepindicator-border-default);
    `}

    ${$status === "current" &&
    css`
      color: var(--progress-stepindicator-label-active);
      background-color: var(--progress-stepindicator-bg-active);
      outline: ${sizeMap[$size].indicatorBorderWidth} solid
        var(--progress-stepindicator-border-active-outer);
      outline-offset: ${sizeMap[$size].indicatorBorderWidth};
    `}

    ${$status === "complete" &&
    css`
      color: var(--progress-stepindicator-bg-complete);
    `}
  `}
`;

interface StyledIndicatorWrapperProps {
  $orientation?: StepSequenceProps["orientation"];
  $status?: StepSequenceItemProps["status"];
}

export const StyledIndicatorWrapper = styled.div<StyledIndicatorWrapperProps>`
  ${({ $orientation }) => css`
    display: grid;

    ${$orientation === "horizontal" &&
    css`
      width: 100%;
      align-items: center;
      grid-template-columns: 1fr auto 1fr;
      grid-template-rows: 1fr;
      grid-column-gap: var(--global-space-comp-s);
    `}

    ${$orientation === "vertical" &&
    css`
      position: relative;
      height: inherit;
      justify-content: center;
      grid-template-columns: auto;
      grid-template-rows: auto 1fr;
    `}
  `}
`;

interface StepLineProps {
  $orientation?: StepSequenceProps["orientation"];
  $isGreen?: boolean;
  $size?: "small" | "medium";
  $roundedSide?: "left" | "right";
}

export const StepLine = styled.div<StepLineProps>`
  ${({ $orientation, $isGreen, $size, $roundedSide }) => css`
    background-color: var(--progress-stepindicator-border-default);

    ${$isGreen &&
    css`
      background-color: var(--progress-stepindicator-border-success);
    `}

    ${$orientation === "horizontal" &&
    css`
      height: 2px;

      ${$roundedSide &&
      css`
        ${`border-top-${$roundedSide}-radius`}: var(--global-radius-action-2-xs);
        ${`border-bottom-${$roundedSide}-radius`}: var(--global-radius-action-2-xs);
      `}

      .step-sequence-item:first-child &.line-before {
        background-color: transparent;
      }
    `}

    ${$orientation === "vertical" &&
    $size &&
    css`
      position: absolute;
      border-radius: var(--global-radius-action-2-xs);
      width: 2px;

      // full item height - (indicator size + spacing above line) + bottom padding
      height: calc(
        100% - ${sizeMap[$size].indicatorSize} - var(--global-space-comp-s) +
          var(--global-space-comp-l)
      );

      // indicator size + spacing
      top: calc(${sizeMap[$size].indicatorSize} + var(--global-space-comp-s));

      // center within indicator
      left: calc((${sizeMap[$size].indicatorSize} / 2) - 1px);
    `}

    .step-sequence-item:last-child &.line-after {
      background-color: transparent;
    }
  `}
`;

interface StyledTitleProps {
  $orientation?: StepSequenceProps["orientation"];
  $size: "small" | "medium";
}

export const StyledTitle = styled.span<StyledTitleProps>`
  ${({ $size }) => css`
    color: var(--progress-label-default);
    font: ${sizeMap[$size].labelFont};
  `}
`;

export const StyledDescription = styled.span<StyledTitleProps>`
  ${({ $size }) => css`
    color: var(--progress-label-alt);
    font: ${sizeMap[$size].descriptionFont};
  `}
`;

export const StyledTitleWrapper = styled.div<StyledTitleProps>`
  ${({ $size, $orientation }) => css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    ${$orientation === "horizontal" &&
    css`
      width: 100%;
      text-align: center;
      padding: 0px ${sizeMap[$size].labelWrapperPadding};
    `}

    ${$orientation === "vertical" &&
    css`
      padding-top: var(--global-space-comp-2-xs);
    `}
  `}
`;
