import styled, { css } from "styled-components";
import { baseTheme } from "../../../../style/themes";
import { StyledLink } from "../../../link/link.style";
import { StyledMenuItem } from "../../menu.style";
import StyledMenuItemWrapper from "../../menu-item/menu-item.style";
import StyledIcon from "../../../icon/icon.style";
import StyledSearch from "../../../search/search.style";
import menuConfigVariants from "../../menu.config";
import { SubmenuProps } from "./submenu.component";
import { MenuType } from "../../menu.context";

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
    Pick<SubmenuProps, "variant"> {
  submenuDirection?: string;
}

const StyledSubmenuWrapper = styled.div<StyledSubmenuWrapperProps>`
  position: relative;
  width: fit-content;
  max-width: inherit;

  ${({ isSubmenuOpen, theme }) =>
    isSubmenuOpen &&
    css`
      z-index: ${theme.zIndex.popover};
    `}

  ${({ inFullscreenView, menuType, asPassiveItem }) =>
    inFullscreenView &&
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
`;

const StyledSubmenu = styled.ul<StyledSubmenuProps>`
  ${({ menuType, submenuDirection, variant, inFullscreenView }) => css`
    ${!inFullscreenView &&
    menuType &&
    css`
      box-shadow: var(--boxShadow100);
      position: absolute;
      background-color: ${variant === "default"
        ? menuConfigVariants[menuType].submenuItemBackground
        : menuConfigVariants[menuType].background};
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
        width: 100%;
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

    ${StyledMenuItemWrapper} {
      display: flex;
      align-items: center;
      height: 40px;
      line-height: 40px;
      white-space: nowrap;
      cursor: pointer;

      ${!inFullscreenView &&
      menuType &&
      css`
        background-color: ${menuConfigVariants[menuType].submenuItemBackground};

        a:focus,
        button:focus {
          background-color: ${menuConfigVariants[menuType]
            .submenuItemBackground};
        }

        a:hover,
        button:hover {
          background-color: transparent;
          color: var(--colorsComponentsMenuYang100);

          [data-component="icon"] {
            color: var(--colorsComponentsMenuYang100);
          }
        }
      `}

      a {
        text-decoration: none;
      }

      ${StyledIcon} {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }

      ${StyledSearch} span > [data-component="icon"] {
        color: var(--colorsUtilityMajor200);

        &:hover {
          color: var(--colorsUtilityMajor150);
        }
      }

      ${StyledSearch} {
        :hover {
          border-bottom-color: var(--colorsUtilityMajor150);
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
