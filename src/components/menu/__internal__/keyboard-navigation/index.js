import Events from "../../../../utils/helpers/events";
import MenuItem from "../../menu-item";

function characterNavigation(inputString, focusableItems, currentFocusedIndex) {
  if (!inputString || inputString === "") return currentFocusedIndex;

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

  const itemsList = focusableItems.map(
    (item) =>
      item && item.type === MenuItem && getMenuText(item.props).toLowerCase()
  );

  const matchingItem = itemsList.find(
    (item) => item && item.startsWith(inputString)
  );

  return itemsList.indexOf(matchingItem) === -1
    ? currentFocusedIndex
    : itemsList.indexOf(matchingItem);
}

function menuKeyboardNavigation(event, focusableItems) {
  let nextIndex;

  if (Events.isHomeKey(event)) {
    event.preventDefault();
    nextIndex = 0;
  }

  if (Events.isEndKey(event)) {
    event.preventDefault();
    nextIndex = focusableItems.length - 1;
  }

  return nextIndex;
}

export { characterNavigation, menuKeyboardNavigation };
