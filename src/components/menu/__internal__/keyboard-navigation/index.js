import Events from "../../../../utils/helpers/events";
import MenuItem from "../../menu-item";

function characterNavigation(event, focusableItems, currentFocusedIndex) {
  event.stopPropagation();
  let firstMatch;
  let nextMatch;
  const selectedKey = event.key.toLowerCase();

  const getNodeText = (node) => {
    if (node instanceof Array) return node.map(getNodeText).join("");
    if (typeof node === "object" && node)
      return getNodeText(node.props.children);
    return node;
  };
  const getMenuText = (element) => {
    if (element.keyboardOverride) {
      return element.keyboardOverride;
    }

    if (element.submenu) {
      return element.submenu;
    }

    return getNodeText(element.children);
  };

  focusableItems.forEach((child, i) => {
    if (
      child &&
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

  if (Events.isAlphabetKey(event) || Events.isNumberKey(event)) {
    return characterNavigation(event, focusableItems, currentFocusedIndex);
  }

  if (Events.isTabKey(event)) {
    return undefined;
  }

  return currentFocusedIndex;
}

export { characterNavigation, menuKeyboardNavigation };
