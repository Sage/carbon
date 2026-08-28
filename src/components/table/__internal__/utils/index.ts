import React from "react";

const flattenChildren = (children: React.ReactNode): React.ReactNode[] => {
  return React.Children.toArray(children).flatMap((child) => {
    if (!React.isValidElement(child)) {
      return [];
    }

    if (child.type === React.Fragment) {
      return flattenChildren(child.props.children);
    }

    return child;
  });
};

export default flattenChildren;
