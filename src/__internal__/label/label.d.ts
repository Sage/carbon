import * as React from "react";

export interface LabelPropTypes {
  /** Label width */
  width?: number;
  /** Label alignment */
  align?: "left" | "right";
  /** Size of an input Label is used in */
  inputSize: "small" | "medium" | "large";
  /** Flag to indicate that component is used in a Form */
  childOfForm: boolean;
  /** When true, label is placed in line an input */
  inline?: boolean;
  /** If true, the component will be disabled */
  disabled: boolean;
  /** Flag to configure component as optional in Form */
  optional: boolean;
  /** The unique id of the label element */
  labelId?: string;
  /** The unique id of the Help component */
  helpId?: string;
  /** Children elements */
  children?: React.ReactNode;
  /** Status of error validations */
  error?: string | boolean;
  /** Status of warnings */
  warning?: string | boolean;
  /** Status of info */
  info?: string | boolean;
  /** A message that the Help component will display */
  help?: React.ReactNode;
  /** Icon type */
  helpIcon?: string;
  /** Overrides the default 'as' attribute of the Help component */
  helpTag?: string;
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
  /** Allows to override existing component styles */
  styleOverride?: () => object | object;
  /** Flag to configure component as mandatory */
  isRequired: boolean;
}

declare const Label: React.FunctionComponent<LabelPropTypes>;

export default Label;
