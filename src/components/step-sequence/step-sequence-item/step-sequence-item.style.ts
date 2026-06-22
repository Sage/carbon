import styled, { css } from "styled-components";
import { space } from "styled-system";
import { StepSequenceProps } from "../step-sequence.component";

const SIZE_MAP = {
  medium: {
    minWidth: "64px",
    markerWidth: "32px",
    markerHeight: "32px",
    titleFontSize: "18px",
    titleFontWeight: "500",
    titleFontColour: "--progress-label-default",
    descriptionFontSize: "16px",
    descriptionFontWeight: "400",
    descriptionFontColour: "--progress-label-alt",
  },
  small: {
    minWidth: "56px",
    markerWidth: "24px",
    markerHeight: "24px",
    titleFontSize: "16px",
    titleFontWeight: "500",
    titleFontColour: "--progress-label-default",
    descriptionFontSize: "14px",
    descriptionFontWeight: "400",
    descriptionFontColour: "--progress-label-alt",
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
          width: 2px;
          flex-grow: 1;
          min-height: 40px;
          background-color: #cbd5e1;
          margin: 8px 0;
        `
      : css`
          position: absolute;
          height: 2px;
          background-color: #cbd5e1;
          left: 70%;
          width: 60%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
        `}

  ${({ status }) =>
    status === "complete" &&
    css`
      background-color: #16a34a !important;
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
          padding-bottom: 24px;
        `
      : css`
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-top: 12px;
          z-index: 2;
          position: absolute;
          top: 32px;
          width: max-content;
          max-width: 120px;
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
  font-size: 14px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  ${({ status }) => {
    switch (status) {
      case "complete":
        return css`
          background-color: #388544;
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
          background-color: #0c111d;
          color: #ffffff;
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
              0 0 0 5px #0c111d;

            z-index: -1;
          }
        `;

      default:
        return css`
          background-color: white;
          color: #0c111d;
          border: 2px solid #94a3b8;
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
    color: var(${SIZE_MAP[size].titleFontColour});
  `}
`;

export const StyledStepSequenceItemStepDescription = styled.span<{
  size: "small" | "medium";
}>`
  ${({ size }) => css`
    font-size: ${SIZE_MAP[size].descriptionFontSize};
    font-weight: ${SIZE_MAP[size].descriptionFontWeight};
    color: var(${SIZE_MAP[size].descriptionFontColour});
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
          column-gap: 16px;
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
    

  & ${StyledStepSequenceItemLine} {
    background-color: #94a3b8;
  }

  &:last-child ${StyledStepSequenceItemLine} {
    display: none !important;
  }

  ${space}
`;
