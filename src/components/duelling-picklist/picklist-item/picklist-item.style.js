import styled, { css } from "styled-components";
import baseTheme from "../../../style/themes/base";
import { ButtonWithForwardRef } from "../../button";
import Icon from "../../icon";
import StyledIcon from "../../icon/icon.style";

const StyledPicklistItem = styled.li`
  ${({ locked, theme }) => css`
    display: flex;
    align-items: center;
    width: 100%;

    background-color: ${locked ? theme.picklist.locked : theme.colors.white};

    ${!locked &&
    css`
      box-shadow: 0 2px 4px 0 rgba(0, 20, 29, 0.15),
        0 3px 3px 0 rgba(0, 20, 29, 0.2);
    `}

    ${locked &&
    css`
      border: 1px solid ${theme.picklist.lockedContent};
      color: ${theme.picklist.lockedText};

      ${StyledIcon} {
        color: ${theme.picklist.lockedContent};
      }
    `}

    & + & {
      margin-top: 8px;
    }
  `}
`;

const StyledButton = styled(ButtonWithForwardRef)`
  ${({ iconType, theme }) => css`
    padding: 0;
    margin-right: 0;
    margin-left: auto;
    height: 40px;
    min-width: 40px;

    &:focus {
      > span {
        color: ${theme.colors.white};
      }
      background: ${iconType === "add"
        ? theme.colors.secondary
        : theme.colors.destructive.hover};
    }
  `}
`;

const StyledLockIcon = styled(Icon)`
  margin-right: 0;
  height: 40px;
  min-width: 40px;
`;

StyledPicklistItem.defaultProps = { theme: baseTheme };
StyledButton.defaultProps = { theme: baseTheme };

export { StyledPicklistItem, StyledButton, StyledLockIcon };
