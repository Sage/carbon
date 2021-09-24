import * as React from "react";
import { TextboxProps } from "../textbox/textbox";

export interface DateInputProps extends TextboxProps {
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
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
  /** Name of the input */
  name?: string;
  /** Specify a callback triggered on blur */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on focus */
  onFocus?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** The current date YYYY-MM-DD */
  value?: string;
  /** Overrides the default tooltip position */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

declare class DateInput extends React.Component<DateInputProps> {}

export default DateInput;
