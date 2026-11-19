import styled, { css } from "styled-components";
import { MenuOptionItemBase } from "./menu-option-item.component";

/** A listbox option with secondary-action colours and no button-menu behaviour. */
const MenuActionItem = styled(MenuOptionItemBase)`
  ${({ disabled }) =>
    !disabled &&
    css`
      background-color: var(--button-typical-secondary-bg-default);
      color: var(--button-typical-secondary-label-default);

      * {
        color: var(--button-typical-secondary-label-default);
      }

      &:hover,
      &:active {
        background-color: var(--button-typical-secondary-bg-hover);
        color: var(--button-typical-secondary-label-hover);

        * {
          color: var(--button-typical-secondary-label-hover);
        }
      }
    `}
`;

MenuActionItem.displayName = "PopoverMenuActionItem";

export default MenuActionItem;
