import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";

import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import { SplitButtonProps } from "../split-button";
import {
  StyledMultiActionButton,
  StyledButtonChildrenContainer,
} from "./multi-action-button.style";
import Button, { ButtonWithForwardRef } from "../button";
import Events from "../../__internal__/utils/helpers/events";
import Popover from "../../__internal__/popover";
import {
  filterStyledSystemMarginProps,
  filterOutStyledSystemSpacingProps,
} from "../../style/utils";
import { defaultFocusableSelectors } from "../../__internal__/focus-trap/focus-trap-utils";

export interface MultiActionButtonProps
  extends Omit<SplitButtonProps, "buttonType"> {
  /** Button type: "primary" | "secondary" | "tertiary" */
  buttonType?: "primary" | "secondary" | "tertiary";
  /** Second text child, renders under main text, only when size is "large" */
  subtext?: string;
}

export const MultiActionButton = ({
  align = "left",
  disabled,
  buttonType,
  size,
  children,
  text,
  subtext,
  "data-element": dataElement,
  "data-role": dataRole,
  ...rest
}: MultiActionButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonContainer = useRef<HTMLDivElement>(null);
  const buttonChildren = useMemo(() => React.Children.toArray(children), [
    children,
  ]);
  const additionalButtons = useRef(
    buttonChildren.map(() => React.createRef<HTMLButtonElement>())
  );
  const listening = useRef(false);
  const isMainButtonFocused = useRef(false);
  const isFocusedAfterClosing = useRef(false);
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [minWidth, setMinWidth] = useState(0);

  const hideButtons = useCallback(() => {
    if (isMainButtonFocused.current) return;
    setShowAdditionalButtons(false);
  }, []);

  const showButtons = () => {
    setShowAdditionalButtons(true);

    /* istanbul ignore else */
    if (ref.current) {
      setMinWidth(ref.current.getBoundingClientRect().width);
    }
  };

  const childrenWithProps = () => {
    return buttonChildren.map((child, index) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      const props = {
        key: index.toString(),
        role: "menuitem",
        ref: additionalButtons.current[index],
        tabIndex: -1,
        onClick: (ev: React.MouseEvent<HTMLButtonElement>) => {
          if (child.props.onClick) child.props.onClick(ev);
          isMainButtonFocused.current = false;
          hideButtons();
          isFocusedAfterClosing.current = true;
          buttonRef.current?.focus();
        },
      };

      if (child.type === Button) {
        return <ButtonWithForwardRef {...child.props} {...props} />;
      }

      return React.cloneElement(child, props);
    });
  };

  const handleKeyDown = useCallback(
    (ev) => {
      const currentIndex = additionalButtons.current.findIndex(
        (node) => node.current === document.activeElement
      );
      let nextIndex = -1;

      if (Events.isUpKey(ev)) {
        nextIndex =
          currentIndex > 0 ? currentIndex - 1 : buttonChildren.length - 1;
        ev.preventDefault();
      }

      if (Events.isDownKey(ev)) {
        nextIndex =
          currentIndex < buttonChildren.length - 1 ? currentIndex + 1 : 0;
        ev.preventDefault();
      }

      if (Events.isTabKey(ev)) {
        const elements = Array.from(
          document.querySelectorAll(
            defaultFocusableSelectors
          ) as NodeListOf<HTMLElement>
        ).filter((el) => Number(el.tabIndex) !== -1);

        const indexOf = elements.indexOf(
          buttonRef.current as HTMLButtonElement
        );

        elements[indexOf]?.focus();

        // timeout enforces that the "hideButtons" method will be run after browser focuses on the next element
        setTimeout(hideButtons, 0);
      }

      if (nextIndex > -1) {
        additionalButtons.current[nextIndex].current?.focus();
      }
    },
    [buttonChildren, hideButtons]
  );

  const addListeners = useCallback(() => {
    /* istanbul ignore else */
    if (!listening.current) {
      document.addEventListener("keydown", handleKeyDown);
      listening.current = true;
    }
  }, [handleKeyDown]);

  const removeListeners = useCallback(() => {
    /* istanbul ignore else */
    if (listening.current) {
      document.removeEventListener("keydown", handleKeyDown);
      listening.current = false;
    }
  }, [handleKeyDown]);

  useEffect(() => {
    if (showAdditionalButtons) {
      addListeners();
    }

    return () => {
      removeListeners();
    };
  }, [showAdditionalButtons, addListeners, removeListeners]);

  const handleMainButtonKeyDown = (
    ev: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (
      Events.isEnterKey(ev) ||
      Events.isSpaceKey(ev) ||
      Events.isDownKey(ev)
    ) {
      ev.preventDefault();

      if (!showAdditionalButtons) {
        showButtons();
      }

      // see if setTimeout could be removed after we update react to v18 thanks to the concurrent mode
      setTimeout(() => {
        additionalButtons.current[0]?.current?.focus();
      }, 0);
    }
  };

  const focusMainButton = () => {
    isMainButtonFocused.current = true;
    if (isFocusedAfterClosing.current) {
      isFocusedAfterClosing.current = false;
      return;
    }

    showButtons();
  };

  const blurMainButton = () => {
    isMainButtonFocused.current = false;
  };

  const mainButtonProps = {
    disabled,
    displayed: showAdditionalButtons,
    onTouchStart: showButtons,
    onFocus: focusMainButton,
    onBlur: blurMainButton,
    onKeyDown: handleMainButtonKeyDown,
    buttonType,
    size,
    subtext,
    ...(!disabled && { onMouseEnter: showButtons }),
    ...filterOutStyledSystemSpacingProps(rest),
  };

  const renderAdditionalButtons = () => (
    <Popover placement="bottom-end" reference={ref}>
      <StyledButtonChildrenContainer
        role="menu"
        aria-label={text}
        data-element="additional-buttons"
        align={align}
        minWidth={minWidth}
        ref={buttonContainer}
      >
        {childrenWithProps()}
      </StyledButtonChildrenContainer>
    </Popover>
  );

  useClickAwayListener([ref], hideButtons);

  return (
    <StyledMultiActionButton
      aria-haspopup="true"
      onMouseLeave={hideButtons}
      ref={ref}
      data-component="multi-action-button"
      data-element={dataElement}
      data-role={dataRole}
      displayed={showAdditionalButtons}
      {...filterStyledSystemMarginProps(rest)}
    >
      <Button
        aria-haspopup="true"
        aria-expanded={showAdditionalButtons}
        aria-label="Show more"
        data-element="toggle-button"
        key="toggle-button"
        {...mainButtonProps}
        forwardRef={buttonRef}
        iconPosition="after"
        iconType="dropdown"
      >
        {text}
      </Button>
      {showAdditionalButtons && renderAdditionalButtons()}
    </StyledMultiActionButton>
  );
};

export default MultiActionButton;
