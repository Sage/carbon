import * as React from "react";
import { CommonTextboxProps } from "../textbox";

export interface DecimalProps extends CommonTextboxProps {
  /** Text alignment of the label */
  align?: "left" | "right";
  /** Allow an empty value instead of defaulting to 0.00 */
  allowEmptyValue?: boolean;
  /** The default value of the input if it's meant to be used as an uncontrolled component */
  defaultValue?: string;
  /** The input id */
  id?: string;
  /** The width of the input as a percentage */
  inputWidth?: number;
  /** Handler for change event if input is meant to be used as a controlled component */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handler for blur event */
  onBlur?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handler for key press event */
  onKeyPress?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** The input name */
  name?: string;
  /** The decimal precision of the value in the input */
  precision?: number;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** The value of the input if it's used as a controlled component */
  value?: string;
}

declare const Decimal: React.ComponentClass<DecimalProps>;

export default Decimal;
