import styled, { css } from "styled-components";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import type { ThemeObject } from "../../style/themes/theme.types";
import StyledButton from "../button/__internal__/__next__/button.style";

export const borderRadiusStyling = `
  > {
    &:first-child:last-child > * {
      border-radius: var(--borderRadius100);
    }

    &:first-child:not(:last-child) > * {
      border-top-left-radius: var(--borderRadius100);
      border-top-right-radius: var(--borderRadius100);
      border-bottom-right-radius: var(--borderRadius000);
      border-bottom-left-radius: var(--borderRadius000);
    }

    &:not(:first-child):not(:last-child) > * {
      border-radius: var(--borderRadius000);
    }

    &:last-child:not(:first-child) > * {
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

const StyledSplitButtonChildrenContainer = styled.ul.attrs(
  applyBaseTheme,
)<StyledSplitButtonChildrenContainerProps>`
  border-radius: var(--borderRadius100);
  ${({ theme, align, minWidth }) => css`
    background-color: var(--colorsActionMajorYang100);
    min-width: ${minWidth}px;
    white-space: nowrap;
    z-index: ${theme.zIndex.popover};
    box-shadow: var(--boxShadow100);
    list-style: none;
    padding: 0;
    margin: 0;

    ${borderRadiusStyling}

    ${StyledButton} {
      border: 1px solid var(--colorsActionMajorTransparent);
      display: flex;
      justify-content: ${align};
      margin-left: 0;
      min-width: 100%;
      text-align: ${align};

      & + & {
        margin-top: 3px;
      }

      &:focus {
        position: relative;
        z-index: 1;
      }
    }
  `}
`;

export default StyledSplitButtonChildrenContainer;
