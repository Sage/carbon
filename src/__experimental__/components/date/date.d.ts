import * as React from "react";
import { TextboxProps } from "../textbox/textbox";

export interface DateInputProps extends TextboxProps {
  /** Boolean to allow the input to have an empty value */
  allowEmptyValue?: boolean;
  /** Automatically focus on component mount */
  autoFocus?: boolean;
  /** Boolean to toggle where DatePicker is rendered in relation to the Date Input */
  disablePortal?: boolean;
  /** Minimum possible date YYYY-MM-DD */
  minDate?: string;
  /** Maximum possible date YYYY-MM-DD */
  maxDate?: string;
  /** Specify a callback triggered on blur */
  onBlur?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** Specify a callback triggered on change */
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** Specify a callback triggered on focus */
  onFocus?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** Name of the input */
  name?: string;
  /** The current date YYYY-MM-DD */
  value?: string;
  /** Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set */
  adaptiveSpacingBreakpoint?: number;
  /** Flag to configure component as mandatory */
  required?: boolean;
}

declare const DateInput: React.ComponentClass<DateInputProps>;

export default DateInput;
