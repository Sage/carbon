import styled, { css } from "styled-components";
import StyledIcon from "../../icon/icon.style";

type StyledStepSequenceItem = {
  status: "complete" | "current" | "incomplete";
  orientation: "horizontal" | "vertical";
};

export const StyledStepSequenceItem = styled.li<StyledStepSequenceItem>`
  display: flex;
  align-items: center;
  flex-grow: 1;
  text-align: right;
  list-style-type: none;
  color: var(--colorsUtilityYin055);

  &::before {
    content: "";
    flex-grow: 1;
    display: block;
    height: var(--sizing025);
    margin: 0 16px;
    background-color: var(--colorsUtilityYin055);
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

  ${({ status }) =>
    status === "current" &&
    css`
      color: var(--colorsUtilityYin090);

      &::before {
        background-color: var(--colorsUtilityYin090);
      }
    `}

  ${({ status }) =>
    status === "complete" &&
    css`
      color: var(--colorsBaseTheme, var(--colorsSemanticPositive500));

      &::before {
        background-color: var(
          --colorsBaseTheme,
          var(--colorsSemanticPositive500)
        );
      }
    `}

  ${({ orientation }) =>
    orientation === "vertical" &&
    css`
      flex-direction: column;
      align-items: flex-start;

      &::before {
        flex-grow: 0;
        width: var(--sizing025);
        height: 100%;
        min-height: var(--sizing300);
        margin: 12px 8px;
      }
    `}
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
