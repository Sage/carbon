import { useCallback, MutableRefObject } from "react";
import { itemQuerySelector, buttonMenuItemQuerySelector } from "../utils";

export const setFocus = (
  el?: HTMLElement,
  highlightedItem?: HTMLElement,
  isButtonMenu?: boolean,
) => {
  if (isButtonMenu) {
    el?.focus();

    return;
  }

  highlightedItem?.setAttribute("data-has-focus", "false");
  el?.setAttribute("data-has-focus", "true");
  el?.scrollIntoView?.({
    block: "nearest",
    inline: "nearest",
  });
};

export type TypeaheadArgs = {
  event: React.KeyboardEvent<HTMLElement>;
  items: HTMLElement[];
  highlightedItem?: HTMLElement;
  setAriaActivedescendant: React.Dispatch<React.SetStateAction<string>>;
  isButtonMenu?: boolean;
};

/** Returns true when the key press has been consumed */
export type TypeaheadHandler = (args: TypeaheadArgs) => boolean;

/**
 * Opt-in type-ahead: focus the next item whose label starts with the pressed
 * character, wrapping to the start of the list when there is no later match.
 */
export const handleAlphaKeyNavigation: TypeaheadHandler = ({
  event,
  items,
  highlightedItem,
  setAriaActivedescendant,
  isButtonMenu,
}) => {
  if (
    event.key.trim().length !== 1 ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey
  ) {
    return false;
  }

  const character = event.key.toLowerCase();
  const matches = items.filter((item) =>
    (item.textContent ?? /* istanbul ignore next */ "")
      .trim()
      .toLowerCase()
      .startsWith(character),
  );

  if (!matches.length) {
    return false;
  }

  event.stopPropagation();

  const currentIndex = highlightedItem ? items.indexOf(highlightedItem) : -1;
  const itemToFocus =
    matches.find((item) => items.indexOf(item) > currentIndex) ?? matches[0];

  setAriaActivedescendant(itemToFocus.id);
  setFocus(itemToFocus, highlightedItem, isButtonMenu);

  return true;
};

export const useHandleDropdownMenuKeyDown = (
  ref: MutableRefObject<HTMLUListElement | null>,
  setAriaActivedescendant: React.Dispatch<React.SetStateAction<string>>,
  onClose: (e?: Event) => void,
  submenuOptions: {
    isButtonMenu?: boolean;
    isSubmenu?: boolean;
    controlReference?: React.RefObject<HTMLLIElement>;
    typeahead?: TypeaheadHandler;
  },
) =>
  useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
      const activeScrollWrapper = (document.activeElement as Element)?.closest(
        '[data-component="scroll-wrapper"]',
      );

      // short-circuit if focus is inside a nested scroll wrapper (e.g. an open submenu)
      if (activeScrollWrapper && !activeScrollWrapper.contains(ref.current)) {
        return;
      }

      const { isButtonMenu, isSubmenu, typeahead } = submenuOptions;

      const items = Array.from(
        ref.current?.querySelectorAll(
          isButtonMenu
            ? buttonMenuItemQuerySelector(isSubmenu)
            : itemQuerySelector(isSubmenu),
        ) || /* istanbul ignore next */ [],
      );
      const firstItem = items[0] as HTMLElement | undefined;
      const lastItem = items[items.length - 1] as HTMLElement | undefined;
      const highlightedItem = (
        isButtonMenu
          ? items.find((item) => item.contains(document.activeElement as Node))
          : items.find((item) => item.getAttribute("data-has-focus") === "true")
      ) as HTMLElement | undefined;
      const selectedItem = items.find(
        (item) => item.getAttribute("aria-selected") === "true",
      ) as HTMLElement | undefined;

      if (ev.key === "ArrowDown") {
        ev.preventDefault();
        ev.stopPropagation();

        if (!highlightedItem) {
          const itemToFocus = selectedItem ?? firstItem;
          setAriaActivedescendant(
            itemToFocus?.id ?? /* istanbul ignore next */ "",
          );
          setFocus(itemToFocus, highlightedItem, isButtonMenu);

          return;
        }

        if (!isButtonMenu && lastItem === highlightedItem) {
          setAriaActivedescendant(
            firstItem?.id ?? /* istanbul ignore next */ "",
          );
          setFocus(firstItem, highlightedItem, isButtonMenu);

          return;
        }

        const currentIndex = items.indexOf(highlightedItem);
        const nextIndex = isButtonMenu
          ? Math.min(currentIndex + 1, items.length - 1)
          : (currentIndex + 1) % items.length;
        const itemToFocus = items[nextIndex] as HTMLElement | undefined;
        setAriaActivedescendant(
          itemToFocus?.id ?? /* istanbul ignore next */ "",
        );
        setFocus(itemToFocus, highlightedItem, isButtonMenu);

        return;
      }

      if (ev.key === "ArrowUp") {
        ev.preventDefault();
        ev.stopPropagation();

        if (!highlightedItem) {
          const itemToFocus = selectedItem ?? lastItem;
          setAriaActivedescendant(
            itemToFocus?.id ?? /* istanbul ignore next */ "",
          );
          setFocus(itemToFocus, highlightedItem, isButtonMenu);

          return;
        }

        if (!isButtonMenu && firstItem === highlightedItem) {
          setAriaActivedescendant(
            lastItem?.id ?? /* istanbul ignore next */ "",
          );
          setFocus(lastItem, highlightedItem, isButtonMenu);

          return;
        }

        const currentIndex = items.indexOf(highlightedItem);
        const prevIndex = isButtonMenu
          ? Math.max(currentIndex - 1, 0)
          : (currentIndex - 1 + items.length) % items.length;
        const itemToFocus = items[prevIndex] as HTMLElement | undefined;
        setAriaActivedescendant(
          itemToFocus?.id ?? /* istanbul ignore next */ "",
        );
        setFocus(itemToFocus, highlightedItem, isButtonMenu);

        return;
      }

      if (ev.key === "Home") {
        ev.preventDefault();
        setAriaActivedescendant(firstItem?.id ?? /* istanbul ignore next */ "");
        setFocus(firstItem, highlightedItem, isButtonMenu);

        return;
      }

      if (ev.key === "End") {
        ev.preventDefault();
        setAriaActivedescendant(lastItem?.id ?? /* istanbul ignore next */ "");
        setFocus(lastItem, highlightedItem, isButtonMenu);

        return;
      }

      if (
        typeahead?.({
          event: ev,
          items: items as HTMLElement[],
          highlightedItem,
          setAriaActivedescendant,
          isButtonMenu,
        })
      ) {
        return;
      }

      if (ev.key === "Enter" && !isButtonMenu) {
        /* istanbul ignore else */
        if (highlightedItem) {
          ev.preventDefault();
          ev.stopPropagation();
          highlightedItem.click();
        }
      }

      // covered in playwright
      /* istanbul ignore next */
      if (ev.key === "Tab") {
        onClose(ev.nativeEvent);
        return;
      }
    },
    [ref, setAriaActivedescendant, onClose, submenuOptions],
  );
