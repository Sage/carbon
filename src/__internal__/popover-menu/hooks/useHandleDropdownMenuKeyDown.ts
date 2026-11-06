import { useCallback, MutableRefObject } from "react";
import { itemQuerySelector, buttonMenuItemQuerySelector } from "../utils";

// Number of items PageUp/PageDown moves the focus by, so long lists can be
// traversed more quickly than one item at a time without jumping to the ends.
export const PAGE_NAVIGATION_SIZE = 10;

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

export interface TypeaheadHandler {
  ev: React.KeyboardEvent<HTMLElement>;
  items: HTMLElement[];
  setAriaActivedescendant: React.Dispatch<React.SetStateAction<string>>;
  focus: typeof setFocus;
}

export const useHandleDropdownMenuKeyDown = (
  ref: MutableRefObject<HTMLUListElement | null>,
  setAriaActivedescendant: React.Dispatch<React.SetStateAction<string>>,
  onClose: (e?: Event) => void,
  submenuOptions: {
    isButtonMenu?: boolean;
    isSubmenu?: boolean;
    controlReference?: React.RefObject<HTMLLIElement>;
    enablePageNavigation?: boolean;
    selectOnSpaceAndTab?: boolean;
  },
  typeahead?: (args: TypeaheadHandler) => void,
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

      const {
        isButtonMenu,
        isSubmenu,
        enablePageNavigation,
        selectOnSpaceAndTab,
      } = submenuOptions;

      const items = Array.from(
        ref.current?.querySelectorAll(
          isButtonMenu
            ? buttonMenuItemQuerySelector(isSubmenu)
            : itemQuerySelector(isSubmenu),
        ) || /* istanbul ignore next */ [],
      ) as HTMLElement[];
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      const highlightedItem = isButtonMenu
        ? items.find((item) => item.contains(document.activeElement as Node))
        : items.find((item) => item.getAttribute("data-has-focus") === "true");
      const selectedItem = items.find(
        (item) => item.getAttribute("aria-selected") === "true",
      );

      if (typeahead) {
        typeahead({ ev, items, setAriaActivedescendant, focus: setFocus });
      }

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
        (ev.key === "PageUp" || ev.key === "PageDown") &&
        enablePageNavigation
      ) {
        ev.preventDefault();

        const baseIndex = highlightedItem
          ? items.indexOf(highlightedItem)
          : selectedItem
            ? items.indexOf(selectedItem)
            : ev.key === "PageDown"
              ? 0
              : items.length - 1;
        const delta =
          ev.key === "PageDown" ? PAGE_NAVIGATION_SIZE : -PAGE_NAVIGATION_SIZE;
        const targetIndex = Math.min(
          Math.max(baseIndex + delta, 0),
          items.length - 1,
        );
        const itemToFocus = items[targetIndex] as HTMLElement | undefined;

        setAriaActivedescendant(
          itemToFocus?.id ?? /* istanbul ignore next */ "",
        );
        setFocus(itemToFocus, highlightedItem, isButtonMenu);

        return;
      }

      if (
        !isButtonMenu &&
        (ev.key === "Enter" || (selectOnSpaceAndTab && ev.key === " "))
      ) {
        /* istanbul ignore else */
        if (highlightedItem) {
          ev.preventDefault();
          ev.stopPropagation();
          highlightedItem.click();
        }

        return;
      }

      if (ev.key === "Tab") {
        // Confirm the focused item before closing, then let focus move on.
        if (selectOnSpaceAndTab && !isButtonMenu && highlightedItem) {
          highlightedItem.click();
        }

        onClose(ev.nativeEvent);
        return;
      }
    },
    [ref, setAriaActivedescendant, onClose, submenuOptions, typeahead],
  );
