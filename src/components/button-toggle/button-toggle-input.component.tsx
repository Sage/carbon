import React, { useContext } from "react";
import { StyledButtonToggleInput } from "./button-toggle.style";

import { InputGroupContext } from "../../__internal__/input-behaviour";

export interface ButtonToggleInputProps {
  /** Prop to specify the aria-label of the component */
  "aria-label"?: string;
  /** Prop to specify the aria-labelledby property of the component */
  "aria-labelledby"?: string;
  /** Set the checked value of the radio button */
  checked?: boolean;
  /** Disable all user interaction. */
  disabled?: boolean;
  /** Unique ID attribute for input */
  guid?: string;
  /** Name used on the hidden radio button. */
  name?: string;
  /** Callback triggered by blur event on the input. */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback triggered by change event on the input. */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Callback triggered by focus event on the input. */
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Value for the input */
  value?: string;
}

const ButtonToggleInput = React.forwardRef<
  HTMLInputElement,
  ButtonToggleInputProps
>((props: ButtonToggleInputProps, forwardRef) => {
  const { onFocus, onBlur } = useContext(InputGroupContext);

  const handleBlur = (ev: React.FocusEvent<HTMLInputElement>) => {
    if (props.onBlur) {
      props.onBlur(ev);
    }
    if (onBlur) onBlur();
  };

  const handleFocus = (ev: React.FocusEvent<HTMLInputElement>) => {
    if (props.onFocus) {
      props.onFocus(ev);
    }
    if (onFocus) onFocus();
  };

  return (
    <StyledButtonToggleInput
      {...props}
      type="radio"
      id={props.guid}
      onBlur={handleBlur}
      onFocus={handleFocus}
      ref={forwardRef}
    />
  );
});

ButtonToggleInput.displayName = "ButtonToggleInput";

export default ButtonToggleInput;
