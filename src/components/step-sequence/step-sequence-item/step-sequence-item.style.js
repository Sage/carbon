import styled, { css } from "styled-components";
import baseTheme from "../../../style/themes/base";
import StyledIcon from "../../icon/icon.style";

const StepSequenceItemStyle = styled.li`
  display: flex;
  align-items: center;
  flex-grow: 1;
  text-align: right;
  list-style-type: none;
  color: ${({ theme }) => theme.disabled.disabled};

  &::before {
    content: "";
    flex-grow: 1;
    display: block;
    height: 1px;
    margin: 0 16px;
    background-color: ${({ theme }) => theme.disabled.disabled};
  }

  & span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ${StyledIcon} {
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.primary};
  }

  &:first-child {
    flex-grow: 0;

    &::before {
      display: none;
    }
  }

  ${({ theme, status }) =>
    status === "current" &&
    css`
      color: ${theme.text.color};

      &::before {
        background-color: ${theme.colors.primary};
      }
    `}

  ${({ theme, status }) =>
    status === "complete" &&
    css`
      color: ${theme.stepSequence.completedText};

      &::before {
        background-color: ${theme.colors.primary};
      }
    `}

  ${({ orientation }) =>
    orientation === "vertical" &&
    css`
      flex-direction: column;
      align-items: flex-start;

      &::before {
        flex-grow: 0;
        width: 1px;
        height: 24px;
        margin: 12px 8px;
      }
    `}
`;

StepSequenceItemStyle.defaultProps = {
  theme: baseTheme,
};

export default StepSequenceItemStyle;
