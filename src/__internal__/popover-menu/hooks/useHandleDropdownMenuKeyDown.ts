import { useCallback, MutableRefObject } from "react";

export const itemQuerySelector =
  "[data-component='popover-menu-item']:not([aria-disabled='true'])";

export const setFocus = (el?: Element) => {
  (el as HTMLElement)?.focus();
};

export const useHandleDropdownMenuKeyDown = (
  ref: MutableRefObject<HTMLDivElement | null>,
  onClose: () => void,
  focusControl: () => void,
  setAriaActivedescendant: React.Dispatch<React.SetStateAction<string>>,
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
          const itemToFocus = selectedItem ?? firstItem;
          setAriaActivedescendant(
            itemToFocus?.id ?? /* istanbul ignore next */ "",
          );
          setFocus(itemToFocus);

          return;
        }

        if (lastItem === highlightedItem) {
          setAriaActivedescendant(
            firstItem?.id ?? /* istanbul ignore next */ "",
          );
          setFocus(firstItem);

          return;
        }

        const currentIndex = items.indexOf(highlightedItem as Element);
        (highlightedItem as HTMLElement).setAttribute(
          "data-has-focus",
          "false",
        );
        const itemToFocus = items[(currentIndex + 1) % items.length];
        setAriaActivedescendant(
          itemToFocus?.id ?? /* istanbul ignore next */ "",
        );
        setFocus(itemToFocus);

        return;
      }

      if (ev.key === "ArrowUp") {
        ev.preventDefault();

        if (!highlightedItem) {
          const itemToFocus = selectedItem ?? lastItem;
          setAriaActivedescendant(
            itemToFocus?.id ?? /* istanbul ignore next */ "",
          );
          setFocus(itemToFocus);

          return;
        }

        if (firstItem === highlightedItem) {
          setAriaActivedescendant(
            lastItem?.id ?? /* istanbul ignore next */ "",
          );
          setFocus(lastItem);

          return;
        }

        const currentIndex = items.indexOf(highlightedItem as Element);
        const itemToFocus =
          items[(currentIndex - 1 + items.length) % items.length];
        setAriaActivedescendant(
          itemToFocus?.id ?? /* istanbul ignore next */ "",
        );
        setFocus(itemToFocus);

        return;
      }

      if (ev.key === "Home") {
        ev.preventDefault();
        setAriaActivedescendant(firstItem?.id ?? /* istanbul ignore next */ "");
        setFocus(firstItem);

        return;
      }

      if (ev.key === "End") {
        ev.preventDefault();
        setAriaActivedescendant(lastItem?.id ?? /* istanbul ignore next */ "");
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
    [ref, onClose, focusControl, setAriaActivedescendant],
  );
