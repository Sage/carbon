import * as React from "react";
import { ValidationPropTypes } from "../validations";

export interface LabelPropTypes extends ValidationPropTypes {
  /** Label width */
  width?: number;
  /** Label alignment */
  align?: "left" | "right";
  /** When true, label is placed in line an input */
  inline?: boolean;
  /** Flag to configure component as mandatory */
  isRequired?: boolean;
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** Flag to configure component as optional in Form */
  optional?: boolean;
  /** The unique id of the label element */
  labelId?: string;
  /** The unique id of the Help component tooltip, used for accessibility */
  tooltipId?: string;
  /** Children elements */
  children?: React.ReactNode;
  /** A message that the Help component will display */
  help?: React.ReactNode;
  /** Icon type */
  helpIcon?: string;
  /** Overrides the default tabindex of the Help component */
  helpTabIndex?: string;
  /** Whether to show the validation icon */
  useValidationIcon?: boolean;
  /** A string that represents the ID of another form element */
  htmlFor: string;
  /** Padding right, integer multiplied by base spacing constant (8) */
  pr?: 1 | 2;
  /** Padding left, integer multiplied by base spacing constant (8) */
  pl?: 1 | 2;
}

declare function Label(props: LabelPropTypes): JSX.Element;

export default Label;
