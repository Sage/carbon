import styled, { css } from "styled-components";
import BaseTheme, { ThemeObject } from "../../style/themes/base";
import StyledButton from "../button/button.style";

export const borderRadiusStyling = `
  > {
    &:first-child:last-child {
      border-radius: var(--borderRadius100);
    }

    &:first-child:not(:last-child) {
      border-top-left-radius: var(--borderRadius100);
      border-top-right-radius: var(--borderRadius100);
      border-bottom-right-radius: var(--borderRadius000);
      border-bottom-left-radius: var(--borderRadius000);
    }

    &:not(:first-child):not(:last-child) {
      border-radius: var(--borderRadius000);
    }

    &:last-child:not(:first-child) {
      border-top-right-radius: var(--borderRadius000);
      border-top-left-radius: var(--borderRadius000);
      border-bottom-left-radius: var(--borderRadius100);
      border-bottom-right-radius: var(--borderRadius100);
    }
  }
`;

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

    ${borderRadiusStyling}

    ${StyledButton} {
      border: 1px solid var(--colorsActionMajorTransparent);
      display: flex;
      justify-content: ${align};
      margin-left: 0;
      min-width: 100%;
      text-align: ${align};
      z-index: ${theme.zIndex.overlay};

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
