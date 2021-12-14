import styled, { css } from "styled-components";
import BaseTheme from "../../style/themes/base";
import StyledButton from "../button/button.style";

const StyledSplitButtonChildrenContainer = styled.div`
  ${({ theme, align }) => css`
    background-color: var(--colorsActionMajorYang100);
    min-width: ${({ minWidth }) => minWidth}px;
    white-space: nowrap;
    z-index: ${theme.zIndex.popover};

    ${StyledButton} {
      background-color: var(--colorsActionMajorYang100);
      border: 1px solid var(--colorsActionMajorTransparent);
      color: var(--colorsActionMajor500);
      display: block;
      margin-left: 0;
      margin-top: 3px;
      margin-bottom: 3px;
      min-width: 100%;
      text-align: ${align};
      z-index: ${theme.zIndex.overlay};

      &:focus,
      &:hover {
        color: var(--colorsActionMajorYang100);
        background-color: var(--colorsActionMajor600);
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
