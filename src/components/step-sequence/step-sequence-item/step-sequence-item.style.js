import styled, { css } from "styled-components";
import StyledIcon from "../../icon/icon.style";

const StepSequenceItemStyle = styled.li`
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
        height: var(--sizing300);
        margin: 12px 8px;
      }
    `}
`;

export default StepSequenceItemStyle;
