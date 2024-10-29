import { useState, useRef, useCallback } from "react";
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
    ev: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    const isToggleKey =
      Events.isEnterKey(ev) ||
      Events.isSpaceKey(ev) ||
      Events.isDownKey(ev) ||
      Events.isUpKey(ev) ||
      (showAdditionalButtons && Events.isTabKey(ev));

    if (isToggleKey) {
      ev.preventDefault();

      if (!showAdditionalButtons) {
        showButtons();
      }

      setTimeout(() => {
        getButtonChildren()?.[0]?.focus();
      });
    }
  };

  const handleKeyDown = useMenuKeyboardNavigation(
    toggleButtonRef,
    getButtonChildren,
    hideButtons,
    showAdditionalButtons,
  );

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
