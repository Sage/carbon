import styled, { css } from "styled-components";
import { margin } from "styled-system";

import Icon from "../icon";
import StyledIcon from "../icon/icon.style";
import StyledButton from "../button/button.style";
import addFocusStyling from "../../style/utils/add-focus-styling";
import baseTheme from "../../style/themes/base";

const oldFocusStyling = `
  outline: solid 3px var(--colorsSemanticFocus500);
`;

const Menu = styled.ul`
  ${({ isOpen }: { isOpen?: boolean }) =>
    isOpen ? "display: block;" : "visibility: hidden;"}
  margin: 0;
  list-style: none;
  padding: var(--spacing100) 0;
  box-shadow: var(--boxShadow100);
  position: absolute;
  border-radius: var(--borderRadius100);
  background-color: var(--colorsUtilityYang100);
  z-index: ${({ theme }) =>
    `${theme.zIndex?.popover}`}; // TODO (tokens): implement elevation tokens - FE-4437
`;

function getPaddingValues(
  childHasSubmenu?: boolean,
  childHasIcon?: boolean,
  hasIcon?: boolean,
  hasSubmenu?: boolean,
) {
  // computing padding for "inner text" element of a menu item.
  // childHasSubmenu - ANY sibling (including itself?) has the 'submenu' prop
  // childHasIcon - ANY sibling (including itself?) has the 'icon' prop
  // hasIcon - has the 'icon' prop
  // hasSubmenu - has the 'submenu' prop
  if (!childHasIcon && childHasSubmenu && !hasIcon && !hasSubmenu) {
    return "var(--spacing400)";
  }
  if (childHasIcon && childHasSubmenu && !hasIcon && hasSubmenu) {
    return "var(--spacing600)";
  }
  if (childHasIcon && childHasSubmenu && !hasIcon && !hasSubmenu) {
    return "var(--spacing900)";
  }
  return "var(--spacing100)";
}

function getIconPaddingValues(
  index: 1 | 2,
  horizontalAlignment?: "left" | "right",
  submenuPosition?: "left" | "right",
  siblingsHaveIconAndSubmenu?: boolean,
  isASubmenu?: boolean,
) {
  const sameAlignment =
    (horizontalAlignment === "left" && submenuPosition === "left") ||
    (horizontalAlignment === "right" && submenuPosition === "right");

  if (siblingsHaveIconAndSubmenu && sameAlignment) {
    if (horizontalAlignment === "left") {
      return index === 1 ? "var(--spacing100)" : "var(--spacing400)";
    }
    return index === 1 ? "var(--spacing400)" : "var(--spacing100)";
  }

  if (isASubmenu) {
    if (horizontalAlignment === "left") {
      return index === 1 ? "var(--spacing100)" : "var(--spacing000)";
    }
    return index === 1 ? "var(--spacing000)" : "var(--spacing100)";
  }

  return "var(--spacing100)";
}

type StyledMenuItemProps = {
  isDisabled: boolean;
  horizontalAlignment?: "left" | "right";
  submenuPosition?: "left" | "right";
  childHasSubmenu?: boolean;
  childHasIcon?: boolean;
  hasSubmenu?: boolean;
  hasIcon?: boolean;
  isASubmenu?: boolean;
};

const StyledMenuItemInnerText = styled.div<
  Omit<StyledMenuItemProps, "isDisabled">
>`
  ${({
    childHasSubmenu,
    childHasIcon,
    hasIcon,
    hasSubmenu,
    submenuPosition,
    horizontalAlignment,
    isASubmenu,
  }) => css`
    padding-left: ${isASubmenu ? `var(--spacing000)` : `var(--spacing100)`};
    padding-right: ${isASubmenu ? `var(--spacing000)` : `var(--spacing100)`};

    ${horizontalAlignment === "left" &&
    submenuPosition === "left" &&
    !isASubmenu &&
    css`
      padding-left: ${getPaddingValues(
        childHasSubmenu,
        childHasIcon,
        hasIcon,
        hasSubmenu,
      )};
    `}

    ${horizontalAlignment === "right" &&
    submenuPosition === "right" &&
    !isASubmenu &&
    css`
      padding-right: ${getPaddingValues(
        childHasSubmenu,
        childHasIcon,
        hasIcon,
        hasSubmenu,
      )};
    `}
  `}
`;

