import { useCallback, MutableRefObject } from "react";

export const itemQuerySelector =
  "li[data-component='popover-menu-item']:not([aria-disabled='true'])";

export const setFocus = (el?: HTMLElement) => {
  el?.setAttribute("data-has-focus", "true");

  el?.scrollIntoView?.({
    block: "nearest",
    inline: "nearest",
  });
};

export const useHandleDropdownMenuKeyDown = (
  ref: MutableRefObject<HTMLUListElement | null>,
  setAriaActivedescendant: React.Dispatch<React.SetStateAction<string>>,
) =>
  useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
      const items = Array.from(
        ref.current?.querySelectorAll(itemQuerySelector) ||
          /* istanbul ignore next */ [],
      );
      const firstItem = items[0] as HTMLElement | undefined;
      const lastItem = items[items.length - 1] as HTMLElement | undefined;
      const highlightedItem = items.find(
        (item) => item.getAttribute("data-has-focus") === "true",
      ) as HTMLElement | undefined;
      const selectedItem = items.find(
        (item) => item.getAttribute("aria-selected") === "true",
      ) as HTMLElement | undefined;

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

        highlightedItem.setAttribute("data-has-focus", "false");

        if (lastItem === highlightedItem) {
          setAriaActivedescendant(
            firstItem?.id ?? /* istanbul ignore next */ "",
          );
          setFocus(firstItem);

          return;
        }

        const currentIndex = items.indexOf(highlightedItem);
        const itemToFocus = items[(currentIndex + 1) % items.length] as
          | HTMLElement
          | undefined;
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

        highlightedItem.setAttribute("data-has-focus", "false");

        if (firstItem === highlightedItem) {
          setAriaActivedescendant(
            lastItem?.id ?? /* istanbul ignore next */ "",
          );
          setFocus(lastItem);

          return;
        }

        const currentIndex = items.indexOf(highlightedItem);
        const itemToFocus = items[
          (currentIndex - 1 + items.length) % items.length
        ] as HTMLElement | undefined;
        setAriaActivedescendant(
          itemToFocus?.id ?? /* istanbul ignore next */ "",
        );
        setFocus(itemToFocus);

        return;
      }

      if (ev.key === "Home") {
        ev.preventDefault();
        setAriaActivedescendant(firstItem?.id ?? /* istanbul ignore next */ "");
        highlightedItem?.setAttribute("data-has-focus", "false");
        setFocus(firstItem);

        return;
      }

      if (ev.key === "End") {
        ev.preventDefault();
        setAriaActivedescendant(lastItem?.id ?? /* istanbul ignore next */ "");
        highlightedItem?.setAttribute("data-has-focus", "false");
        setFocus(lastItem);

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
    },
    [ref, setAriaActivedescendant],
  );
