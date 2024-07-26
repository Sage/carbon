import React from "react";
import Events from "../../../../__internal__/utils/helpers/events";
import { MENU_ITEM, SCROLLABLE_BLOCK_PARENT } from "../locators";

function characterNavigation(inputString?: string, focusableItems?: Element[]) {
  if (!inputString || !focusableItems) return undefined;

  const getInnerText = (element: Element) =>
    element?.textContent
      ?.split("\n")
      ?.map((text) => text.trim())
      .join(" ");

  const getMenuText = (element: Element) =>
    getInnerText(element)?.toLowerCase();

  const matchingItem = focusableItems.find((item: Element) => {
    if (!item?.getAttribute("data-component")) return false;

    return (
      [MENU_ITEM, SCROLLABLE_BLOCK_PARENT].includes(
        item.getAttribute("data-component") as string,
      ) && getMenuText(item)?.startsWith(inputString.toLowerCase())
    );
  });

  return matchingItem;
}

function menuKeyboardNavigation(
  event: React.KeyboardEvent,
  focusableItems: Element[],
) {
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
