import React, { useRef } from "react";
import invariant from "invariant";
import StyledButtonToggle from "./button-toggle.style";
import guid from "../../__internal__/utils/helpers/guid";
import { useButtonToggleGroupContext } from "./button-toggle-group/__internal__/button-toggle-group.context";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import Icon, { IconType } from "../icon";
import isIconOnly from "../button/__next__/__internal__/utils/is-icon-only";

export interface ButtonToggleProps extends TagProps {
  /** Prop to specify the aria-label of the component */
  "aria-label"?: string;
  /** Prop to specify the aria-labelledby property of the component */
  "aria-labelledby"?: string;
  /** Content to display within the button. */
  children?: React.ReactNode;
  /** Callback triggered by blur event on the button. */
  onBlur?: (ev: React.FocusEvent<HTMLButtonElement>) => void;
  /** Callback triggered by focus event on the button. */
  onFocus?: (ev: React.FocusEvent<HTMLButtonElement>) => void;
  /** Callback triggered by click event on the button. */
  onClick?: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Set the pressed state of the toggle button.
   * @deprecated Please control the state of selected buttons through ButtonToggleGroup.
   * */
  pressed?: boolean;
  /** An optional string by which to identify the button in d an onChange handler on the parent ButtonToggleGroup. */
  value?: string;
  /** Icon rendered within the button. Will not be rendered if size is small. */
  buttonIcon?: IconType;
  /**
   * Sets the size of the buttonIcon
   * @deprecated `buttonIconSize` is no longer supported.
   */
  buttonIconSize?: "small" | "large";
  /** Disable the ButtonToggle. */
  disabled?: boolean;
  /**
   * ButtonToggle size.
   * @deprecated Please set the size of the component through the ButtonToggleGroup `size` prop.
   */
  size?: "small" | "medium" | "large";
  /** Allow a selected button to be deselected. */
  allowDeselect?: boolean;
  /** @private @internal @ignore */
  "data-component"?: string;
}

export const ButtonToggle = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  buttonIcon,
  buttonIconSize,
  children,
  disabled,
  onBlur,
  onFocus,
  onClick,
  pressed,
  size,
  value,
  "data-component": dataComponent,
  ...rest
}: ButtonToggleProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const inputGuid = useRef(guid());

  const {
    handleKeyDown,
    pressedButtonValue,
    onChange,
    allowDeselect,
    isDisabled,
    firstButton,
    childButtonCallbackRef,
    hintTextId,
    size: contextSize,
    fullWidth,
  } = useButtonToggleGroupContext();

  const callbackRef = (element: HTMLButtonElement | null) => {
    buttonRef.current = element;
    childButtonCallbackRef?.(element);
  };

  function handleClick(ev: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(ev);

    const newValue =
      allowDeselect && pressedButtonValue === value ? undefined : value;
    onChange?.(ev, newValue);
  }

  const isPressed = pressedButtonValue === value || pressed;
  const isFirstButton = buttonRef.current === firstButton;
  const tabbable = isPressed || (!pressedButtonValue && isFirstButton);

  const actualSize = size || contextSize;
  const iconOnly = (buttonIcon && !children) || isIconOnly(children);

  invariant(
    !!(children || buttonIcon),
    "Either prop `buttonIcon` must be defined, or this node must have children",
  );

  invariant(
    !(iconOnly && actualSize === "small"),
    "Cannot render an icon-only button in small size.",
  );

  return (
    <StyledButtonToggle
      className="button-toggle"
      data-button-toggle-internal
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={hintTextId}
      aria-pressed={!!isPressed}
      disabled={disabled || isDisabled}
      id={inputGuid.current}
      $size={actualSize}
      $active={!!isPressed}
      $iconOnly={iconOnly}
      $fullWidth={fullWidth}
      value={value}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...(tabbable ? { tabIndex: 0 } : { tabIndex: -1 })}
      ref={callbackRef}
      {...rest}
      {...tagComponent(dataComponent || "button-toggle", { ...rest })}
    >
      {buttonIcon && actualSize !== "small" && (
        <Icon aria-hidden type={buttonIcon} />
      )}
      {children}
    </StyledButtonToggle>
  );
};

ButtonToggle.displayName = "ButtonToggle";
export default ButtonToggle;
