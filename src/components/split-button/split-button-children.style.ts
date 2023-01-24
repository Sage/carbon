import styled, { css } from "styled-components";
import BaseTheme, { ThemeObject } from "../../style/themes/base";
import StyledButton from "../button/button.style";

type StyledSplitButtonChildrenContainerProps = {
  theme: ThemeObject;
  align: "left" | "right";
  minWidth: number;
};

const StyledSplitButtonChildrenContainer = styled.div<StyledSplitButtonChildrenContainerProps>`
  border-radius: var(--borderRadius100);
  ${({ theme, align, minWidth }) => css`
    background-color: var(--colorsActionMajorYang100);
    min-width: ${minWidth}px;
    white-space: nowrap;
    z-index: ${theme.zIndex.popover};
    box-shadow: var(--boxShadow100);

    ${StyledButton} {
      background-color: var(--colorsActionMajorYang100);
      border: 1px solid var(--colorsActionMajorTransparent);
      color: var(--colorsActionMajor500);
      display: block;
      margin-left: 0;
      min-width: 100%;
      text-align: ${align};
      z-index: ${theme.zIndex.overlay};

      &:focus,
      &:hover {
        color: var(--colorsActionMajorYang100);
        background-color: var(--colorsActionMajor600);
        overflow: hidden;
        border-radius: 0px;
        :first-of-type {
          border-top-left-radius: var(--borderRadius100);
          border-top-right-radius: var(--borderRadius100);
          border-bottom-right-radius: var(--borderRadius000);
          border-bottom-left-radius: var(--borderRadius000);
        }
        :last-of-type {
          border-top-left-radius: var(--borderRadius000);
          border-top-right-radius: var(--borderRadius000);
          border-bottom-right-radius: var(--borderRadius100);
          border-bottom-left-radius: var(--borderRadius100);
        }
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
