import styled, { css } from "styled-components";
import { baseTheme } from "../../../../style/themes";
import { StyledLink } from "../../../link/link.style";
import { StyledMenuItem } from "../../menu.style";
import StyledMenuItemWrapper from "../../menu-item/menu-item.style";
import StyledIcon from "../../../icon/icon.style";
import StyledScrollableBlock from "../../scrollable-block/scrollable-block.style";
import StyledSearch from "../../../search/search.style";

const StyledSubmenuWrapper = styled.div`
  position: relative;
  width: fit-content;
  max-width: inherit;

  ${({ isSubmenuOpen, theme }) =>
    isSubmenuOpen &&
    css`
      z-index: ${theme.zIndex.popover};
    `}

  ${({ inFullscreenView, menuType, asPassiveItem, theme }) =>
    inFullscreenView &&
    asPassiveItem &&
    css`
      ${StyledMenuItemWrapper} {
        outline: none;
        color: ${theme.menu[menuType].title};
      }
    `}
`;

const StyledSubmenu = styled.ul`
  ${({ menuType, theme, submenuDirection, variant, inFullscreenView }) => css`
    ${!inFullscreenView &&
    css`
      box-shadow: 0 5px 5px 0 rgba(0, 20, 29, 0.2),
        0 10px 10px 0 rgba(0, 20, 29, 0.1);
      position: absolute;
      background: ${variant === "default"
        ? theme.menu[menuType].submenuBackground
        : theme.menu[menuType].background};
      a,
      button,
      ${StyledLink} a,
      ${StyledLink} button {
        width: 100%;
      }
    `}

    ${inFullscreenView &&
    css`
      ${StyledMenuItem} {
        width: 100vw;
      }
    `}

    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    min-width: 100%;

    ${StyledMenuItemWrapper}:after, ${StyledMenuItemWrapper}:hover:after {
      display: none;
    }

    .carbon-menu-item--has-link:hover {
      background: ${theme.colors.primary};
      cursor: pointer;
      color: white;
      text-decoration: none;

      [data-component="icon"] {
        color: white;
      }
    }

    ${StyledMenuItemWrapper} {
      display: flex;
      align-items: center;
      height: 40px;
      line-height: 40px;
      white-space: nowrap;
      cursor: pointer;

      ${!inFullscreenView &&
      `background-color: ${theme.menu[menuType].submenuBackground};`}

      &:hover,
      &:hover a,
      a &:hover {
        color: ${theme.colors.white};
      }

      a {
        text-decoration: none;
      }

      ${StyledIcon} {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }

      ${StyledSearch} [data-component="icon"] {
        color: ${theme.menu[menuType].searchIcon};

        &:hover {
          color: ${theme.menu[menuType].searchIconHover};
        }
      }
    }

    [data-component="icon"] {
      line-height: 16px;
      top: -1px;

      &:before {
        line-height: unset;
      }

      span {
        vertical-align: middle;

        svg {
          height: 16px;
          width: 16px;
        }
      }
    }

    &:before {
      background-color: transparent;
      border-radius: 0 0 4px 4px;
      content: "";
      height: 5px;
      position: absolute;
      top: -5px;
      width: 100%;
    }

    > *:not(${StyledMenuItem}):not(${StyledScrollableBlock}) {
      padding: 8px 15px 10px;
      background-color: ${theme.colors.white};

      ${menuType === "dark" &&
      css`
        background-color: #1b1d21;
      `}
    }

    ${submenuDirection === "left" &&
    css`
      right: 0;
    `}
  `}
`;

StyledSubmenu.defaultProps = {
  theme: baseTheme,
};

StyledSubmenuWrapper.defaultProps = {
  theme: baseTheme,
};

export { StyledSubmenu, StyledSubmenuWrapper };
