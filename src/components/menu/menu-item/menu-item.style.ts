import styled, { css } from "styled-components";

// import { padding, PaddingProps } from "styled-system";
import { PaddingProps } from "../../dips-box/utils/spacing-types";
import { spacingCss } from "../../dips-box/utils/spacing";

import menuConfigVariants from "../menu.config";
import Link from "../../link";
import StyledButton from "../../button/button.style";
import StyledIconButton from "../../icon-button/icon-button.style";
import StyledIcon from "../../icon/icon.style";
import { StyledContent, StyledLink } from "../../link/link.style";
import applyBaseTheme from "../../../style/themes/apply-base-theme";
import addFocusStyling from "../../../style/utils/add-focus-styling";

import { MenuWithChildren } from "./menu-item.component";

import type { MenuType } from "../menu.types";

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
  icon?: string;
  ariaLabel?: string;
  asDiv?: boolean;
  hasFocusableChild?: boolean;
  hasInput?: boolean;
  menuItemVariant?: Pick<MenuWithChildren, "variant">["variant"];
  inSubmenu?: boolean;
}

const BASE_SPACING = 16;

// helper: choose the "user-intended horizontal padding"
const getHorizontalPaddingInput = (props: Partial<PaddingProps>) => {
  return (
    props.paddingRight ??
    props.pr ??
    props.px ??
    props.padding ??
    props.p ??
    undefined
  );
};

// given "var(--spacing200)" -> 200  (string "200")
// returns undefined if it can't parse that pattern
const extractSpacingTokenNumber = (val: string) => {
  const match = /var\(--spacing(\d+)00\)/.exec(val);
  return match ? Number(match[1]) : undefined;
};

const parsePadding = (props: Partial<PaddingProps>) => {
  const raw = getHorizontalPaddingInput(props);

  // We'll use these to branch:
  const rawStr = String(raw);
  const numericFromPx = rawStr.match(/\d+/)?.[0]; // "5px" -> "5"
  const isPlainNumber = typeof raw === "number" || /^\d+$/.test(rawStr);

  // Special case: 0 or spacing000
  if (raw === "var(--spacing000)" || rawStr === "0" || raw === 0) {
    return {
      padding: "var(--spacing200)",
      iconSpacing: "2px",
    };
  }

  // Token cases like var(--spacing200), var(--spacing300), etc.
  if (rawStr.startsWith("var(--spacing")) {
    switch (rawStr) {
      case "var(--spacing100)":
        return {
          padding: "var(--spacing300)",
          iconSpacing: "var(--spacing100)",
        };
      case "var(--spacing200)":
        return {
          padding: "var(--spacing400)",
          iconSpacing: "var(--spacing200)",
        };
      case "var(--spacing300)":
        return {
          padding: "var(--spacing500)",
          iconSpacing: "var(--spacing300)",
        };
      case "var(--spacing400)":
        return {
          padding: "var(--spacing600)",
          iconSpacing: "var(--spacing400)",
        };
      case "var(--spacing500)":
        return {
          padding: "var(--spacing700)",
          iconSpacing: "var(--spacing500)",
        };
      case "var(--spacing600)":
        return {
          padding: "var(--spacing800)",
          iconSpacing: "var(--spacing600)",
        };
      case "var(--spacing700)":
        return {
          padding: "var(--spacing900)",
          iconSpacing: "var(--spacing700)",
        };
      case "var(--spacing800)":
        return {
          padding: "var(--spacing1000)",
          iconSpacing: "var(--spacing800)",
        };
      default: {
        // fallback for any var(--spacingX00) we didn't explicitly list
        // rule: iconSpacing = original token
        //       padding = "two steps bigger" token
        const n = extractSpacingTokenNumber(rawStr);
        if (typeof n === "number") {
          const bumped = n + 2;
          return {
            padding: `var(--spacing${bumped}00)`,
            iconSpacing: rawStr,
          };
        }
        // if it's some other custom var(), we can't bump safely then just use it as-is
        return {
          padding: rawStr,
          iconSpacing: rawStr,
        };
      }
    }
  }

  // number input like p={3} or p="3":
  // Tests expect:
  //   1  -> iconSpacing: var(--spacing100)
  //   3  -> iconSpacing: var(--spacing300)
  //   6  -> iconSpacing: var(--spacing600)
  // So, basically n -> var(--spacing{n}00)
  if (isPlainNumber) {
    const n = Number(rawStr);

    if (n === 0) {
      // safety double-check, though we already handled n === 0 above
      return {
        padding: "var(--spacing200)",
        iconSpacing: "2px",
      };
    }

    const iconToken = `var(--spacing${n}00)`;

    // bump padding two steps up (n + 2)
    const bumpedToken = `var(--spacing${n + 2}00)`;

    return {
      padding: bumpedToken,
      iconSpacing: iconToken,
    };
  }

  // Absolute px like "5px":
  // Tests expect right: "5px"
  // Original code: padding gets BASE_SPACING + n
  if (numericFromPx && rawStr.endsWith("px")) {
    const n = Number(numericFromPx);
    return {
      padding: `${BASE_SPACING + n}px`,
      iconSpacing: `${n}px`,
    };
  }

  // Fallback (no usable info) then defaults to this
  return {
    padding: "var(--spacing400)",
    iconSpacing: "var(--spacing200)",
  };
};

