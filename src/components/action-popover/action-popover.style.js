import React from "react";
import styled, { ThemeProvider, css, withTheme } from "styled-components";
import { margin } from "styled-system";

import Icon from "../icon";
import StyledIcon from "../icon/icon.style";
import StyledButton from "../button/button.style";
import { isSafari } from "../../__internal__/utils/helpers/browser-type-check";

const Menu = styled.div`
  ${({ isOpen }) => (isOpen ? "display: block;" : "visibility: hidden;")}
  margin: 0;
  padding: ${({ theme }) => `${theme.spacing}px 0`};
  box-shadow: ${({ theme }) => theme.shadows.depth1};
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: ${({ theme }) => `${theme.zIndex.popover}`};
`;

const StyledMenuItem = styled.div`
  text-decoration: none;
`;

const MenuItemFactory = (button) => styled(button)`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  box-sizing: border-box;
  ${({ theme }) => `padding: 0 ${theme.spacing * 3}px;`}
  position: relative;
  line-height: 40px;
  white-space: nowrap;
  user-select: none;
  display: flex;
  align-items: center;
  border: none;
  width: 100%;
  color: ${({ disabled, theme }) =>
    disabled ? theme.menu.itemColorDisabled : theme.menu.itemColor};
  font-size: 14px;
  font-weight: 700;
  justify-content: ${({ horizontalAlignment }) =>
    horizontalAlignment === "left" ? "flex-start" : "flex-end"};
  &:focus,
  &:hover {
    ${({ disabled }) =>
      !disabled &&
      css`
        background-color: ${({ theme }) => theme.menu.focus};
      `}
  }
  &:focus {
    outline: none;
    box-shadow: inset 0px 0px 0px 2px ${({ theme }) => theme.colors.focus};
  }
  ${({ disabled }) =>
    !disabled &&
    css`
      && ${StyledIcon} {
        cursor: pointer;
      }
    `}
  ${({ disabled }) =>
    disabled &&
    css`
      && ${StyledIcon} {
        cursor: not-allowed;
        color: inherit;
      }
    `}
`;

const MenuItemDivider = styled.div.attrs({
  "data-element": "action-popover-divider",
})`
  background-color: ${({ theme }) => theme.menu.divider};
  height: 1px;
  margin: 9px;
`;

const MenuButton = styled.div`
  position: relative;
  && ${StyledIcon} {
    cursor: pointer;
  }
  width: fit-content;
  margin: auto;
  ${margin}
  ${({ isOpen, theme }) => isOpen && `background-color: ${theme.colors.white}`}
`;

/**
 * Creates a factory that returns a styled component with a custom
 * theme provider wrapped around it
 * @param {*} themeFn
 */
const iconThemeProviderFactory = (Component, themeFn) =>
  withTheme(({ theme, ...props }) => {
    const color = themeFn(theme.palette);
    const customTheme = {
      ...theme,
      icon: {
        default: color,
        defaultHover: color,
      },
    };
    return (
      <ThemeProvider theme={customTheme}>
        <Component {...props} />
      </ThemeProvider>
    );
  });

const ButtonIcon = iconThemeProviderFactory(Icon, (palette) => palette.slate);

const StyledButtonIcon = styled.div`
  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.white};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
  }
`;

const MenuItemIcon = styled(iconThemeProviderFactory(Icon, () => "inherit"))`
  ${({ theme, horizontalAlignment }) => css`
    ${horizontalAlignment === "right"
      ? "padding-left"
      : "padding-right"}: ${theme.spacing}px;
  `}
`;

const SubMenuItemIcon = styled(ButtonIcon)`
  ${({ theme, type }) => css`
    position: absolute;
    &,
    :hover {
      color: ${theme.colors.border};
    }
    ${type === "chevron_left" &&
    css`
      left: 0px;
    `}

    ${type === "chevron_right" &&
    css`
      right: 0px;
      ${isSafari(navigator) &&
      css`
        top: ${theme.spacing}px;
      `}
    `}
  `}
`;

const MenuButtonOverrideWrapper = styled.div`
  ${({ theme }) => css`
    ${StyledButton} {
      padding: 0px ${theme.spacing}px;
      width: 100%;
      &:focus {
        outline-width: 2px;
      }

      &:hover,
      &:focus {
        background-color: ${theme.colors.white};
      }
    }
  `}
`;

export {
  Menu,
  MenuItemFactory,
  MenuButton,
  ButtonIcon,
  StyledButtonIcon,
  MenuItemIcon,
  MenuItemDivider,
  SubMenuItemIcon,
  MenuButtonOverrideWrapper,
  StyledMenuItem,
};
