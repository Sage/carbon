import { useCallback } from "react";
import Events from "../../../__internal__/utils/helpers/events";
import { defaultFocusableSelectors } from "../../../__internal__/focus-trap/focus-trap-utils";
import useModalManager from "../useModalManager";

export default (
  mainControlRef: React.RefObject<HTMLButtonElement>,
  getButtonChildren: () => NodeListOf<HTMLButtonElement>,
  hide: () => void,
  isOpen: boolean
) => {
  const refocusMainControl = useCallback(() => {
    hide();
    mainControlRef.current?.focus();
  }, [hide, mainControlRef]);

  const handleEscapeKey = useCallback(
    (e) => {
      /* istanbul ignore else */
      if (Events.isEscKey(e)) {
        refocusMainControl();
      }
    },
    [refocusMainControl]
  );

  // useModalmanager is used here to handle the escape key
  // and to ensure that closing the menu does not close the modal
  useModalManager({
    open: isOpen,
    closeModal: handleEscapeKey,
    modalRef: mainControlRef,
  });

  const handleKeyDown = useCallback(
    (ev) => {
      if (!(Events.isEnterKey(ev) || Events.isSpaceKey(ev))) {
        ev.preventDefault();
      }

      const buttonChildren = getButtonChildren();
      const childrenLength = buttonChildren?.length;

      let nextIndex = -1;

      const currentIndex = (Array.from(
        buttonChildren
      ) as HTMLElement[]).indexOf(document.activeElement as HTMLElement);

      const arrowModifierPressed = ev.ctrlKey || ev.metaKey;

      if (
        Events.isEndKey(ev) ||
        (arrowModifierPressed && Events.isDownKey(ev))
      ) {
        nextIndex = (childrenLength as number) - 1;
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
        currentIndex < (childrenLength as number) - 1
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
        if (currentIndex === (childrenLength as number) - 1) {
          const elements = Array.from(
            document.querySelectorAll(
              defaultFocusableSelectors
            ) as NodeListOf<HTMLElement>
          ).filter((el) => Number(el.tabIndex) !== -1);

          const indexOf = elements.indexOf(
            mainControlRef.current as HTMLButtonElement
          );

          elements[indexOf + 1]?.focus();
          // timeout enforces that the "hide" method will be run after browser focuses on the next element
          setTimeout(hide, 0);
        } else {
          nextIndex = currentIndex + 1;
        }
      }

      if (nextIndex > -1) {
        buttonChildren?.[nextIndex]?.focus();
      }
    },
    [hide, refocusMainControl, mainControlRef, getButtonChildren]
  );

  return handleKeyDown;
};
