import Events from "../../../../utils/helpers/events";
import MenuItem from "../../menu-item";

function characterNavigation(event, focusableItems, currentFocusedIndex) {
  event.stopPropagation();
  let firstMatch;
  let nextMatch;
  const selectedKey = event.key.toLowerCase();
  const getMenuText = (element) => {
    if (element.submenu) {
      return element.submenu;
    }

    return element.children;
  };

  focusableItems.forEach((child, i) => {
    if (
      child.type === MenuItem &&
      getMenuText(child.props).toLowerCase().startsWith(selectedKey)
    ) {
      if (firstMatch === undefined) {
        firstMatch = i;
      }
      if (i > currentFocusedIndex && !nextMatch) {
        nextMatch = i;
      }
    }
  });

  if (nextMatch !== undefined) {
    return nextMatch;
  }

  if (firstMatch !== undefined) {
    return firstMatch;
  }

  return currentFocusedIndex;
}

function menuKeyboardNavigation(event, focusableItems, currentFocusedIndex) {
  if (Events.isRightKey(event)) {
    event.preventDefault();
    if (currentFocusedIndex === focusableItems.length - 1) {
      return 0;
    }
    return currentFocusedIndex + 1;
  }

  if (Events.isLeftKey(event)) {
    event.preventDefault();
    if (currentFocusedIndex === 0) {
      return focusableItems.length - 1;
    }
    return currentFocusedIndex - 1;
  }

  if (Events.isHomeKey(event)) {
    event.preventDefault();
    return 0;
  }

  if (Events.isEndKey(event)) {
    event.preventDefault();
    return focusableItems.length - 1;
  }

  if (Events.isAlphabetKey(event)) {
    return characterNavigation(event, focusableItems, currentFocusedIndex);
  }

  if (Events.isTabKey(event)) {
    return undefined;
  }

  return currentFocusedIndex;
}

export { characterNavigation, menuKeyboardNavigation };