const StyledMenuItemWrapper = styled.a.attrs(applyBaseTheme).attrs({
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
    hasFocusableChild,
    hasInput,
    inSubmenu,
  }) => css`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    min-height: 40px;
    position: relative;
    box-shadow: none;

    a,
    button {
      min-height: 40px;
      height: 100%;
      box-sizing: border-box;
    }

    a:focus,
    button:focus {
      ${addFocusStyling(true)}
    }

    :has([data-element="input"]) ${StyledContent} {
      width: 100%;
    }

    ${!overrideColor &&
    css`
      background-color: ${menuConfigVariants[menuType].background};

      &:has([data-popover-container-button="true"]) {
        background-color: var(--colorsActionMajor500);
      }
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
      width: inherit;
      height: inherit;

      > a,
      > button {
        display: flex;
        align-items: center;
        ${!inSubmenu ? "justify-content: center;" : ""}
        width: inherit;
        max-width: inherit;
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

      &:has([data-popover-container-button="true"]) {
        && {
          a:focus,
          button:focus {
            background-color: var(--colorsActionMajor500);
          }
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
          ${StyledButton} {
            border-radius: 0;
            background-color: transparent;
          }

          ${!asDiv &&
          !asPassiveItem &&
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

    ${hasFocusableChild &&
    css`
      &&
        ${!inFullscreenView &&
        css`
          && > a:not(:has(button)) {
            padding: 11px 16px;
          }

          > a:has(${StyledButton}:not(.search-button)) {
            height: 100%;

            ${StyledContent} {
              height: inherit;

              div {
                height: inherit;
              }
            }

            ${StyledButton} {
              min-height: 40px;
              padding: 10px 0px;
              box-sizing: border-box;
              height: 100%;
            }
          }
        `}
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
    `}

    ${!hasFocusableChild &&
    !inFullscreenView &&
    css`
      ${hasSubmenu || maxWidth
        ? css`
            > a,
            > button {
              padding: 11px 16px ${hasSubmenu && maxWidth ? "12px" : "10px"};
            }
          `
        : css`
            > a,
            > button {
              padding: 11px 16px;
            }
          `}
    `}
    button,
    ${StyledLink} button,
    a,
    ${StyledLink} a {
      margin: 0px;
      text-align: left;

      ${inFullscreenView &&
      css`
        height: auto;
        white-space: normal;

        ${StyledIcon} {
          top: -2px;
        }
      `}
    }

    &&& {
      a,
      button,
      [data-component="icon"],
      ${StyledLink} a,
      ${StyledLink} button,
      ${StyledLink} [data-component="icon"] {
        font-weight: 500;
        text-decoration: none;
        ${!hasInput && `color: ${menuConfigVariants[menuType].color};`}
      }

      ${!inFullscreenView &&
      css`
        a > ${StyledIcon}, button > ${StyledIcon} {
          display: inline-block;
          height: 18px;
          top: -2px;
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
        &&& {
          > a,
          > button:not(${StyledIconButton}) {
            padding-right: ${(props) =>
              parsePadding(props as Partial<PaddingProps>).padding};
          }
        }

        a::before,
        button::before {
          display: block;
          margin-top: -1px;
          pointer-events: none;
          position: absolute;
          right: ${(props) =>
            parsePadding(props as Partial<PaddingProps>).iconSpacing};
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

      > a, > button {
        min-height: 40px;
        line-height: 40px;
        padding: 0px 16px;
        width: 100vw;
        box-sizing: border-box;
      }

      a:focus,
      button:focus {
        z-index: 1;
        position: relative;
      }

      ${
        !asPassiveItem &&
        css`
          && {
            > a:focus,
            > a:hover,
            > button:focus,
            > button:hover {
              background-color: var(--colorsComponentsMenuAutumnStandard600);
              color: var(--colorsComponentsMenuYang100);

              ${!hasInput &&
              css`
                [data-component="icon"] {
                  color: var(--colorsComponentsMenuYang100);
                }
              `}
            }
          }
        `
      }
      }
    `}
  `}

  &&& {
    > a,
    > button {
      ${(props) => spacingCss(props)}
    }
  }
`;

export default StyledMenuItemWrapper;
