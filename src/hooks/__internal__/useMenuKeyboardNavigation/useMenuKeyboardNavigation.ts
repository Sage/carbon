import { useCallback, useMemo } from "react";
import Events from "../../../__internal__/utils/helpers/events";
import { defaultFocusableSelectors } from "../../../__internal__/focus-trap/focus-trap-utils";

export default (
  mainControlRef: React.RefObject<HTMLButtonElement>,
  childrenRefs: React.RefObject<HTMLButtonElement>[],
  hide: () => void
) => {
  const childrenLength = useMemo(() => childrenRefs.length, [childrenRefs]);

  const handleKeyDown = useCallback(
    (ev) => {
      if (!(Events.isEnterKey(ev) || Events.isSpaceKey(ev))) {
        ev.preventDefault();
      }

      const currentIndex = childrenRefs?.findIndex(
        (node) => node.current === document.activeElement
      );
      let nextIndex = -1;

      const refocusMainControl = () => {
        hide();
        mainControlRef.current?.focus();
      };

      const arrowModifierPressed = ev.ctrlKey || ev.metaKey;

      if (
        Events.isEndKey(ev) ||
        (arrowModifierPressed && Events.isDownKey(ev))
      ) {
        nextIndex = childrenLength - 1;
      }

      if (
        Events.isHomeKey(ev) ||
        (arrowModifierPressed && Events.isUpKey(ev))
      ) {
        nextIndex = 0;
      }

      if (!arrowModifierPressed && Events.isUpKey(ev) && currentIndex > 0) {
        nextIndex = currentIndex - 1;
      }

      if (
        !arrowModifierPressed &&
        Events.isDownKey(ev) &&
        currentIndex < childrenLength - 1
      ) {
        nextIndex = currentIndex + 1;
      }

      const tabPressed = Events.isTabKey(ev);
      const tabShiftPressed = tabPressed && Events.isShiftKey(ev);

      if (tabShiftPressed) {
        if (currentIndex === 0) {
          refocusMainControl();
        } else {
          nextIndex = currentIndex - 1;
        }
      } else if (tabPressed) {
        if (currentIndex === childrenLength - 1) {
          const elements = Array.from(
            document.querySelectorAll(
              defaultFocusableSelectors
            ) as NodeListOf<HTMLElement>
          ).filter((el) => Number(el.tabIndex) !== -1);

          const indexOf = elements.indexOf(
            mainControlRef.current as HTMLButtonElement
          );

          elements[indexOf + 1]?.focus();
          // // timeout enforces that the "hide" method will be run after browser focuses on the next element
          setTimeout(hide, 0);
        } else {
          nextIndex = currentIndex + 1;
        }
      }

      if (nextIndex > -1) {
        childrenRefs[nextIndex].current?.focus();
      }

      if (Events.isEscKey(ev)) {
        refocusMainControl();
      }
    },
    [childrenLength, hide, childrenRefs, mainControlRef]
  );

  return handleKeyDown;
};
