import styled, { css } from "styled-components";
import { StepSequenceProps } from "../step-sequence.component";
import { StepSequenceItemProps } from "./step-sequence-item.component";
import StyledIcon from "../../icon/icon.style";

export const StyledStepSequenceItem = styled.li<
  Pick<StepSequenceItemProps, "status"> & Pick<StepSequenceProps, "orientation">
>`
  display: flex;
  align-items: center;
  flex-grow: 1;
  text-align: right;
  list-style-type: none;
  color: var(--colorsUtilityYin055);

  ${({ orientation, status }) => {
    const side: string = orientation === "vertical" ? "left" : "top";

    return css`
      &::before {
        content: "";
        flex-grow: 1;
        display: block;
        margin: 0 16px;
        border-${side}: var(--sizing025) dashed var(--colorsUtilityYin055);
      }

      & span {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      ${StyledIcon} {
        margin-right: 8px;
        color: var(--colorsBaseTheme, var(--colorsSemanticPositive500));
      }

      &:first-child {
        flex-grow: 0;

        &::before {
          display: none;
        }
      }

      ${
        status === "current" &&
        css`
          color: var(--colorsUtilityYin090);

          &::before {
            border-${side}-color: var(--colorsUtilityYin090);
            border-${side}-style: solid;
          }
        `
      }

      ${
        status === "complete" &&
        css`
          color: var(--colorsBaseTheme, var(--colorsSemanticPositive500));

          &::before {
            border-${side}-color: var(
              --colorsBaseTheme,
              var(--colorsSemanticPositive500)
            );
            border-${side}-style: solid;
          }
        `
      }

      ${
        orientation === "vertical" &&
        css`
          flex-direction: column;
          align-items: flex-start;

          &::before {
            flex-grow: 0;
            border-left-width: var(--sizing025);
            height: 100%;
            min-height: var(--sizing300);
            margin: 12px 8px;
          }
        `
      }
    `;
  }}
`;

export const StyledStepSequenceItemContent = styled.span`
  display: flex;
`;

export const StyledStepSequenceItemHiddenLabel = styled.span`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
`;

export const StyledStepSequenceItemIndicator = styled.span`
  display: block;
  min-width: 16px;
  height: 16px;
  margin-right: 8px;
  text-align: center;
`;
