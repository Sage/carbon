import { useCallback } from "react";

export const itemQuerySelector =
  "div[data-component='popover-menu-item']:not([aria-disabled='true'])";

export const setFocus = (el?: Element) => {
  (el as HTMLElement)?.focus();
};

export const useHandleDropdownMenuKeyDown = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  onClose: () => void,
  focusControl: () => void,
) =>
  useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
      const items = Array.from(
        ref.current?.querySelectorAll(itemQuerySelector) ||
          /* istanbul ignore next */ [],
      );
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      const highlightedItem = items.find(
        (item) => item === document.activeElement,
      );
      const selectedItem = items.find(
        (item) => item.getAttribute("aria-selected") === "true",
      );

      if (ev.key === "ArrowDown") {
        ev.preventDefault();

        if (!highlightedItem) {
          setFocus(selectedItem ?? firstItem);
          return;
        }

        if (lastItem === highlightedItem) {
          setFocus(firstItem);
          return;
        }

        const currentIndex = items.indexOf(highlightedItem as Element);
        (highlightedItem as HTMLElement).setAttribute(
          "data-has-focus",
          "false",
        );
        setFocus(items[(currentIndex + 1) % items.length]);
        return;
      }

      if (ev.key === "ArrowUp") {
        ev.preventDefault();

        if (!highlightedItem) {
          setFocus(selectedItem ?? lastItem);
          return;
        }

        if (firstItem === highlightedItem) {
          setFocus(lastItem);
          return;
        }

        const currentIndex = items.indexOf(highlightedItem as Element);
        setFocus(items[(currentIndex - 1 + items.length) % items.length]);
        return;
      }

      if (ev.key === "Home") {
        ev.preventDefault();
        setFocus(firstItem);

        return;
      }

      if (ev.key === "End") {
        ev.preventDefault();
        setFocus(lastItem);

        return;
      }

      if (ev.key === "Enter") {
        const highlightedItem = items.find(
          (item) => item === document.activeElement,
        );

        /* istanbul ignore else */
        if (highlightedItem) {
          ev.preventDefault();
          ev.stopPropagation();
          (highlightedItem as HTMLElement).click();
          focusControl();
        }
      }

      if (ev.key === "Tab" && !ev.shiftKey) {
        onClose();
      }
    },
    [ref, onClose, focusControl],
  );
