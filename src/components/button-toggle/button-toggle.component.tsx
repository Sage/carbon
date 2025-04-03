import React, { useRef } from "react";
import invariant from "invariant";
import {
  StyledButtonToggle,
  StyledButtonToggleWrapper,
  StyledButtonToggleProps,
} from "./button-toggle.style";
import guid from "../../__internal__/utils/helpers/guid";
import { useButtonToggleGroup } from "./button-toggle-group/__internal__/button-toggle-group.context";
import ButtonToggleIcon from "./button-toggle-icon.component";
import { TagProps } from "../../__internal__/utils/helpers/tags";
import Logger from "../../__internal__/utils/logger";

let deprecatePressedWarnTriggered = false;

export interface ButtonToggleProps
  extends Partial<StyledButtonToggleProps>,
    TagProps {
  /** Prop to specify the aria-label of the component */
  "aria-label"?: string;
  /** Prop to specify the aria-labelledby property of the component */
  "aria-labelledby"?: string;
  /** Text to display for the button. */
  children?: React.ReactNode;
  /** Callback triggered by blur event on the button. */
  onBlur?: (ev: React.FocusEvent<HTMLButtonElement>) => void;
  /** Callback triggered by focus event on the button. */
  onFocus?: (ev: React.FocusEvent<HTMLButtonElement>) => void;
  /** Callback triggered by click event on the button. */
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Set the pressed state of the toggle button
   * @deprecated
   * */
  pressed?: boolean;
  /** An optional string by which to identify the button in either an onClick handler, or an onChange handler on the parent ButtonToggleGroup. */
  value?: string;
  /** @private @internal @ignore */
  "data-component"?: string;
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
  onBlur,
  onFocus,
  onClick,
  pressed,
  size = "medium",
  value,
}: ButtonToggleProps) => {
  invariant(
    !!(children || buttonIcon),
    "Either prop `buttonIcon` must be defined, or this node must have children",
  );

  if (pressed && !deprecatePressedWarnTriggered) {
    Logger.deprecate("The `pressed` prop is deprecated.");
    deprecatePressedWarnTriggered = true;
  }

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const context = useButtonToggleGroup(
    "ButtonToggle must be used within a ButtonToggleGroup component. This warning will become a runtime error in a future release.",
  );
  const isInGroup = context !== null;
  const {
    onButtonClick,
    handleKeyDown,
    pressedButtonValue,
    onChange,
    allowDeselect,
    isDisabled,
    firstButton,
    childButtonCallbackRef,
    hintTextId,
  } =
    context || /* istanbul ignore next: ButtonToggle should be in a group */ {};

  const callbackRef = (element: HTMLButtonElement | null) => {
    buttonRef.current = element;
    childButtonCallbackRef?.(element);
  };

  const inputGuid = useRef(guid());

  function handleClick(ev: React.MouseEvent<HTMLButtonElement>) {
    if (onClick) {
      onClick(ev);
    }

    const newValue =
      allowDeselect && pressedButtonValue && pressedButtonValue === value
        ? undefined
        : value;
    onChange?.(ev, newValue);

    if (value) {
      onButtonClick?.(value);
    }
  }

  const isPressed = isInGroup
    ? pressedButtonValue && pressedButtonValue === value
    : /* istanbul ignore next: ButtonToggle should be in a group */ pressed;
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
        size={size}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
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
