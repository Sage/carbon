import Option from "../option/option.component";

export function getIndexOfMatch(childrenList, valueToMatch) {
  return childrenList.findIndex((child) => child.props.value === valueToMatch);
}

export function getNextOptionByKey(key, childrenList, currentSelectedIndex) {
  const lastIndex = childrenList.length - 1;
  const nextIndex = getNextIndexByKey(key, currentSelectedIndex, lastIndex);
  let nextChild = childrenList[nextIndex];

  if (nextChild && nextChild.type !== Option) {
    nextChild = getNextOptionByKey(key, childrenList, nextIndex);
  }

  return nextChild;
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
