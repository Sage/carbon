import styled, { css } from "styled-components";
import { space } from "styled-system";
import { StepSequenceProps } from "../step-sequence.component";

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
        `
      : css`
          position: absolute;
          height: 2px;
          background-color: #cbd5e1;
          left: 50%;
          width: 100%;
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
}>`
  position: relative;
  z-index: 2;
  border-radius: 50%;
  height: 32px;
  width: 32px;
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

          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='3' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='m4.5 12.75 6 6 9-13.5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: center;
          background-size: 16px;
        `;

      case "current":
        return css`
          background-color: #0c111d;
          color: #ffffff;
          border: none;

          ::before {
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
        `;
    }
  }}
`;

export const StyledStepSequenceItemStepTitle = styled.span`
  font-weight: 600;
  color: #1e293b;
`;

export const StyledStepSequenceItemStepDescription = styled.span`
  font-size: 13px;
  color: #64748b;
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
  Pick<StepSequenceProps, "orientation">
>`
  ${({ orientation }) =>
    orientation === "vertical"
      ? css`
          display: grid;
          grid-template-columns: 32px 1fr;
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

  & ${StyledStepSequenceItemLine} {
    background-color: #94a3b8;
  }

  &:last-child ${StyledStepSequenceItemLine} {
    display: none !important;
  }

  ${space}
`;
