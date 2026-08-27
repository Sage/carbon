import React from "react";
import { MenuItemDivider } from "../../__internal__/popover-menu";

const ActionPopoverDivider = () => (
  <MenuItemDivider
    data-element="action-popover-divider"
    data-role="action-popover-divider"
  />
);

ActionPopoverDivider.displayName = "ActionPopoverDivider";
ActionPopoverDivider.skipMenuItemWrapping = true;

export default ActionPopoverDivider;
