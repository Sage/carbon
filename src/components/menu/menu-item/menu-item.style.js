import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";
import { StyledLink } from "../../link/link.style";
import IconStyle from "../../icon/icon.style";

const StyledMenuItemWrapper = styled.a`
  ${({
    menuType,
    theme,
    selected,
    hasSubmenu,
    isOpen,
    variant,
    showDropdownArrow,
    isSearch,
    href,
    clickToOpen,
    maxWidth,
    inFullscreenView,
    as,
  }) => css`
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    height: 40px;
    position: relative;
    cursor: pointer;
    background-color: ${theme.menu[menuType].background};

    ${!inFullscreenView &&
    css`
      max-width: inherit;

      a,
      button {
        ${maxWidth &&
        css`
          box-sizing: border-box;
          max-width: inherit;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          vertical-align: bottom;
        `}
      }
    `}

    && a:focus,
    && button:focus {
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
    ${StyledLink} a,
    button,
    ${StyledLink} button {
      padding: 0 16px;
    }

    button,
    ${StyledLink} button {
      line-height: 40px;
      height: 40px;
      margin: 0px;
      text-align: left;
    }

    a,
    button,
    [data-component="icon"],
    ${StyledLink} a,
    ${StyledLink} button,
    ${StyledLink} [data-component="icon"] {
      font-weight: 700;
      text-decoration: none;
      color: ${theme.menu[menuType].text};
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
    ${StyledLink} a:focus,
    ${StyledLink} button:focus {
      color: ${theme.colors.white};
      box-shadow: inset 0 0 0 2px ${theme.colors.focus};
      background: ${theme.colors.primary};
      z-index: 1;
      position: relative;
    }

    ${IconStyle} {
      bottom: 1px;
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
        background-color: ${theme.menu[menuType].alternate};
      }
    `}

    ${selected &&
    css`
      background-color: ${theme.menu[menuType].selected};
    `}

    ${isOpen &&
    css`
      background-color: ${theme.menu[menuType].submenuBackground};
      color: ${theme.colors.white};
    `} 
    
    ${hasSubmenu &&
    css`
      a:hover,
      button:hover {
        ${!(href || clickToOpen) &&
        css`
          cursor: default;
        `}
      }

      ${!href &&
      css`
        && a:hover,
        && button:hover {
          background-color: ${theme.menu[menuType].submenuBackground};
          color: ${theme.menu[menuType].text};

          [data-component="icon"] {
            color: ${theme.menu[menuType].text};
          }
        }

        && a:focus,
        && button:focus {
          background-color: ${theme.menu[menuType].submenuBackground};
          color: ${theme.menu[menuType].text};

          a,
          button,
          [data-component="icon"] {
            color: ${theme.menu[menuType].text};
          }
        }
      `}

      ${showDropdownArrow &&
      css`
        > a,
        > button {
          padding-right: 32px;

          ${href &&
          css`
            &:hover::before,
            &:focus::before {
              border-top-color: ${theme.colors.white};
            }
          `}
        }

        a::before,
        button::before {
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
          border-top: 5px solid ${theme.menu[menuType].text};
          border-right: 4px solid transparent;
          border-bottom: 4px solid transparent;
          border-left: 4px solid transparent;
        }
      `};
    `}

    ${isSearch &&
    css`
      padding: 2px 16px;
    `}

    ${inFullscreenView &&
    css`
      ${as === "div" &&
      css`
        width: 100vw;
        cursor: default;
        padding: 0 16px;

        :hover {
          background: transparent;
        }
      `}

      a,
      ${StyledLink} a,
      button,
      ${StyledLink} button {
        width: 100vw;
        box-sizing: border-box;
      }
    `}
  `}
`;

StyledMenuItemWrapper.defaultProps = {
  theme: baseTheme,
};

export default StyledMenuItemWrapper;
