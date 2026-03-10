import React from "react";
import MenuItem from "./menu-item.component";

const wrapChildrenInItem = (
  children: React.ReactNode,
): React.ReactNode[] | undefined =>
  React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return null;

    // Recursively unwrap Fragments
    if (child.type === React.Fragment) {
      return wrapChildrenInItem(child.props.children);
    }

    // If the child is already a MenuItem, don't wrap it again
    if (child.type === MenuItem) {
      return child;
    }

    // If the child has a submenu prop, it handles its own styling/semantics
    if (child.props.submenu) {
      return child;
    }

    return <MenuItem>{child}</MenuItem>;
  })
    ?.flat()
    .filter(Boolean);

export default wrapChildrenInItem;
