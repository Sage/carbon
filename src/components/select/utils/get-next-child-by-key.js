import React from "react";

export function getNextChildByKey(key, children, previousSelectedValue) {
  const childrenList = React.Children.toArray(children);
  const currentSelectedIndex = childrenList.findIndex((option) => {
    return option.props.value === previousSelectedValue;
  });
  const lastIndex = childrenList.length - 1;

  return childrenList[getNextIndexByKey(key, currentSelectedIndex, lastIndex)];
}

export function getNextIndexByKey(key, currentIndex, lastIndex) {
  const isNoOptionSelected = currentIndex === -1;
  let newIndex = currentIndex;

  if (key === "Home") {
    newIndex = 0;
  } else if (key === "End") {
    newIndex = lastIndex;
  } else if (key === "ArrowDown") {
    if (currentIndex === lastIndex || isNoOptionSelected) {
      newIndex = 0;
    } else {
      newIndex = currentIndex + 1;
    }
  } else if (key === "ArrowUp") {
    if (currentIndex === 0 || isNoOptionSelected) {
      newIndex = lastIndex;
    } else {
      newIndex = currentIndex - 1;
    }
  }

  return newIndex;
}
