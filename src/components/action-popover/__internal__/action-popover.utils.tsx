import React from "react";
import ActionPopoverItem from "../action-popover-item/action-popover-item.component";

// Reusable type alias for item types
type ReactItem = React.ReactChild | React.ReactFragment | React.ReactPortal;

export const getItems = (
  children: React.ReactNode | React.ReactNode[],
): ReactItem[] =>
  React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === ActionPopoverItem,
  );

export const isItemDisabled = (item: ReactItem) =>
  React.isValidElement(item) && !!item.props?.disabled;

export const findFirstFocusableItem = (items: ReactItem[]): number =>
  items.findIndex((_, index) => !isItemDisabled(items[index]));

// FIX-ME: FE-6248
// Once we no longer support Node 16, this function can be removed and `findLastIndex()` can be used in its place.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex
export const findLastFocusableItem = (items: ReactItem[]): number => {
  for (let i = items.length - 1; i >= 0; i--) {
    if (!isItemDisabled(items[i])) {
      return i;
    }
  }
  return -1;
};

export const checkChildrenForString = (children: React.ReactNode): boolean => {
  return React.Children.toArray(children).some((child) => {
    if (typeof child === "string") {
      return true;
    }

    return React.isValidElement(child)
      ? checkChildrenForString(child.props.children)
      : false;
  });
};
