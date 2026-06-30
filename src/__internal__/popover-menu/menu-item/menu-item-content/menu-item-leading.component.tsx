import React from "react";
import styled from "styled-components";
import Icon from "../../../../components/icon";

const StyledMenuItemLeading = styled.span`
  display: flex;
  grid-row: 1;

  [data-component="icon"] {
    width: 20px;
    height: 20px;
  }
`;

const StyledSelectedIconWrapper = styled.span<{ $hasIcon: boolean }>`
  ${({ $hasIcon }) => `
    visibility: ${$hasIcon ? "visible" : "hidden"};
  `}
`;

const MenuItemLeading = ({
  children,
  selectedIcon = false,
}: {
  children: React.ReactNode;
  selectedIcon?: boolean;
}) => {
  return (
    <StyledMenuItemLeading className="menu-item-leading" data-element="leading">
      <StyledSelectedIconWrapper
        data-role="selected-icon-wrapper"
        $hasIcon={selectedIcon}
      >
        <Icon type="tick_thick" data-role="selected-icon" />
      </StyledSelectedIconWrapper>
      {children}
    </StyledMenuItemLeading>
  );
};

MenuItemLeading.displayName = "PopoverMenuItemLeading";

export default MenuItemLeading;
