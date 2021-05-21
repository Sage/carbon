import styled, { css } from "styled-components";
import { baseTheme } from "../../../../style/themes";
import LinkStyle from "../../../link/link.style";
import { StyledMenuItem } from "../../menu.style";
import StyledMenuItemWrapper from "../../menu-item/menu-item.style";
import StyledIcon from "../../../icon/icon.style";
import StyledScrollableBlock from "../../scrollable-block/scrollable-block.style";
import StyledSearch from "../../../search/search.style";

const StyledSubmenuWrapper = styled.div`
  position: relative;
  width: fit-content;

  ${({ isSubmenuOpen, theme }) =>
    isSubmenuOpen &&
    css`
      z-index: ${theme.zIndex.popover};
    `}
`;

const StyledSubmenu = styled.ul`
  ${({ menuType, theme, submenuDirection, variant }) => css`
    box-shadow: 0 5px 5px 0 rgba(0, 20, 29, 0.2),
      0 10px 10px 0 rgba(0, 20, 29, 0.1);
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    background-color: ${theme.colors.white};
    min-width: 100%;

    a,
    button,
    ${LinkStyle} a,
    ${LinkStyle} button {
      width: 100%;
    }

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

      ${menuType === "light" &&
      css`
        background-color: ${theme.colors.white};
        color: ${theme.colors.black};
      `}

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
    }

    ${menuType === "dark" &&
    css`
      background: ${variant === "default"
        ? theme.menu.dark.submenuBackground
        : theme.colors.slate};

      ${StyledMenuItemWrapper} {
        background-color: ${theme.menu.dark.submenuBackground};
        color: ${theme.colors.white};

        a,
        button,
        [data-component="icon"] {
          color: ${theme.colors.white};
        }

        .carbon-menu-item--has-link button {
          color: ${theme.colors.white};
        }

        ${StyledSearch} [data-component="icon"] {
          color: ${theme.menu.dark.searchIcon};

          &:hover {
            color: ${theme.menu.dark.searchIconHover};
          }
        }
      }

      .carbon-menu-item--has-link:hover {
        background-color: ${theme.colors.primary};
        text-decoration: none;

        [data-component="icon"] {
          color: ${theme.colors.white};
        }
      }
    `}

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
