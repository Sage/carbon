import styled, { css } from "styled-components";
import { layout, flexbox } from "styled-system";
import menuConfigVariants from "./menu.config";

import {
  StyledVerticalWrapper,
  StyledDivider,
} from "../vertical-divider/vertical-divider.style";
import { StyledLink } from "../link/link.style";

const StyledMenuWrapper = styled.ul`
  line-height: 40px;
  list-style: none;
  margin: 0;
  padding: 0;
  outline: none;

  ${layout}
  ${flexbox}

  ${StyledVerticalWrapper} {
    ${({ menuType }) => css`
      display: inline-block;
      vertical-align: bottom;
      background-color: ${menuConfigVariants[menuType].background};
      ${menuType === "dark" &&
      css`
        color: ${menuConfigVariants[menuType].color};
      `}
    `}
    ${StyledDivider} {
      position: relative;
      top: -1px;
    }
  }
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
      a,
      ${StyledLink} a,
      button,
      ${StyledLink} button,
      > span,
      > div,
      [data-component="submenu-wrapper"] > ${StyledLink} {
        width: 100%;
        box-sizing: border-box;
      }
    `}
`;

export { StyledMenuWrapper, StyledMenuItem };
