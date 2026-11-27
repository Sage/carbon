import React from "react";

const flattenChildren = (
  children: React.ReactNode,
): React.ReactElement<React.PropsWithChildren>[] => {
  return React.Children.toArray(children).flatMap((child) => {
    if (!React.isValidElement<React.PropsWithChildren>(child)) {
      return [];
    }

    if (child.type === React.Fragment) {
      return flattenChildren(child.props.children);
    }

    return child;
  });
};

export default flattenChildren;