const StyledMenuItemOuterContainer = styled.div`
  display: inherit;
`;
const StyledMenuItem = styled.button<Omit<StyledMenuItemProps, "variant">>`
  ${({
    horizontalAlignment,
    submenuPosition,
    childHasSubmenu,
    hasSubmenu,
  }) => css`
    justify-content: ${horizontalAlignment === "left"
      ? "flex-start"
      : "flex-end"};

    ${horizontalAlignment === "left" &&
    submenuPosition === "right" &&
    css`
      justify-content: space-between;
    `}

    ${horizontalAlignment === "right" &&
    submenuPosition === "left" &&
    css`
      ${childHasSubmenu &&
      hasSubmenu &&
      css`
        justify-content: space-between;
      `}
    `}
  `}

  text-decoration: none;
  background-color: var(--colorsActionMajorYang100);
  cursor: pointer;
  box-sizing: border-box;
  padding: 0 var(--spacing150);
  position: relative;
  line-height: 40px;
  white-space: nowrap;
  user-select: none;
  display: flex;
  align-items: center;
  border: none;
  width: 100%;
  color: var(--colorsUtilityYin090);
  font-size: 14px;
  font-weight: 500;

  &:focus {
    ${({ theme }) =>
      `${
        !theme.focusRedesignOptOut
          ? addFocusStyling()
          : /* istanbul ignore next */ oldFocusStyling
      }`}
    z-index: 1;
    border-radius: var(--borderRadius000);
  }

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: var(--colorsUtilityYin030);
      cursor: not-allowed;

      && ${StyledIcon} {
        cursor: not-allowed;
        color: var(--colorsUtilityYin030);
      }

      :focus {
        border: none;
        outline: none;
        -webkit-appearance: none;
        -webkit-box-shadow: none;
        box-shadow: none;
      }
    `}

  ${({ isDisabled }) =>
    !isDisabled &&
    css`
      &:focus,
      &:hover {
        background-color: var(--colorsUtilityMajor100);
      }
      && ${StyledIcon} {
        cursor: pointer;
      }
    `}
`;

StyledMenuItem.defaultProps = {
  theme: baseTheme,
};

const StyledMenuItemWrapper = styled.li`
  position: relative;
`;

const MenuItemDivider = styled.li.attrs({
  "data-element": "action-popover-divider",
})`
  background-color: var(--colorsUtilityMajor050);
  height: var(--borderWidth100);
  margin: var(--spacing100) var(--spacing150);
`;

const MenuButton = styled.div`
  position: relative;
  && ${StyledIcon} {
    cursor: pointer;
  }
  width: fit-content;
  margin: auto;
  ${margin}
`;

const ButtonIcon = styled(Icon)`
  color: var(--colorsActionMinor500);

  :hover {
    color: var(--colorsActionMinor600);
  }
`;

const StyledButtonIcon = styled.div`
  ${({ theme }) =>
    `
    &:focus {
      ${
        !theme.focusRedesignOptOut
          ? addFocusStyling()
          : /* istanbul ignore next */ oldFocusStyling
      }
    }    
  `}
  border-radius: var(--borderRadius050);
`;

const MenuItemIcon = styled(Icon)<Omit<StyledMenuItemProps, "isDisabled">>`
  ${({
    horizontalAlignment,
    submenuPosition,
    childHasIcon,
    childHasSubmenu,
    hasIcon,
    hasSubmenu,
    isASubmenu,
  }) => css`
    justify-content: ${horizontalAlignment};
    padding: var(--spacing100)
      ${getIconPaddingValues(
        1,
        horizontalAlignment,
        submenuPosition,
        childHasIcon && childHasSubmenu && hasIcon && !hasSubmenu,
        isASubmenu,
      )}
      var(--spacing100)
      ${getIconPaddingValues(
        2,
        horizontalAlignment,
        submenuPosition,
        childHasIcon && childHasSubmenu && hasIcon && !hasSubmenu,
        isASubmenu,
      )};
    color: var(--colorsUtilityYin065);
  `}
`;

StyledButtonIcon.defaultProps = {
  theme: baseTheme,
};

const SubMenuItemIcon = styled(ButtonIcon)`
  ${({ type }) => css`
    ${type === "chevron_left_thick" &&
    css`
      left: -5px;
    `}

    ${type === "chevron_right_thick" &&
    css`
      right: -5px;
    `}
  `}
`;

const MenuButtonOverrideWrapper = styled.div`
  ${StyledButton} {
    padding: 0px var(--sizing100);
    width: 100%;

    &:hover,
    &:focus {
      background-color: var(--colorsActionMajorTransparent);
      color: var(--colorsActionMajor600);

      span[color] {
        color: var(--colorsActionMajor600);
      }
    }
  }
`;

export {
  Menu,
  MenuButton,
  ButtonIcon,
  StyledButtonIcon,
  MenuItemIcon,
  MenuItemDivider,
  SubMenuItemIcon,
  MenuButtonOverrideWrapper,
  StyledMenuItemInnerText,
  StyledMenuItemOuterContainer,
  StyledMenuItem,
  StyledMenuItemWrapper,
};
