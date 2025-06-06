import styled, { css } from "styled-components";
import { margin } from "styled-system";

import Icon from "../icon";
import StyledIcon from "../icon/icon.style";
import StyledButton from "../button/button.style";
import addFocusStyling from "../../style/utils/add-focus-styling";
import baseTheme from "../../style/themes/base";

const Menu = styled.ul<{
  isOpen: boolean;
  submenuLeft: boolean;
  iconLeft: boolean;
}>`
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};

  display: grid;

  ${({ submenuLeft, iconLeft }) => {
    const chevronColumn = "[chevron_column] auto";
    const iconColumn = "[icon_column] auto";
    const textColumn = "[text_column] auto";

    return css`
      grid-template-columns:
        ${submenuLeft ? chevronColumn : ""}
        ${iconLeft
          ? `${iconColumn} ${textColumn}`
          : `${textColumn} ${iconColumn}`}
        ${!submenuLeft ? chevronColumn : ""};
    `;
  }}

  align-items: center;
  min-width: fit-content;
  text-align: ${({ iconLeft }) => (iconLeft ? "left" : "right")};
  justify-content: ${({ iconLeft }) => (iconLeft ? "left" : "right")};

  margin: 0;
  list-style: none;
  padding: var(--spacing100) 0;
  box-shadow: var(--boxShadow100);
  position: absolute;
  border-radius: var(--borderRadius100);
  background-color: var(--colorsUtilityYang100);
  z-index: ${({ theme }) =>
    `${theme.zIndex?.popover}`}; // TODO (tokens): implement elevation tokens - FE-4437

  &[data-submenu-placement="top"] & {
    bottom: calc(-1 * var(--spacing100));
    top: auto;
  }

  &[data-submenu-placement="bottom"] & {
    top: calc(-1 * var(--spacing100));
    bottom: auto;
  }
`;

const StyledMenuItemInnerText = styled.div`
  grid-column: text_column;

  &:only-child {
    padding: 0;
  }

  padding: 0 var(--spacing100);
`;

const StyledMenuItem = styled.button<{ isDisabled: boolean }>`
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  grid-column: span 3;

  align-items: inherit;
  text-align: inherit;
  justify-content: inherit;

  text-decoration: none;
  background-color: var(--colorsActionMajorYang100);
  cursor: pointer;
  box-sizing: border-box;
  padding: 0 var(--spacing150);
  position: relative;
  line-height: 40px;
  white-space: nowrap;
  user-select: none;
  border: none;
  color: var(--colorsUtilityYin090);
  font-size: 14px;
  font-weight: 500;

  &:focus {
    ${addFocusStyling()}
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
  display: grid;
  grid-template-columns: subgrid;
  grid-template-rows: subgrid;
  grid-column: span 3;

  text-align: inherit;
  align-items: inherit;
  justify-content: inherit;

  position: relative;
`;

const MenuItemDivider = styled.li.attrs({
  "data-element": "action-popover-divider",
})`
  grid-column: span 3;

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
  &:focus {
    ${addFocusStyling()}
  }
  border-radius: var(--borderRadius050);
`;

const MenuItemIcon = styled(Icon)`
  justify-content: inherit;
  grid-column: icon_column;

  padding: var(--spacing100);
  color: var(--colorsUtilityYin065);
`;

StyledButtonIcon.defaultProps = {
  theme: baseTheme,
};

const SubMenuItemIcon = styled(ButtonIcon)`
  grid-column: chevron_column;

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
  StyledMenuItem,
  StyledMenuItemWrapper,
};
