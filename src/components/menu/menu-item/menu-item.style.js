import styled, { css } from "styled-components";
import { StyledLink } from "../../link/link.style";
import IconStyle from "../../icon/icon.style";
import menuConfigVariants from "../menu.config";

const StyledMenuItemWrapper = styled.a`
  ${({
    menuType,
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
    overrideColor,
    as,
  }) => css`
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    height: 40px;
    position: relative;
    cursor: pointer;
    ${
      !overrideColor &&
      css`
        background-color: ${menuConfigVariants[menuType].background};
      `
    }};
    
    ${
      overrideColor &&
      css`
        &&&& {
          background-color: ${variant === "alternate"
            ? menuConfigVariants[menuType].alternate
            : menuConfigVariants[menuType].submenuItemBackground};
        }
      `
    }

    ${
      !inFullscreenView &&
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

        a:focus,
        button:focus {
          box-shadow: inset 0 0 0 var(--borderWidth300)
            var(--colorsSemanticFocus500);
          background-color: ${menuConfigVariants[menuType].background};
          color: ${menuConfigVariants[menuType].color};
          z-index: 1;
          position: relative;
        }

        a:hover,
        button:hover {
          background-color: var(--colorsComponentsMenuAutumnStandard600);
          color: var(--colorsComponentsMenuYang100);

          [data-component="icon"] {
            color: var(--colorsComponentsMenuYang100);
          }
        }
      `
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
      color: ${menuConfigVariants[menuType].color};
    }

    ${IconStyle} {
      bottom: 1px;
    }

    ${
      selected &&
      css`
        background-color: ${menuConfigVariants[menuType].selected};

        a:focus,
        button:focus {
          background-color: ${menuConfigVariants[menuType].selected};
        }

        a:hover,
        button:hover {
          background-color: var(--colorsComponentsMenuAutumnStandard600);
        }
      `
    }

    ${
      variant === "alternate" &&
      !inFullscreenView &&
      css`
        &&& {
          background-color: ${menuConfigVariants[menuType].alternate};
        }

        &&& a:focus,
        &&& button:focus {
          background-color: ${menuConfigVariants[menuType].alternate};
        }

        &&& a:hover,
        &&& button:hover {
          background-color: ${menuConfigVariants[menuType].alternateHover};
        }
      `
    }

    ${
      isOpen &&
      css`
        a,
        button {
          background-color: ${menuConfigVariants[menuType]
            .submenuItemBackground};
          color: ${menuConfigVariants[menuType].color};
        }
      `
    } 
    
    ${
      hasSubmenu &&
      css`
        background-color: ${menuConfigVariants[menuType].submenuBackground};

        a:focus,
        button:focus {
          background-color: ${menuConfigVariants[menuType].submenuBackground};
          color: ${menuConfigVariants[menuType].color};

          [data-component="icon"] {
            color: ${menuConfigVariants[menuType].color};
          }

          ${clickToOpen &&
          isOpen &&
          css`
            background-color: ${menuConfigVariants[menuType]
              .submenuOpenedBackground};
          `}
        }

        a:hover,
        button:hover {
          background-color: ${menuConfigVariants[menuType]
            .submenuOpenedBackground};
          color: var(--colorsComponentsMenuYang100);

          ${!(href || clickToOpen) &&
          css`
            cursor: default;
            background-color: ${menuConfigVariants[menuType]
              .submenuItemBackground};
            color: ${menuConfigVariants[menuType].color};
          `}

          [data-component="icon"] {
            color: ${menuConfigVariants[menuType].color};
          }
        }

        ${selected &&
        css`
          background-color: ${menuConfigVariants[menuType].submenuSelected};

          a:focus,
          button:focus {
            background-color: ${menuConfigVariants[menuType].submenuSelected};
          }

          a:hover,
          button:hover {
            background-color: var(--colorsComponentsMenuAutumnStandard600);
            color: var(--colorsComponentsMenuYang100);
          }
        `}

        ${showDropdownArrow &&
        css`
          > a,
          > button {
            padding-right: 32px;
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
            border-top: 5px solid ${menuConfigVariants[menuType].text};
            border-right: 4px solid transparent;
            border-bottom: 4px solid transparent;
            border-left: 4px solid transparent;
          }
        `};
      `
    }

    ${
      isSearch &&
      css`
        padding: 2px 16px;
      `
    }

    ${
      inFullscreenView &&
      css`
        ${as === "div" &&
        css`
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

        a:focus,
        button:focus {
          box-shadow: inset 0 0 0 var(--borderWidth300)
            var(--colorsSemanticFocus500);
          z-index: 1;
          position: relative;
        }

        a:focus,
        a:hover,
        button:focus,
        button:hover {
          background-color: var(--colorsComponentsMenuAutumnStandard600);
          color: var(--colorsComponentsMenuYang100);

          [data-component="icon"] {
            color: var(--colorsComponentsMenuYang100);
          }
        }
      `
    }
  `}
`;

export default StyledMenuItemWrapper;
