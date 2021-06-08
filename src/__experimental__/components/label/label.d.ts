import * as React from "react";
import { ValidationPropTypes } from "../../../components/validations";

export interface LabelPropTypes extends ValidationPropTypes {
  /** Text alignment of the label */
  align?: "left" | "right";
  /** Flag to indicate that component is used in a Form */
  childOfForm?: boolean;
  /** Label content */
  children?: React.ReactNode;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** A string that represents the ID of another form element */
  htmlFor?: string;
  /** When true label is inline */
  inline?: boolean;
  /** Flag to configure component as mandatory */
  isRequired?: boolean;
  /** The unique id of the label element */
  labelId?: string;
  /** Flag to configure component as optional in Form */
  optional?: boolean;
  /** A message that the Help component will display */
  help?: React.ReactNode;
  /** Help Icon type */
  helpIcon?: string;
  /** The unique id of the Help component */
  helpId?: string;
  /** Overrides the default 'as' attribute of the Help component */
  helpTag?: string;
  /** Overrides the default tabindex of the Help component */
  helpTabIndex?: number | string;
  /** Whether to show the validation icon */
  useValidationIcon?: boolean;
  /** Padding right, integer multiplied by base spacing constant (8) */
  pr?: 1 | 2;
  /** Padding left, integer multiplied by base spacing constant (8) */
  pl?: 1 | 2;
  /** Label width */
  width?: number;
}

declare function Label(props: LabelPropTypes): JSX.Element;

export default Label;
