import { useCallback, MutableRefObject } from "react";

export const itemQuerySelector = (isSubmenu = false) =>
  `li[data-component='popover-${isSubmenu ? "submenu" : "menu"}-item']:not([aria-disabled='true'])`;

const buttonMenuItemQuerySelector = (isSubmenu = false) =>
  `${itemQuerySelector(isSubmenu)} button, ${itemQuerySelector(isSubmenu)} a`;

export const setFocus = (el?: HTMLElement, highlightedItem?: HTMLElement, isButtonMenu = false) => {
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

export const useHandleDropdownMenuKeyDown = (
  ref: MutableRefObject<HTMLUListElement | null>,
  setAriaActivedescendant: React.Dispatch<React.SetStateAction<string>>,
  onClose: () => void,
  submenuOptions: {
    isButtonMenu?: boolean;
    isSubmenu?: boolean;
    focusSubmenuParent?: () => void;
  } = {},
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

      const { isButtonMenu, isSubmenu, focusSubmenuParent } = submenuOptions;

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

      if (ev.key === "Enter") {
        /* istanbul ignore else */
        if (highlightedItem) {
          ev.preventDefault();
          ev.stopPropagation();
          highlightedItem.click();
        }
      }

      if (!isButtonMenu && ev.key === "Tab" && !ev.shiftKey) {
        onClose();

        return;
      }

      if (isButtonMenu && isSubmenu && items[0] === document.activeElement && ev.key === "Tab" && ev.shiftKey) {
        ev.preventDefault();
        focusSubmenuParent?.();

        return;
      }
    },
    [ref, setAriaActivedescendant, onClose, submenuOptions],
  );
