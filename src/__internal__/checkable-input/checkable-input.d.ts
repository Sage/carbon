import * as React from "react";
import { ValidationPropTypes } from "../../components/validations";

export interface CommonCheckableInputProps extends ValidationPropTypes {
  /** Set the value of the CheckableInput */
  checked?: boolean;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  /**
   * If true, the FieldHelp will be displayed inline
   * To be used with labelInline prop set to true
   */
  fieldHelpInline?: boolean;
  /** Sets percentage-based input width */
  inputWidth?: number | string;
  /** Label content */
  label?: React.ReactNode;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Label width */
  labelWidth?: number;
  /** The name of the the input */
  name?: string;
  /** Specify a callback triggered on blur */
  onBlur?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Specify a callback triggered on change */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** If true the label switches position with the input */
  reverse?: boolean;
}

export interface CheckableInputProps extends CommonCheckableInputProps {
  /** Used to set the visible aspect of the input (i.e. the checkbox sprite, input slider etc) */
  children?: React.ReactNode;
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  inputId?: string;
  /** HTML type attribute of the input */
  inputType?: string;
  /** Text alignment of the label */
  labelAlign?: "left" | "right";
  /** A message that the Help component will display */
  labelHelp?: React.ReactNode;
  /** When true label is inline */
  labelInline?: boolean;
  /** Margin bottom, given number will be multiplied by base spacing unit (8) */
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 7;
  /** Margin left, any valid CSS value */
  ml?: string;
}

declare class CheckableInput extends React.Component<CheckableInputProps & React.HTMLProps<HTMLInputElement>> {}

export default CheckableInput;
