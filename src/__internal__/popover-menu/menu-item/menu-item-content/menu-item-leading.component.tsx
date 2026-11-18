import React, { useContext } from "react";
import styled from "styled-components";
import { PopoverMenuContext } from "../../contexts";
import Icon from "../../../../components/icon";

const StyledMenuItemLeading = styled.span`
  display: flex;
  grid-row: 1;
`;

const StyledSelectedIconWrapper = styled.span<{ $hasIcon: boolean }>`
  ${({ $hasIcon }) => `
    padding: 0 var(--global-space-comp-2-xs);
    visibility: ${$hasIcon ? "visible" : "hidden"};
  `}
`;

const MenuItemLeading = ({
  children,
  selectedIcon = false,
}: {
  children?: React.ReactNode;
  selectedIcon?: boolean;
}) => {
  const { isButtonMenu, size } = useContext(PopoverMenuContext);
  return (
    <StyledMenuItemLeading className="menu-item-leading" data-element="leading">
      {!isButtonMenu && (
        <StyledSelectedIconWrapper
          data-role="selected-icon-wrapper"
          $hasIcon={selectedIcon}
        >
{/* Selection is exposed via aria-selected on the option, so the tick is decorative. */}
        <Icon
            type="tick_thick"
            data-role="selected-icon"
            size={size === "small" ? "extra-small" : "small"}
            aria-hidden
          />
        </StyledSelectedIconWrapper>
      )}
      {children}
    </StyledMenuItemLeading>
  );
};

MenuItemLeading.displayName = "PopoverMenuItemLeading";

export default MenuItemLeading;
