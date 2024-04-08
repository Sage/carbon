import styled, { css } from "styled-components";
import {
  layout,
  flexbox,
  padding,
  FlexboxProps,
  LayoutProps,
  PaddingProps,
} from "styled-system";
import menuConfigVariants from "./menu.config";

import {
  StyledVerticalWrapper,
  StyledDivider,
} from "../vertical-divider/vertical-divider.style";
import { StyledLink } from "../link/link.style";
import { MenuProps } from "./menu.component";
import { baseTheme } from "../../style/themes";
import StyledMenuItemWrapper from "./menu-item/menu-item.style";

interface StyledMenuProps
  extends Pick<MenuProps, "menuType">,
    FlexboxProps,
    LayoutProps {
  inFullscreenView?: boolean;
}

const StyledMenuWrapper = styled.ul<StyledMenuProps>`
  line-height: 40px;
  list-style: none;
  margin: 0;
  padding: 0;
  outline: none;
  display: flex;

  ${layout}
  ${flexbox}

  ${StyledVerticalWrapper} {
    ${({ menuType }) =>
      menuType &&
      css`
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

interface StyledMenuItemProps
  extends Pick<MenuProps, "menuType" | "maxWidth">,
    PaddingProps {
  inFullscreenView?: boolean;
  inSubmenu?: boolean;
}

const StyledMenuItem = styled.li<StyledMenuItemProps>`
  ${layout}
  ${flexbox}

  ${StyledLink} a:focus, ${StyledLink} button:focus {
    border-radius: var(--borderRadius000);
  }

  ${({ inSubmenu }) => css`
    ${inSubmenu &&
    css`
      display: list-item;
    `}
  `}

  ${({ inFullscreenView }) =>
    inFullscreenView &&
    css`
      padding-top: var(--spacing200);
      padding-bottom: var(--spacing200);

      > a,
      ${StyledLink} > a,
      > button,
      ${StyledLink} > button,
      > span,
      > div,
      [data-component="submenu-wrapper"] > ${StyledLink} {
        width: 100%;
        box-sizing: border-box;
      }
    `}

  ${StyledMenuItemWrapper} {
    ${padding}
  }
`;

StyledMenuItem.defaultProps = {
  theme: baseTheme,
};

export { StyledMenuWrapper, StyledMenuItem };
