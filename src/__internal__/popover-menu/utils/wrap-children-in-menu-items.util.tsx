import React from "react";
import { MenuItem, MenuItemDivider, MenuItemHeading } from "../menu-item";

const wrapChildrenInItem = (
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

    return <MenuItem>{child}</MenuItem>;
  })
    ?.flat()
    .filter(Boolean);
};

export default wrapChildrenInItem;
