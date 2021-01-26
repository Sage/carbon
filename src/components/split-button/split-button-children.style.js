import styled, { css } from "styled-components";
import BaseTheme from "../../style/themes/base";
import StyledButton from "../button/button.style";

const StyledSplitButtonChildrenContainer = styled.div`
  ${({ theme, align }) => css`
    background-color: ${theme.colors.secondary};
    min-width: ${({ minWidth }) => minWidth}px;
    white-space: nowrap;
    z-index: ${theme.zIndex.popover};

    ${StyledButton} {
      background-color: ${theme.colors.secondary};
      border: 1px solid ${theme.colors.secondary};
      color: ${theme.colors.white};
      display: block;
      margin-left: 0;
      margin-top: 3px;
      margin-bottom: 3px;
      min-width: 100%;
      text-align: ${align};
      z-index: ${theme.zIndex.overlay};

      &:focus,
      &:hover {
        background-color: ${theme.colors.tertiary};
      }

      & + & {
        margin-top: 3px;
      }
    }
  `}
`;

StyledSplitButtonChildrenContainer.defaultProps = {
  theme: BaseTheme,
};

export default StyledSplitButtonChildrenContainer;
