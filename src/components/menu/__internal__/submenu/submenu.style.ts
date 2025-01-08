import styled, { css } from "styled-components";
import StyledScrollableBlock from "../../../menu/scrollable-block/scrollable-block.style";
import { baseTheme } from "../../../../style/themes";
import { StyledLink } from "../../../link/link.style";
import { StyledMenuItem } from "../../menu.style";
import StyledBox from "../../../box/box.style";
import StyledMenuItemWrapper from "../../menu-item/menu-item.style";
import StyledIcon from "../../../icon/icon.style";
import menuConfigVariants from "../../menu.config";
import { SubmenuProps } from "./submenu.component";
import { MenuType } from "../menu.context";
import { StyledSegmentChildren } from "../../menu-segment-title/menu-segment-title.style";

interface SharedStyleProps {
  inFullscreenView?: boolean;
  menuType?: MenuType;
}

interface StyledSubmenuWrapperProps extends SharedStyleProps {
  isSubmenuOpen?: boolean;
  asPassiveItem?: boolean;
}

interface StyledSubmenuProps
  extends SharedStyleProps,
    Pick<SubmenuProps, "variant" | "submenuMaxWidth"> {
  submenuDirection?: string;
  maxHeight?: string;
  applyFocusRadiusStyling: boolean;
  applyFocusRadiusStylingToLastItem: boolean;
}

const StyledSubmenuWrapper = styled.div<StyledSubmenuWrapperProps>`
  position: relative;
  width: fit-content;
  max-width: inherit;
  height: inherit;

  ${({ isSubmenuOpen, theme }) =>
    isSubmenuOpen &&
    css`
      z-index: ${theme.zIndex.popover};
    `}

  ${({ inFullscreenView, menuType, asPassiveItem }) => css`
    ${inFullscreenView &&
    css`
      width: 100%;

      ${asPassiveItem &&
      menuType &&
      css`
        ${StyledMenuItemWrapper} {
          outline: none;
          color: ${menuConfigVariants[menuType].title};
        }
      `}
    `}
    ${!inFullscreenView &&
    css`
      display: flex;
    `}
  `}
`;

const StyledSubmenu = styled.ul<StyledSubmenuProps>`
  ${({
    menuType,
    submenuDirection,
    variant,
    inFullscreenView,
    maxHeight,
    applyFocusRadiusStyling,
    applyFocusRadiusStylingToLastItem,
    submenuMaxWidth,
  }) => css`
    ${!inFullscreenView &&
    menuType &&
    css`
      box-shadow: var(--boxShadow100);
      position: absolute;
      top: 100%;
      background-color: ${variant === "default"
        ? menuConfigVariants[menuType].submenuItemBackground
        : menuConfigVariants[menuType].background};

      min-width: 100%;

      ${submenuMaxWidth &&
      css`
        width: max-content;
        max-width: ${submenuMaxWidth};

        li {
          max-width: ${submenuMaxWidth};
        }

        &&& {
          a,
          button,
          ${StyledLink} a,
          ${StyledLink} button {
            white-space: normal;
            height: auto;
          }
        }
      `}

      a,
      button,
      ${StyledLink} a,
      ${StyledLink} button {
        width: 100%;
      }
    `}

    ${inFullscreenView &&
    css`
      min-width: 100%;

      ${StyledMenuItem} {
        width: 100%;
      }
    `}

    ${!inFullscreenView &&
    css`
      border-bottom-right-radius: var(--borderRadius100);
      border-bottom-left-radius: var(--borderRadius100);
      overflow-y: auto;
      ${maxHeight && `max-height: ${maxHeight};`}

      ${StyledMenuItem}:last-child a,
      ${StyledMenuItem}:last-child button,
      ${StyledMenuItem}:last-child > span,
      ${StyledMenuItem}:last-child > div {
        border-bottom-left-radius: var(--borderRadius100);
        border-bottom-right-radius: var(--borderRadius100);
      }

      & ${StyledSegmentChildren} > ${StyledMenuItem}:last-of-type a,
      ${StyledSegmentChildren} > ${StyledMenuItem}:last-of-type button,
      ${StyledSegmentChildren} > ${StyledMenuItem}:last-of-type > span,
      ${StyledSegmentChildren} > ${StyledMenuItem}:last-of-type > div {
        border-bottom-right-radius: var(--borderRadius000);
        border-bottom-left-radius: var(--borderRadius000);

        :focus {
          border-bottom-right-radius: ${applyFocusRadiusStylingToLastItem
            ? "var(--borderRadius100)"
            : "var(--borderRadius000)"};
          border-bottom-left-radius: ${applyFocusRadiusStylingToLastItem
            ? "var(--borderRadius100)"
            : "var(--borderRadius000)"};
        }
      }

      &&&& ${StyledScrollableBlock} {
        ${StyledBox} {
          border-bottom-right-radius: var(--borderRadius000);
          border-bottom-left-radius: ${applyFocusRadiusStyling
            ? "var(--borderRadius100)"
            : "var(--borderRadius000)"};

          ${StyledMenuItem}:last-child ${StyledLink}, ${StyledMenuItem}:last-child a,
          ${StyledMenuItem}:last-child button {
            border-bottom-right-radius: var(--borderRadius000);
            border-bottom-left-radius: ${applyFocusRadiusStylingToLastItem
              ? "var(--borderRadius100)"
              : "var(--borderRadius000)"};
          }
        }
      }
    `}

    display: block;
    list-style: none;
    margin: 0;
    padding: 0;

    ${StyledMenuItemWrapper}:after, ${StyledMenuItemWrapper}:hover:after {
      display: none;
    }

    ${StyledMenuItemWrapper} {
      display: flex;
      align-items: center;
      white-space: nowrap;
      cursor: pointer;

      ${inFullscreenView &&
      css`
        white-space: normal;
        height: auto;
      `}

      ${submenuMaxWidth &&
      css`
        height: auto;
        min-height: 40px;
      `}

      ${!inFullscreenView &&
      menuType &&
      css`
        background-color: ${menuConfigVariants[menuType].submenuItemBackground};

        > a:focus,
        > button:focus {
          background-color: ${menuConfigVariants[menuType]
            .submenuItemBackground};
        }

        > a:hover,
        > button:hover {
          background-color: transparent;
          color: var(--colorsComponentsMenuYang100);

          > [data-component="icon"] {
            color: var(--colorsComponentsMenuYang100);
          }
        }

        > a,
        > button {
          padding: 11px 16px 12px;
        }
      `}

      a {
        text-decoration: none;
      }

      > ${StyledIcon} {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
    }

    [data-component="icon"] {
      line-height: 20px;

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

    ${submenuDirection === "left" &&
    css`
      right: 0;
    `}
  `}
`;

StyledSubmenuWrapper.defaultProps = {
  theme: baseTheme,
};

export { StyledSubmenu, StyledSubmenuWrapper };
