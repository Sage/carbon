import styled, { css } from "styled-components";
import {
  StyledSubmenu,
  StyledSubmenuTitle,
  StyledSubmenuBlock,
} from "../submenu-block/submenu.style";
import { baseTheme } from "../../../style/themes";
import StyledIcon from "../../icon/icon.style";
import LinkStyle from "../../link/link.style";

const StyledMenuItemWrapper = styled.a`
  ${({
    menuType,
    theme,
    selected,
    hasSubmenu,
    isOpen,
    variant,
    showDropdownArrow,
  }) => css`
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    height: 40px;
    position: relative;
    cursor: pointer;
    background-color: ${theme.menu.light.background};

    && a:focus {
      outline: none;
      box-shadow: inset 0 0 0 2px ${theme.colors.focus};
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
      z-index: 1;
      position: relative;

      [data-component="icon"] {
        color: ${theme.colors.white};
      }
    }

    a,
    ${LinkStyle} a,
    button,
    ${LinkStyle} button {
      padding: 0 16px;
    }

    button,
    ${LinkStyle} button {
      line-height: 40px;
      height: 40px;
      margin: 0px;
    }

    a,
    button,
    [data-component="icon"],
    ${LinkStyle} a,
    ${LinkStyle} button,
    ${LinkStyle} [data-component="icon"] {
      font-weight: 700;
      text-decoration: none;
      color: ${theme.colors.black};
    }

    a:hover,
    a:focus,
    button:hover,
    button:focus {
      color: ${theme.colors.white};
      background: transparent;
    }

    a:focus,
    button:focus,
    ${LinkStyle} a:focus,
    ${LinkStyle} button:focus {
      color: ${theme.colors.white};
      box-shadow: inset 0 0 0 2px ${theme.colors.focus};
      background: ${theme.colors.primary};
      z-index: 1;
      position: relative;
    }

    :hover {
      background: ${theme.colors.primary};

      a,
      button,
      [data-component="icon"] {
        color: ${theme.colors.white};
      }
    }

    ${hasSubmenu &&
    menuType === "light" &&
    css`
      :hover &,
      :hover {
        background-color: ${theme.colors.white};
        color: ${theme.colors.black};

        a,
        button:not(:hover),
        [data-component="icon"] {
          color: ${theme.colors.black};
        }

        a:focus,
        button:focus {
          color: ${theme.colors.white};
        }
      }

      ${isOpen &&
      css`
        & & {
          background-color: ${theme.colors.white};
          color: ${theme.colors.black};

          a,
          button,
          [data-component="icon"] {
            color: ${theme.colors.black};
          }
        }
      `}
    `}

    ${variant === "alternate" &&
    css`
      &&&& {
        background-color: ${theme.menu.light.background};
      }
    `}

    ${selected &&
    css`
      background-color: ${theme.menu.light.selected};
    `}

    ${menuType === "dark" &&
    css`
      background-color: ${theme.colors.slate};
      color: ${theme.colors.white};

      a,
      a:hover,
      a:focus,
      button,
      button:hover,
      [data-component="icon"],
      ${LinkStyle} [data-component="icon"] {
        font-weight: 700;
        text-decoration: none;
        color: ${theme.colors.white};
        background-color: transparent;
      }

      ${selected &&
      css`
        background-color: ${theme.menu.dark.selected};
      `}

      [data-component='icon'] {
        color: ${theme.colors.white};
      }

      ${hasSubmenu &&
      css`
        :hover &,
        :hover {
          background-color: ${theme.menu.dark.submenuBackground};
          color: ${theme.colors.white};

          a,
          button,
          [data-component="icon"] {
            color: ${theme.colors.white};
          }
        }

        ${isOpen &&
        css`
          & & {
            background-color: ${theme.menu.dark.submenuBackground};
            color: ${theme.colors.white};

            a,
            button,
            [data-component="icon"] {
              color: ${theme.colors.white};
            }
          }

          .carbon-menu-item--has-link button {
            color: ${theme.colors.white};
          }
        `}
      `}

      ${variant === "alternate" &&
      css`
        &&&& {
          background-color: ${theme.colors.slate};
        }
      `}
    `}

    ${hasSubmenu &&
    css`
      padding: 0;

      ${showDropdownArrow &&
      css`
        ${StyledSubmenuTitle} {
          ${StyledMenuItemWrapper} {
            padding-right: 32px;

            &::before {
              display: block;
              margin-top: -2px;
              pointer-events: none;
              position: absolute;
              right: 16px;
              top: 50%;
              z-index: 2;
              content: "";
              width: 0;
              height: 0;
              border-top: 5px solid
                ${menuType !== "dark" ? theme.colors.slate : theme.colors.white};
              border-right: 4px solid transparent;
              border-bottom: 4px solid transparent;
              border-left: 4px solid transparent;
            }

            &:focus::before {
              border-top-color: ${theme.colors.white};
            }
          }
        }
      `}

      &:hover {
        ${StyledSubmenu} {
          display: block;
        }
      }

      ${isOpen &&
      css`
        ${StyledSubmenu} {
          display: block;
        }
      `}
    `}

    ${StyledSubmenu} {
      background-color: ${theme.colors.white};

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
        &:hover,
        &:hover a,
        a &:hover {
          color: ${theme.colors.white};
        }

        a {
          text-decoration: none;
        }
      }

      ${selected &&
      css`
        color: #38c72a;
      `}

      ${menuType === "dark" &&
      css`
        background: ${variant === "default"
          ? theme.menu.dark.submenuBackground
          : theme.colors.slate};

        .carbon-menu-item--has-link:hover {
          background-color: ${theme.colors.primary};
          text-decoration: none;

          [data-component="icon"] {
            color: ${theme.colors.white};
          }
        }
      `}

      ${StyledMenuItemWrapper} {
        display: flex;
        align-items: center;
        height: 40px;
        line-height: 40px;
        white-space: nowrap;
        cursor: pointer;

        ${StyledIcon} {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }
      }
    }

    ${menuType === "dark" &&
    css`
      ${StyledSubmenuBlock} {
        background-color: ${theme.menu.dark.submenuBackground};

        ${StyledMenuItemWrapper} {
          background-color: ${variant === "default"
            ? "transparent"
            : theme.menu.dark.alternate};
        }
      }
    `}
  `}
`;

StyledMenuItemWrapper.defaultProps = {
  theme: baseTheme,
};

export default StyledMenuItemWrapper;
