import React from "react";

/**
 * Flattens React Fragments (including nested ones) into a keyed array of their children,
 * as `React.Children.toArray` does not traverse fragments.
 * */
const flattenChildren = (items: React.ReactNode): React.ReactNode[] =>
  React.Children.toArray(
    React.Children.map(items, (child) => {
      if (
        React.isValidElement<{ children?: React.ReactNode }>(child) &&
        child.type === React.Fragment
      ) {
        return flattenChildren(child.props.children);
      }

      return child;
    }),
  );

export default flattenChildren;
