import React, { useContext, useRef } from "react";
import invariant from "invariant";
import {
  StyledButtonToggle,
  StyledButtonToggleLabel,
  StyledButtonToggleContentWrapper,
  StyledButtonToggleLabelProps,
} from "./button-toggle.style";
import guid from "../../__internal__/utils/helpers/guid";
import ButtonToggleIcon from "./button-toggle-icon.component";
import ButtonToggleInput, {
  ButtonToggleInputProps,
} from "./button-toggle-input.component";

import { InputGroupContext } from "../../__internal__/input-behaviour";

export interface ButtonToggleProps
  extends ButtonToggleInputProps,
    Partial<StyledButtonToggleLabelProps> {
  /** Text to display for the button. */
  children?: React.ReactNode;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
  /** Set the default value of the Group if component is meant to be used as uncontrolled. */
  defaultChecked?: boolean;
  /** Remove spacing from between buttons. */
  grouped?: boolean;
  /** Callback triggered by click event on the input. */
  onClick?: (ev: React.MouseEvent<HTMLInputElement>) => void;
}

export const ButtonToggle = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  buttonIcon,
  buttonIconSize = "small",
  checked,
  children,
  "data-component": dataComponent,
  "data-element": dataElement,
  "data-role": dataRole,
  disabled,
  grouped,
  name,
  onBlur,
  onChange,
  onFocus,
  size = "medium",
  value,
}: ButtonToggleProps) => {
  invariant(
    !!(children || buttonIcon),
    "Either prop `buttonIcon` must be defined, or this node must have children"
  );

  const { onMouseEnter, onMouseLeave } = useContext(InputGroupContext);

  const inputGuid = guid();
  const inputRef = useRef<HTMLInputElement>(null);
  let icon;

  if (buttonIcon) {
    icon = (
      <ButtonToggleIcon
        buttonIcon={buttonIcon}
        buttonIconSize={buttonIconSize}
        disabled={disabled}
        hasContent={!!children}
      />
    );
  }

  function handleClick() {
    inputRef.current?.focus();
  }

  return (
    <StyledButtonToggle
      data-component={dataComponent || "button-toggle"}
      data-element={dataElement}
      data-role={dataRole}
      grouped={grouped}
      onClick={handleClick}
    >
      <ButtonToggleInput
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        data-element="button-toggle-input"
        name={name}
        checked={checked}
        disabled={disabled}
        guid={inputGuid}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
      />
      <StyledButtonToggleLabel
        buttonIcon={buttonIcon}
        buttonIconSize={buttonIconSize}
        disabled={disabled}
        htmlFor={inputGuid}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        size={size}
      >
        <StyledButtonToggleContentWrapper>
          {icon}
          {children}
        </StyledButtonToggleContentWrapper>
      </StyledButtonToggleLabel>
    </StyledButtonToggle>
  );
};

ButtonToggle.displayName = "ButtonToggle";
export default ButtonToggle;
