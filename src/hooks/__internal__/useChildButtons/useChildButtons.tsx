import { useState, useRef, useEffect, useCallback } from "react";
import Events from "../../../__internal__/utils/helpers/events";
import useMenuKeyboardNavigation from "../useMenuKeyboardNavigation";

const useChildButtons = (
  toggleButtonRef: React.RefObject<HTMLButtonElement>,
  widthRatio = 1
) => {
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [minWidth, setMinWidth] = useState(0);

  const buttonNode = useRef<HTMLDivElement>(null);
  const childrenContainer = useRef<HTMLDivElement>(null);
  const focusFirstChildButtonOnOpen = useRef(false);

  const hideButtons = useCallback(() => {
    setShowAdditionalButtons(false);
  }, []);

  function showButtons() {
    setShowAdditionalButtons(true);

    /* istanbul ignore else */
    if (buttonNode.current) {
      setMinWidth(
        widthRatio * buttonNode.current.getBoundingClientRect().width
      );
    }
  }

  const getButtonChildren = useCallback(
    () =>
      childrenContainer.current?.querySelectorAll(
        '[data-component="button"]'
      ) as NodeListOf<HTMLButtonElement>,
    []
  );

  useEffect(() => {
    const firstChild = getButtonChildren()?.[0];
    if (
      focusFirstChildButtonOnOpen.current &&
      showAdditionalButtons &&
      firstChild
    ) {
      focusFirstChildButtonOnOpen.current = false;
      firstChild.focus();
    }
  }, [showAdditionalButtons, getButtonChildren]);

  const handleToggleButtonKeyDown = (
    ev: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (
      Events.isEnterKey(ev) ||
      Events.isSpaceKey(ev) ||
      Events.isDownKey(ev) ||
      Events.isUpKey(ev)
    ) {
      ev.preventDefault();

      if (!showAdditionalButtons) {
        showButtons();
      }

      focusFirstChildButtonOnOpen.current = true;
    }
  };

  const handleKeyDown = useMenuKeyboardNavigation(
    toggleButtonRef,
    getButtonChildren,
    hideButtons,
    showAdditionalButtons
  );

  const onChildButtonClick = (
    childOnClick?: React.MouseEventHandler<HTMLButtonElement>
  ) => (ev: React.MouseEvent<HTMLButtonElement>) => {
    childOnClick?.(ev);
    hideButtons();
    toggleButtonRef.current?.focus();
  };

  const hideButtonsIfTriggerNotFocused = useCallback(() => {
    if (toggleButtonRef.current === document.activeElement) return;
    setShowAdditionalButtons(false);
  }, [toggleButtonRef]);

  const wrapperProps = {
    role: "menu",
    "data-element": "additional-buttons",
    onKeyDown: handleKeyDown,
    minWidth,
    ref: childrenContainer,
  };
  const contextValue = { inSplitButton: true, onChildButtonClick };

  return {
    showAdditionalButtons,
    showButtons,
    hideButtons,
    buttonNode,
    hideButtonsIfTriggerNotFocused,
    handleToggleButtonKeyDown,
    wrapperProps,
    contextValue,
  };
};

export default useChildButtons;
