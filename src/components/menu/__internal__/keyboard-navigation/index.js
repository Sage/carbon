import Events from "../../../../utils/helpers/events";
import MenuItem from "../../menu-item";

function characterNavigation(inputString, focusableItems, currentFocusedIndex) {
  if (!inputString) return currentFocusedIndex;

  const getNodeText = (node) => {
    if (node instanceof Array) return node.map(getNodeText).join("");
    if (typeof node === "object" && node)
      return getNodeText(node.props.children);
    return node;
  };
  const getMenuText = (element) => {
    if (element.submenu) {
      return element.submenu;
    }

    return getNodeText(element.children);
  };

  const itemsList = focusableItems.map(
    (item) =>
      item &&
      item.type === MenuItem &&
      getMenuText(item.props) &&
      getMenuText(item.props).toLowerCase()
  );

  const matchingItem = itemsList.find(
    (item) => item && item.startsWith(inputString)
  );

  const matchingIndex = itemsList.indexOf(matchingItem);

  return matchingIndex === -1 ? currentFocusedIndex : matchingIndex;
}

function menuKeyboardNavigation(event, focusableItems) {
  if (Events.isHomeKey(event)) {
    event.preventDefault();
    return 0;
  }

  if (Events.isEndKey(event)) {
    event.preventDefault();
    return focusableItems.length - 1;
  }

  return undefined;
}

export { characterNavigation, menuKeyboardNavigation };
