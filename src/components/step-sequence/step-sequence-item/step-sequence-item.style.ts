import styled, { css } from "styled-components";
import { space } from "styled-system";
import { StepSequenceProps } from "../step-sequence.component";

const SIZE_MAP = {
  medium: {
    minWidth: "var(--sizing800)",
    markerWidth: "var(--sizing400)",
    markerHeight: "var(--sizing400)",
    titleFontSize: "var(--fontSizes300)",
    titleFontWeight: "var(--fontWeights500)",
    titleFontColour: "var(--progress-label-default)",
    descriptionFontSize: "var(--fontSizes200)",
    descriptionFontWeight: "var(--fontWeights400)",
    descriptionFontColour: "var(--progress-label-alt)",
  },
  small: {
    minWidth: "var(--sizing700)",
    markerWidth: "var(--sizing300)",
    markerHeight: "var(--sizing300)",
    titleFontSize: "var(--fontSizes200)",
    titleFontWeight: "var(--fontWeights500)",
    titleFontColour: "var(--progress-label-default)",
    descriptionFontSize: "var(--fontSizes100)",
    descriptionFontWeight: "var(--fontWeights400)",
    descriptionFontColour: "var(--progress-label-alt)",
  },
};

export const StyledStepSequenceItemMarkerContainer = styled.div<
  Pick<StepSequenceProps, "orientation">
>`
  ${({ orientation }) =>
    orientation === "vertical"
      ? css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `
      : css`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          position: relative;
        `}
`;

export const StyledStepSequenceItemLine = styled.div<
  Pick<StepSequenceProps, "orientation"> & {
    status: "complete" | "current" | "incomplete";
  }
>`
  ${({ orientation }) =>
    orientation === "vertical"
      ? css`
          width: var(--borderWidth200);
          flex-grow: 1;
          min-height: var(--sizing300);
          background-color: var(--progress-stepindicator-border-default);
          margin: var(--sizing100) 0;
        `
      : css`
          position: absolute;
          height: var(--borderWidth200);
          background-color: var(--progress-stepindicator-border-default);
          left: 70%;
          width: 60%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
        `}

  ${({ status }) =>
    status === "complete" &&
    css`
      background-color: var(--progress-stepindicator-border-success) !important;
    `}
`;

export const StyledStepSequenceItemContent = styled.span<
  Pick<StepSequenceProps, "orientation">
>`
  ${({ orientation }) =>
    orientation === "vertical"
      ? css`
          display: flex;
          flex-direction: column;
          padding-bottom: var(--sizing300);
        `
      : css`
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-top: var(--sizing150);
          z-index: 2;
          position: absolute;
          top: var(--sizing400);
          width: max-content;
          max-width: var(--sizing1500);
          white-space: normal;
        `}
`;

export const StyledStepSequenceItemStepNumber = styled.span<{
  status: "complete" | "current" | "incomplete";
  size: "small" | "medium";
}>`
  position: relative;
  z-index: 2;
  border-radius: 50%;
  ${({ size }) => css`
    height: ${SIZE_MAP[size].markerHeight};
    width: ${SIZE_MAP[size].markerWidth};
  `}
  font-size: var(--fontSizes100);
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  ${({ status }) => {
    switch (status) {
      case "complete":
        return css`
          background-color: var(--progress-stepindicator-bg-complete);
          border: none;
          color: transparent;

          &:before {
            content: "\f003";
            font-family: CarbonIcons;
            font-weight: normal;
            font-style: normal;
            font-size: var(--global-size-2-xs);
            line-height: var(--global-size-2-xs);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            color: white;
            align-items: center;
            justify-content: center;
          }
        `;

      case "current":
        return css`
          background-color: var(--progress-label-default);
          color: var(--progress-stepindicator-label-active);
          border: none;

          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 50%;

            box-shadow:
              0 0 0 3px #f4f4f4,
              0 0 0 5px var(--progress-label-default);

            z-index: -1;
          }
        `;

      default:
        return css`
          background-color: white;
          color: var(--progress-label-default);
          border: 2px solid var(--progress-stepindicator-border-default);
          margin-top: -2px;
        `;
    }
  }}
`;

export const StyledStepSequenceItemStepTitle = styled.span<{
  size: "small" | "medium";
}>`
  ${({ size }) => css`
    font-size: ${SIZE_MAP[size].titleFontSize};
    font-weight: ${SIZE_MAP[size].titleFontWeight};
    color: ${SIZE_MAP[size].titleFontColour};
  `}
`;

export const StyledStepSequenceItemStepDescription = styled.span<{
  size: "small" | "medium";
}>`
  ${({ size }) => css`
    font-size: ${SIZE_MAP[size].descriptionFontSize};
    font-weight: ${SIZE_MAP[size].descriptionFontWeight};
    color: ${SIZE_MAP[size].descriptionFontColour};
  `}
  margin-top: 2px;
`;

export const StyledStepSequenceItemStepVH = styled.span`
  &:not(:focus):not(:active) {
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

export const StyledStepSequenceItem = styled.li<
  Pick<StepSequenceProps, "orientation"> & {
    size: "small" | "medium";
  }
>`
  ${({ orientation, size }) =>
    orientation === "vertical"
      ? css`
          display: grid;
          grid-template-columns: ${SIZE_MAP[size].markerWidth} 1fr;
          column-gap: var(--sizing200);
        `
      : css`
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          flex: 1 1 0px;
          width: 0;
        `}

  ${({ size }) => css`
    min-width: ${SIZE_MAP[size].minWidth};
    max-width: 720px;
  `}

  &:last-child ${StyledStepSequenceItemLine} {
    display: none !important;
  }

  ${space}
`;
