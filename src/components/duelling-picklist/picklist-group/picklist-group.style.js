import styled, { css } from "styled-components";
import baseTheme from "../../../style/themes/base";
import Button from "../../button";
import { StyledButton } from "../picklist-item/picklist-item.style";

const StyledGroupWrapper = styled.div`
  ${({ highlighted, type, theme }) => css`
    &:not(:first-of-type) {
      margin-top: 16px;
    }

    ${highlighted &&
    css`
      ${StyledButton} {
        background: ${type === "add"
          ? theme.colors.secondary
          : theme.colors.destructive.hover};
      }
    `}
  `}
`;

const StyledPicklistGroup = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 4px;
`;

const StyledGroupButton = styled(Button)`
  ${({ iconType, theme }) => css`
    padding: 0;
    margin-right: 0;
    margin-left: auto;
    height: 40px;
    min-width: 40px;
    border: none;

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

StyledGroupWrapper.defaultProps = { theme: baseTheme };
StyledGroupButton.defaultProps = { theme: baseTheme };

export { StyledGroupWrapper, StyledPicklistGroup, StyledGroupButton };
