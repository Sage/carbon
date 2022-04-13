import styled, { css } from "styled-components";
import { margin } from "styled-system";

import Icon from "../icon";
import StyledIcon from "../icon/icon.style";
import StyledButton from "../button/button.style";
import { isSafari } from "../../__internal__/utils/helpers/browser-type-check";

const Menu = styled.div`
  ${({ isOpen }) => (isOpen ? "display: block;" : "visibility: hidden;")}
  margin: 0;
  padding: var(--spacing100) 0;
  box-shadow: var(--boxShadow100);
  position: absolute;
  background-color: var(--colorsUtilityYang100);
  z-index: ${({ theme }) =>
    `${theme.zIndex.popover}`}; // TODO (tokens): implement elevation tokens - FE-4437
`;

const StyledMenuItem = styled.button`
  text-decoration: none;
  background-color: var(--colorsActionMajorYang100);
`;

const MenuItemFactory = (button) => styled(button)`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  box-sizing: border-box;
  padding: 0 var(--spacing150);
  position: relative;
  white-space: nowrap;
  user-select: none;
  display: flex;
  align-items: center;
  border: none;
  height: var(--sizing500);
  width: 100%;
  color: ${({ disabled }) =>
    disabled ? "var(--colorsUtilityYin030)" : "var(--colorsUtilityYin090)"};
  font: var(--typographyActionPopoverMenuItemM);
  justify-content: ${({ horizontalAlignment }) =>
    horizontalAlignment === "left" ? "flex-start" : "flex-end"};
  &:focus,
  &:hover {
    ${({ disabled }) =>
      !disabled &&
      css`
        background-color: var(--colorsUtilityMajor025);
      `}
  }
  &:focus {
    outline: var(--borderWidth300) solid var(--colorsSemanticFocus500);
    z-index: 1;
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
        color: var(--colorsUtilityYin030);
      }
    `}
`;

const MenuItemDivider = styled.div.attrs({
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
  &:focus {
    outline: var(--borderWidth300) solid var(--colorsSemanticFocus500);
  }
`;

const MenuItemIcon = styled(Icon)`
  padding: var(--spacing100);
  color: var(--colorsUtilityYin065);
`;

const SubMenuItemIcon = styled(ButtonIcon)`
  ${({ type }) => css`
    position: absolute;
    ${type === "chevron_left" &&
    css`
      left: -2px;
    `}

    ${type === "chevron_right" &&
    css`
      right: -5px;
      ${isSafari(navigator) &&
      css`
        top: var(--sizing100);
      `}
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
