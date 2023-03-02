import React, { useCallback, useState, useRef, useMemo } from "react";
import { WidthProps } from "styled-system";
import useClickAwayListener from "../../hooks/__internal__/useClickAwayListener";
import { SplitButtonProps } from "../split-button";
import {
  StyledMultiActionButton,
  StyledButtonChildrenContainer,
} from "./multi-action-button.style";
import Button from "../button";
import Events from "../../__internal__/utils/helpers/events";
import Popover from "../../__internal__/popover";
import {
  filterStyledSystemMarginProps,
  filterOutStyledSystemSpacingProps,
} from "../../style/utils";
import useMenuKeyboardNavigation from "../../hooks/__internal__/useMenuKeyboardNavigation";

export interface MultiActionButtonProps
  extends WidthProps,
    Omit<SplitButtonProps, "buttonType"> {
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
  width,
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
  const buttonChildrenRefs = useMemo(
    () => buttonChildren.map(() => React.createRef<HTMLButtonElement>()),
    [buttonChildren]
  );
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [minWidth, setMinWidth] = useState(0);

  const hideButtons = useCallback(() => {
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
        ref: buttonChildrenRefs[index],
        tabIndex: -1,
        onClick: (ev: React.MouseEvent<HTMLButtonElement>) => {
          if (child.props.onClick) child.props.onClick(ev);
          hideButtons();
          buttonRef.current?.focus();
        },
      };

      return React.cloneElement(child, props);
    });
  };

  const handleKeyDown = useMenuKeyboardNavigation(
    buttonRef,
    buttonChildrenRefs,
    hideButtons,
    showAdditionalButtons
  );

  const handleMainButtonKeyDown = (
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

      // see if setTimeout could be removed after we update react to v18 thanks to the concurrent mode
      setTimeout(() => {
        buttonChildrenRefs[0]?.current?.focus();
      }, 0);
    }
  };

  const mainButtonProps = {
    disabled,
    displayed: showAdditionalButtons,
    onTouchStart: showButtons,
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
        onKeyDown={handleKeyDown}
      >
        {childrenWithProps()}
      </StyledButtonChildrenContainer>
    </Popover>
  );

  const handleClick = useClickAwayListener(hideButtons);

  const hideButtonsIfTriggerNotFocused = useCallback(() => {
    if (buttonRef.current === document.activeElement) return;
    setShowAdditionalButtons(false);
  }, []);

  return (
    <StyledMultiActionButton
      aria-haspopup="true"
      onMouseLeave={hideButtonsIfTriggerNotFocused}
      onClick={handleClick}
      ref={ref}
      data-component="multi-action-button"
      data-element={dataElement}
      data-role={dataRole}
      displayed={showAdditionalButtons}
      width={width}
      {...filterStyledSystemMarginProps(rest)}
    >
      <Button
        aria-haspopup="true"
        aria-expanded={showAdditionalButtons}
        aria-label="Show more"
        data-element="toggle-button"
        key="toggle-button"
        {...mainButtonProps}
        ref={buttonRef}
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
