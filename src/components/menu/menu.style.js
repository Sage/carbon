import styled, { css } from "styled-components";
import { layout, flexbox } from "styled-system";

import {
  StyledVerticalWrapper,
  StyledDivider,
} from "../vertical-divider/vertical-divider.style";
import { baseTheme } from "../../style/themes";

const StyledMenuWrapper = styled.ul`
  line-height: 40px;
  list-style: none;
  margin: 0;
  padding: 0;
  outline: none;

  ${layout}
  ${flexbox}

  ${StyledVerticalWrapper} {
    ${({ menuType, theme }) => css`
      background-color: ${theme.menu.light.background};
      display: inline-block;
      vertical-align: bottom;

      ${menuType === "dark" &&
      css`
        background-color: ${theme.colors.slate};
        color: ${theme.colors.white};
      `}
    `}

    ${StyledDivider} {
      position: relative;
      top: -1px;
    }
  }

  ${({ inFullscreenView }) =>
    inFullscreenView &&
    css`
      padding-bottom: 24px;
    `}
`;

const StyledMenuItem = styled.li`
  ${layout}
  ${flexbox}
  
  ${({ inSubmenu }) => css`
    ${inSubmenu &&
    css`
      display: list-item;
    `}
  `}

    ${({ inFullscreenView }) =>
    inFullscreenView &&
    css`
      padding-top: 16px;
      padding-bottom: 16px;
    `}
`;

StyledMenuWrapper.defaultProps = {
  theme: baseTheme,
};

export { StyledMenuWrapper, StyledMenuItem };
