import * as React from "react";
import { MarginProps } from "styled-system";
import { ValidationPropTypes } from "../validations";

export interface CommonFormFieldPropTypes
  extends MarginProps,
    ValidationPropTypes {
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  /** The unique id of the Help component */
  helpId?: string;
  /** The unique id of the FieldHelp component */
  fieldHelpId?: string;
  /** Overrides the default tabindex of the Help component */
  helpTabIndex?: number | string;
  /** Label content */
  label?: React.ReactNode;
  /** Text alignment of the label */
  labelAlign?: "left" | "right";
  /** A message that the Help component will display */
  labelHelp?: React.ReactNode;
  /** Help Icon type */
  labelHelpIcon?: string;
  /** The unique id of the label element */
  labelId?: string;
  /** When true label is inline */
  labelInline?: boolean;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Label width */
  labelWidth?: number;
  /** If true the label switches position with the input */
  reverse?: boolean;
}

export interface FormFieldPropTypes extends CommonFormFieldPropTypes {
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** Content to be rendered inside the FormField */
  children?: React.ReactNode;
  /**
   * If true, the FieldHelp will be displayed inline
   * To be used with labelInline prop set to true
   */
  fieldHelpInline?: boolean;
  /** Id of the element a label should be bound to */
  id: string;
  /** [Legacy] Flag to configure component as optional in Form */
  isOptional?: boolean;
  /** Flag to configure component as mandatory */
  isRequired?: boolean;
  /** Whether to show the validation icon */
  useValidationIcon?: boolean;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-component"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-element"?: string;
  /** Identifier used for testing purposes, applied to the root element of the component. */
  "data-role"?: string;
}

declare function FormField(props: FormFieldPropTypes): JSX.Element;

export default FormField;
