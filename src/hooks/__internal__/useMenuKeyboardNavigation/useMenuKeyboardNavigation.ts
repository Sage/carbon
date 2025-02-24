import { useCallback, useEffect } from "react";
import Events from "../../../__internal__/utils/helpers/events";
import useModalManager from "../useModalManager";

export default (
  mainControlRef: React.RefObject<HTMLButtonElement>,
  getButtonChildren: () => NodeListOf<HTMLButtonElement>,
  hide: () => void,
  isOpen: boolean,
) => {
  const refocusMainControl = useCallback(() => {
    hide();
    mainControlRef.current?.focus();
  }, [hide, mainControlRef]);

  const handleEscapeKey = useCallback(
    (ev: KeyboardEvent) => {
      /* istanbul ignore else */
      if (Events.isEscKey(ev)) {
        refocusMainControl();
      }
    },
    [refocusMainControl],
  );

  // useModalmanager is used here to handle the escape key
  // and to ensure that closing the menu does not close the modal
  useModalManager({
    open: isOpen,
    closeModal: handleEscapeKey,
    modalRef: mainControlRef,
  });

  const handleKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLElement>) => {
      if (
        !(Events.isEnterKey(ev) || Events.isSpaceKey(ev) || Events.isTabKey(ev))
      ) {
        ev.preventDefault();
      }

      const buttonChildren = getButtonChildren();
      const childrenLength = buttonChildren?.length;

      let nextIndex = -1;

      const currentIndex = (
        Array.from(buttonChildren) as HTMLElement[]
      ).indexOf(document.activeElement as HTMLElement);

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

      if (nextIndex > -1) {
        buttonChildren?.[nextIndex]?.focus();
      }
    },
    [getButtonChildren],
  );

  // check if a child button is focused, if not hide the menu
  const checkFocus = useCallback(() => {
    const buttonChildren = getButtonChildren();

    if (!buttonChildren) {
      return;
    }

    const buttonChildrenFocused = Array.from(buttonChildren).some(
      (button) => button === document.activeElement,
    );

    if (!buttonChildrenFocused) {
      hide();
    }
  }, [getButtonChildren, hide]);

  useEffect(() => {
    document.addEventListener("focusin", checkFocus);
    window.addEventListener("blur", hide);
    return () => {
      document.removeEventListener("focusin", checkFocus);
      window.removeEventListener("blur", hide);
    };
  }, [checkFocus, hide]);

  return handleKeyDown;
};
