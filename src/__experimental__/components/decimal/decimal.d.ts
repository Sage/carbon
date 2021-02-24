import * as React from "react";

export interface DecimalProps {
  /** The default value alignment on the input */
  align?: string;
  /** The decimal precision of the value in the input */
  precision?: number;
  /** The width of the input as a percentage */
  inputWidth?: number;
  /** If true, the component will be read-only */
  readOnly?: boolean;
  /** The default value of the input if it's meant to be used as an uncontrolled component */
  defaultValue?: string;
  /** The value of the input if it's used as a controlled component */
  value?: string;
  /** Handler for change event if input is meant to be used as a controlled component */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handler for blur event */
  onBlur?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handler for key press event */
  onKeyPress?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** The input name */
  name?: string;
  /** The input id */
  id?: string;
  /** Allow an empty value instead of defaulting to 0.00 */
  allowEmptyValue?: boolean;
  /** Flag to configure component as mandatory  */
  required?: boolean;
}

declare const Decimal: React.ComponentClass<DecimalProps>;

export default Decimal;
