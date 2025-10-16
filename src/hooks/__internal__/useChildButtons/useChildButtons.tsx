import React, { useState, useRef, useCallback } from "react";
import Events from "../../../__internal__/utils/helpers/events";
import useMenuKeyboardNavigation from "../useMenuKeyboardNavigation";

const useChildButtons = (
  toggleButtonRef: React.RefObject<HTMLButtonElement>,
  widthRatio = 1,
) => {
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [minWidth, setMinWidth] = useState(0);

  const buttonNode = useRef<HTMLDivElement>(null);
  const childrenContainer = useRef<HTMLUListElement>(null);

  const hideButtons = useCallback(() => {
    setShowAdditionalButtons(false);
  }, []);

  function showButtons() {
    setShowAdditionalButtons(true);

    /* istanbul ignore else */
    if (buttonNode.current) {
      setMinWidth(
        widthRatio * buttonNode.current.getBoundingClientRect().width,
      );
    }
  }

  const getButtonChildren = useCallback(
    () =>
      childrenContainer.current?.querySelectorAll(
        '[data-component="button"]',
      ) as NodeListOf<HTMLButtonElement>,
    [],
  );

  const handleToggleButtonKeyDown = (
    ev: React.KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    const isToggleKey = Events.isEnterKey(ev) || Events.isSpaceKey(ev);

    if ((isToggleKey || Events.isDownKey(ev)) && !showAdditionalButtons) {
      ev.preventDefault();
      showButtons();
    }

    if (Events.isDownKey(ev) && showAdditionalButtons) {
      ev.preventDefault();
      getButtonChildren()?.[0]?.focus({ preventScroll: true });
    }

    if (isToggleKey && showAdditionalButtons) {
      ev.preventDefault();
      hideButtons();
    }
  };

  const handleKeyDown = useMenuKeyboardNavigation(
    toggleButtonRef,
    getButtonChildren,
    hideButtons,
    showAdditionalButtons,
  );

  const handleBlur = (ev: React.FocusEvent<HTMLElement>) => {
    if (ev.currentTarget.contains(ev.relatedTarget)) return;
    hideButtons();
  };

  const onChildButtonClick =
    (childOnClick?: React.MouseEventHandler<HTMLButtonElement>) =>
    (ev: React.MouseEvent<HTMLButtonElement>) => {
      childOnClick?.(ev);
      hideButtons();
      toggleButtonRef.current?.focus();
    };

  const wrapperProps = {
    "data-element": "additional-buttons",
    role: "list",
    onKeyDown: handleKeyDown,
    onBlur: handleBlur,
    minWidth,
    ref: childrenContainer,
  };
  const contextValue = { inSplitButton: true, onChildButtonClick };

  return {
    showAdditionalButtons,
    showButtons,
    hideButtons,
    buttonNode,
    handleToggleButtonKeyDown,
    wrapperProps,
    contextValue,
  };
};

export default useChildButtons;
