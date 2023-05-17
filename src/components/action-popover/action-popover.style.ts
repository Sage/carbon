import styled, { css } from "styled-components";
import { margin } from "styled-system";

import Icon from "../icon";
import StyledIcon from "../icon/icon.style";
import StyledButton from "../button/button.style";
import { isSafari } from "../../__internal__/utils/helpers/browser-type-check";
import addFocusStyling from "../../style/utils/add-focus-styling";

const Menu = styled.div`
  ${({ isOpen }: { isOpen?: boolean }) =>
    isOpen ? "display: block;" : "visibility: hidden;"}
  margin: 0;
  padding: var(--spacing100) 0;
  box-shadow: var(--boxShadow100);
  position: absolute;
  border-radius: var(--borderRadius100);
  background-color: var(--colorsUtilityYang100);
  z-index: ${({ theme }) =>
    `${theme.zIndex.popover}`}; // TODO (tokens): implement elevation tokens - FE-4437
`;

type StyledMenuItemProps = {
  isDisabled: boolean;
  horizontalAlignment: "left" | "right";
};

const StyledMenuItem = styled.button<StyledMenuItemProps>`
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
  font-weight: 700;
  justify-content: ${({ horizontalAlignment }) =>
    horizontalAlignment === "left" ? "flex-start" : "flex-end"};

  /* &:focus {
    outline: var(--borderWidth300) solid var(--colorsSemanticFocus500);
    z-index: 1;
    border-radius: var(--borderRadius000);
  } */

  ${addFocusStyling()}

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: var(--colorsUtilityYin030);
      cursor: not-allowed;

      && ${StyledIcon} {
        cursor: not-allowed;
        color: var(--colorsUtilityYin030);
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
  ${addFocusStyling}
  &:focus {
    border-radius: var(--borderRadius050);
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
  MenuButton,
  ButtonIcon,
  StyledButtonIcon,
  MenuItemIcon,
  MenuItemDivider,
  SubMenuItemIcon,
  MenuButtonOverrideWrapper,
  StyledMenuItem,
};
