import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";
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

    ${variant === "alternate" &&
    css`
      &&& {
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
          background-color: ${theme.menu.dark.submenuBackground};
          color: ${theme.colors.white};
        `}
      `}

      ${variant === "alternate" &&
      css`
        &&& {
          background-color: ${theme.colors.slate};
        }
      `}
    `}

    ${hasSubmenu &&
    css`
      ${menuType === "light" &&
      css`
        :hover &,
        :hover {
          background-color: ${theme.colors.white};
          color: ${theme.colors.black};

          a,
          button,
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
          background-color: ${theme.colors.white};
          color: ${theme.colors.black};
        `}
      `}

      ${showDropdownArrow &&
      css`
        > a {
          padding-right: 32px;
          &:focus::before {
            border-top-color: ${theme.colors.white};
          }
        }
        a::before {
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
      `}
    `}
  `}
`;

StyledMenuItemWrapper.defaultProps = {
  theme: baseTheme,
};

export default StyledMenuItemWrapper;
