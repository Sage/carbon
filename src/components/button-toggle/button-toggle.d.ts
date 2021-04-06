import * as React from "react";
import * as OptionsHelper from "../../utils/helpers/options-helper/options-helper";

export interface ButtonToggleProps {
  /** buttonIcon to render. */
  buttonIcon?: string;
  /** Sets the size of the buttonIcon (eg. large) */
  buttonIconSize?: OptionsHelper.SizesType;
  /** Set the checked value of the radio button */
  checked?: boolean;
  /** A required prop. This is the button text. */
  children: React.ReactNode;
  /** Set the default value of the Group if component is meant to be used as uncontrolled. */
  defaultChecked?: boolean;
  /** Disable all user interaction. */
  disabled?: boolean;
  /** Remove spacing from between buttons. */
  grouped?: boolean;
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

declare function ButtonToggle(props: ButtonToggleProps): JSX.Element;

export default ButtonToggle;
