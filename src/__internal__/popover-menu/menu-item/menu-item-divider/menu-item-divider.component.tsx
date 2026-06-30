import React from "react";
import styled from "styled-components";
import Divider from "../../../../components/divider";

const StyledMenuItemDivider = styled.li`
  margin: var(--global-space-comp-m);

  hr {
    background-color: var(--container-standard-border-default);
    height: var(--global-borderwidth-xs);
  }
`;

const MenuItemDivider = () => (
  <StyledMenuItemDivider
    data-component="popover-menu-divider"
    aria-hidden="true"
  >
    <Divider m={0} type="horizontal" />
  </StyledMenuItemDivider>
);

MenuItemDivider.displayName = "PopoverMenuItemDivider";

export default MenuItemDivider;
