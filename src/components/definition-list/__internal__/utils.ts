import React from "react";
import Dt from "../dt/dt.component";
import Dd from "../dd/dd.component";

export const flattenChildren = (
  children: React.ReactNode,
  parentKey = "",
): React.ReactNode[] =>
  React.Children.toArray(children).flatMap((child) => {
    const childKey = React.isValidElement(child)
      ? `${parentKey}${child.key ?? ""}`
      : parentKey;

    if (React.isValidElement(child) && child.type === React.Fragment) {
      return flattenChildren(child.props.children, `${childKey}.`);
    }

    return React.isValidElement(child)
      ? React.cloneElement(child, { key: childKey })
      : child;
  });

export const isComponent = (
  child: React.ReactNode,
  component: React.ElementType,
) => React.isValidElement(child) && child.type === component;

export const groupPairs = (children: React.ReactNode) => {
  const groupedChildren: React.ReactNode[][] = [];
  let pair: React.ReactNode[] = [];

  flattenChildren(children).forEach((child) => {
    if (isComponent(child, Dt)) {
      if (pair.length) groupedChildren.push(pair);
      pair = [child];
      return;
    }

    if (isComponent(child, Dd) && pair.length) {
      pair.push(child);
      return;
    }

    if (pair.length) groupedChildren.push(pair);
    pair = [];
    groupedChildren.push([child]);
  });

  if (pair.length) groupedChildren.push(pair);

  return groupedChildren;
};
