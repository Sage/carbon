import styled, { css } from "styled-components";
import { padding, PaddingProps } from "styled-system";
import StyledButton from "../../button/button.style";
import { StyledContent, StyledLink } from "../../link/link.style";
import StyledIcon from "../../icon/icon.style";
import StyledIconButton from "../../icon-button/icon-button.style";
import menuConfigVariants from "../menu.config";
import { MenuType } from "../__internal__/menu.context";
import { MenuWithChildren } from "./menu-item.component";
import Link from "../../link";
import addFocusStyling from "../../../style/utils/add-focus-styling";
import { baseTheme } from "../../../style/themes";

interface StyledMenuItemWrapperProps
  extends Pick<
      MenuWithChildren,
      | "href"
      | "showDropdownArrow"
      | "overrideColor"
      | "clickToOpen"
      | "maxWidth"
    >,
    PaddingProps {
  menuType: MenuType;
  selected?: boolean;
  hasSubmenu?: boolean;
  isOpen?: boolean;
  inFullscreenView?: boolean;
  asPassiveItem?: boolean;
  placeholderTabIndex?: boolean;
  icon?: string;
  ariaLabel?: string;
  asDiv?: boolean;
  hasInput?: boolean;
  menuItemVariant?: Pick<MenuWithChildren, "variant">["variant"];
}

const oldFocusStyling = `
  box-shadow: inset 0 0 0 var(--borderWidth300) var(--colorsSemanticFocus500);
`;

const StyledMenuItemWrapper = styled.a.attrs({
  as: Link,
})<StyledMenuItemWrapperProps>`
  ${({
    menuType,
    selected,
    hasSubmenu,
    isOpen,
    menuItemVariant,
    showDropdownArrow,
    href,
    clickToOpen,
    maxWidth,
    inFullscreenView,
    overrideColor,
    asPassiveItem,
    asDiv,
    hasInput,
  }) => css`
    ${!inFullscreenView &&
    css`
      ${padding}
    `}

    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    min-height: 40px;
    position: relative;
    box-shadow: none;

    a,
    button {
      cursor: pointer;
    }

    a:focus,
    button:focus {
      ${({ theme }) =>
        `${
          !theme.focusRedesignOptOut
            ? addFocusStyling(true)
            : /* istanbul ignore next */ oldFocusStyling
        }
      `}
    }

    ${!maxWidth &&
    css`
      :has([data-component="icon"]):not(:has(button)) ${StyledContent} {
        position: relative;
        top: -2px;
      }
    `}

    :has([data-element="input"]) ${StyledContent} {
      width: 100%;
    }

    ${!overrideColor &&
    css`
      background-color: ${menuConfigVariants[menuType].background};
    `}

    ${overrideColor &&
    css`
      &&&& {
        background-color: ${menuItemVariant === "alternate"
          ? menuConfigVariants[menuType].alternate
          : menuConfigVariants[menuType].submenuItemBackground};
      }
    `}

    ${!inFullscreenView &&
    css`
      max-width: inherit;

      > a,
      > button {
        display: flex;
        align-items: center;
      }

      && {
        a:focus,
        button:focus {
          background-color: ${menuConfigVariants[menuType].background};
          color: ${menuConfigVariants[menuType].color};
          z-index: 1;
          position: relative;
        }
      }

      &&& {
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
            display: block;
          `}
        }

        a:hover,
        button:hover {
          ${!asDiv &&
          css`
            background-color: var(--colorsComponentsMenuAutumnStandard600);
            color: var(--colorsComponentsMenuYang100);

            [data-component="icon"] {
              color: var(--colorsComponentsMenuYang100);
            }
          `}

          ::before {
            border-top-color: var(--colorsComponentsMenuYang100);
          }
        }
      }
    `}

    ${asPassiveItem
      ? `
        ${
          !inFullscreenView &&
          `
          > a:not(:has(button)) {
            padding: 11px 16px 12px;
          }

          > a ${StyledButton}:not(.search-button) {
            min-height: 17px;
            padding: 9px 0px 11px; 
          }
        `
        }

        ${StyledIconButton} {
          > span {
            display: inline-flex;
            margin-right: 0;
          }

          :focus {
            outline: none;
            [data-component="icon"] {
              color: ${menuConfigVariants[menuType].color};
            }
          }
        }
      `
      : `
        a,
        ${StyledLink} a,
        button,
        ${StyledLink} button {
       
          padding: ${inFullscreenView ? "0px 16px" : "11px 16px 12px"};

          :has([data-component="icon"]) {
            padding: 9px 16px 7px;
          }
        }
      `}

    button,
    ${StyledLink} button {
      height: 40px;
      margin: 0px;
      text-align: left;

      ${inFullscreenView &&
      css`
        height: auto;
        white-space: normal;
      `}
    }

    &&& {
      a,
      button,
      [data-component="icon"],
      ${StyledLink} a,
      ${StyledLink} button,
      ${StyledLink} [data-component="icon"] {
        font-weight: 700;
        text-decoration: none;
        ${!hasInput && `color: ${menuConfigVariants[menuType].color};`}
      }

      ${!inFullscreenView &&
      css`
        a > ${StyledIcon}, button > ${StyledIcon} {
          display: inline-block;
        }
      `}
    }

    ${selected &&
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
    `}

    ${menuItemVariant === "alternate" &&
    !inFullscreenView &&
    css`
      &&& {
        background-color: ${menuConfigVariants[menuType].alternate};
      }

      &&& a:focus,
      &&& button:focus {
        background-color: ${menuConfigVariants[menuType].alternate};
      }

      ${!hasInput &&
      css`
        &&& a:hover,
        &&& button:hover {
          background-color: ${menuConfigVariants[menuType].alternateHover};
        }
      `}
    `}

    ${isOpen &&
    css`
      a,
      button {
        background-color: ${menuConfigVariants[menuType].submenuItemBackground};
        color: ${menuConfigVariants[menuType].color};
      }
    `}

    ${hasSubmenu &&
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
        > button:not(${StyledIconButton}) {
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
          border-width: 5px 4px 4px;
          border-style: solid;
          border-top-color: initial;
          border-right-color: transparent;
          border-bottom-color: transparent;
          border-left-color: transparent;
        }
      `}
    `}

    ${inFullscreenView &&
    css`
      ${
        asDiv &&
        css`
          &&& {
            > a,
            > button {
              color: ${menuConfigVariants[menuType].title};
              outline: none;
            }

            > button:hover,
            > a:hover {
              background-color: transparent;
              cursor: default;
              outline: none;
              color: ${menuConfigVariants[menuType].title};
            }
          }
        `
      }

      ${
        asPassiveItem &&
        css`
          cursor: default;
          padding: 0 16px;

          :hover {
            background: transparent;
          }
        `
      }

      
      > a, > button {
       min-height: 40px;
       line-height: 40px;
      }

      a,
      ${StyledLink} a,
      button,
      ${StyledLink} button {
        width: 100vw;
        box-sizing: border-box;
      }

      a:focus,
      button:focus {
        z-index: 1;
        position: relative;
      }

      && {
        > a:focus,
        > a:hover,
        > button:focus,
        > button:hover {
          background-color: var(--colorsComponentsMenuAutumnStandard600);
          color: var(--colorsComponentsMenuYang100);

            ${
              !hasInput &&
              `
              [data-component="icon"] {
                color: var(--colorsComponentsMenuYang100);
              }
            `
            }
          }
        }
      }
    `}
  `}
`;

StyledMenuItemWrapper.defaultProps = { theme: baseTheme };

export default StyledMenuItemWrapper;
