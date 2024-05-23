import React, { useContext, useRef } from "react";
import invariant from "invariant";
import {
  StyledButtonToggle,
  StyledButtonToggleWrapper,
  StyledButtonToggleProps,
} from "./button-toggle.style";
import guid from "../../__internal__/utils/helpers/guid";
import { ButtonToggleGroupContext } from "./button-toggle-group/button-toggle-group.component";
import ButtonToggleIcon from "./button-toggle-icon.component";

import Logger from "../../__internal__/utils/logger";
import { InputGroupContext } from "../../__internal__/input-behaviour";

let deprecateNameWarnTriggered = false;
let deprecateUncontrolledWarnTriggered = false;
let deprecateGroupedWarnTriggered = false;

export interface ButtonToggleProps extends Partial<StyledButtonToggleProps> {
  /** Prop to specify the aria-label of the component */
  "aria-label"?: string;
  /** Prop to specify the aria-labelledby property of the component */
  "aria-labelledby"?: string;
  /** Text to display for the button. */
  children?: React.ReactNode;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** DEPRECATED: Remove spacing from between buttons. */
  grouped?: boolean;
  /** An optional string by which to identify the button in an onChange handler on the parent ButtonToggleGroup. */
  name?: string;
  /** Callback triggered by blur event on the button. */
  onBlur?: (ev: React.FocusEvent<HTMLButtonElement>) => void;
  /** Callback triggered by focus event on the button. */
  onFocus?: (ev: React.FocusEvent<HTMLButtonElement>) => void;
  /** Callback triggered by click event on the button. */
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  /** Set the pressed state of the toggle button */
  pressed?: boolean;
  /** An optional string by which to identify the button in either an onClick handler, or an onChange handler on the parent ButtonToggleGroup. */
  value?: string;
}

export const ButtonToggle = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  buttonIcon,
  buttonIconSize = "small",
  children,
  "data-component": dataComponent,
  "data-element": dataElement,
  "data-role": dataRole,
  disabled,
  grouped,
  name,
  onBlur,
  onFocus,
  onClick,
  pressed,
  size = "medium",
  value,
}: ButtonToggleProps) => {
  invariant(
    !!(children || buttonIcon),
    "Either prop `buttonIcon` must be defined, or this node must have children"
  );

  if (name && !deprecateNameWarnTriggered) {
    deprecateNameWarnTriggered = true;
    Logger.deprecate(
      `The \`name\` prop in \`ButtonToggle\` component is deprecated and will soon be removed. It does not provide any functionality
      since the component can no longer be used in an uncontrolled fashion.`
    );
  }

  if (grouped && !deprecateGroupedWarnTriggered) {
    deprecateGroupedWarnTriggered = true;
    Logger.deprecate(
      "The `grouped` prop in `ButtonToggle` component is deprecated and will soon be removed. Spacing between buttons is no longer no removed."
    );
  }

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const {
    onMouseEnter,
    onMouseLeave,
    onBlur: inputGroupOnBlur,
    onFocus: inputGroupOnFocus,
  } = useContext(InputGroupContext);
  const {
    onButtonClick,
    handleKeyDown,
    pressedButtonValue,
    onChange,
    name: groupName,
    allowDeselect,
    isInGroup,
    isDisabled,
    firstButton,
    childButtonCallbackRef,
    hintTextId,
  } = useContext(ButtonToggleGroupContext);
  const callbackRef = (element: HTMLButtonElement | null) => {
    buttonRef.current = element;
    if (childButtonCallbackRef) {
      childButtonCallbackRef(element);
    }
  };

  const inputGuid = useRef(guid());

  function handleClick(ev: React.MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      onClick(ev);
    }
    if (onChange) {
      let newValue = value;
      if (allowDeselect && pressedButtonValue === value) {
        newValue = undefined;
      }
      onChange(ev, newValue, groupName || name);
    }
    if (value) {
      onButtonClick(value);
    }
  }

  if (!deprecateUncontrolledWarnTriggered && !onChange) {
    deprecateUncontrolledWarnTriggered = true;
    Logger.deprecate(
      "Uncontrolled behaviour in `Button Toggle` is deprecated and support will soon be removed. Please make sure all your inputs are controlled."
    );
  }

  function handleFocus(ev: React.FocusEvent<HTMLButtonElement>) {
    if (onFocus) {
      onFocus(ev);
    }
    if (inputGroupOnFocus) {
      inputGroupOnFocus();
    }
  }

  function handleBlur(ev: React.FocusEvent<HTMLButtonElement>) {
    if (onBlur) {
      onBlur(ev);
    }
    if (inputGroupOnBlur) {
      inputGroupOnBlur();
    }
  }

  const isPressed = isInGroup ? pressedButtonValue === value : pressed;
  const isFirstButton = buttonRef.current === firstButton;

  // if we're in a ButtonToggleGroup, only one button should be tabbable - the pressed button if there is one, or
  // the first one if not
  const tabbable =
    !isInGroup || isPressed || (!pressedButtonValue && isFirstButton);

  return (
    <StyledButtonToggleWrapper
      data-component={dataComponent || "button-toggle"}
      data-element={dataElement}
      data-role={dataRole}
      grouped={grouped}
    >
      <StyledButtonToggle
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={hintTextId || undefined}
        aria-pressed={!!isPressed}
        buttonIcon={buttonIcon}
        buttonIconSize={buttonIconSize}
        data-element="button-toggle-button"
        disabled={disabled || isDisabled}
        id={inputGuid.current}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        size={size}
        grouped={grouped}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        // In Safari non-text input elements do not gain focus on click. To get around this, we have to apply a tab-index of 0 here.
        // This is to allow the ButtonToggle component to be focused when it is the first tabbable element.
        {...(tabbable ? { tabIndex: 0 } : { tabIndex: -1 })}
        allowDeselect={allowDeselect}
        ref={callbackRef}
      >
        {buttonIcon && (
          <ButtonToggleIcon
            buttonIcon={buttonIcon}
            buttonIconSize={buttonIconSize}
            disabled={disabled}
            hasContent={!!children}
          />
        )}
        {children}
      </StyledButtonToggle>
    </StyledButtonToggleWrapper>
  );
};

ButtonToggle.displayName = "ButtonToggle";
export default ButtonToggle;
