import React from "react";
import { MenuItem, MenuItemDivider, MenuItemHeading } from "../menu-item";

export const wrapChildrenInItem = (
  children: React.ReactNode,
): React.ReactNode[] | undefined => {
  return React.Children.map(children, (child) => {
    /* istanbul ignore if */
    if (!React.isValidElement(child)) {
      return null;
    }

    // Recursively unwrap Fragments
    if (child.type === React.Fragment) {
      return wrapChildrenInItem(child.props.children);
    }

    // If the child is already a MenuItem, MenuItemDivider, or MenuItemHeading, don't wrap it again
    if (
      child.type === MenuItem ||
      child.type === MenuItemDivider ||
      child.type === MenuItemHeading
    ) {
      return child;
    }

    // Components that render their own MenuItem(s) (e.g. ActionPopoverItem) opt out of
    // wrapping by setting this static, otherwise they would be nested in a second li
    if (
      (child.type as { skipMenuItemWrapping?: boolean })?.skipMenuItemWrapping
    ) {
      return child;
    }

    return <MenuItem>{child}</MenuItem>;
  })
    ?.flat()
    .filter(Boolean);
};

export const itemQuerySelector = (isSubmenu?: boolean) =>
  `li[data-component='popover-${isSubmenu ? "submenu" : "menu"}-item']:not([aria-disabled='true'])`;

const enabledControl = (tag: string) =>
  `${tag}:not([disabled]):not([aria-disabled='true'])`;

export const buttonMenuItemQuerySelector = (isSubmenu?: boolean) =>
  `${itemQuerySelector(isSubmenu)} ${enabledControl("button")}, ${itemQuerySelector(isSubmenu)} ${enabledControl("a")}`;
