import * as React from "react";

import { ValidationPropTypes } from "../validations";
import { CommonHiddenCheckableInputProps } from "./hidden-checkable-input";

export interface CommonCheckableInputProps
  extends ValidationPropTypes,
    CommonHiddenCheckableInputProps {
  /** If true, the component will be disabled */
  disabled?: boolean;
  /** Help content to be displayed under an input */
  fieldHelp?: React.ReactNode;
  /**
   * If true, the FieldHelp will be displayed inline
   * To be used with labelInline prop set to true
   */
  fieldHelpInline?: boolean;
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  id?: string;
  /** Sets percentage-based input width */
  inputWidth?: number | string;
  /** Label content */
  label?: React.ReactNode;
  /** The content for the help tooltip, to appear next to the Label */
  labelHelp?: string | React.ReactNode;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Label width */
  labelWidth?: number;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** If true the label switches position with the input */
  reverse?: boolean;
  /** Size of the component */
  size?: "small" | "large";
  /** The id of the element that labels the input */
  ariaLabelledBy?: string;
}

export interface CheckableInputProps extends CommonCheckableInputProps {
  /** Used to set the visible aspect of the input (i.e. the checkbox sprite, input slider etc) */
  children?: React.ReactNode;
  /** HTML type attribute of the input */
  type: string;
  /** Value passed to the input */
  value?: string;
  /** Text alignment of the label */
  labelAlign?: "left" | "right";
  /** When true label is inline */
  labelInline?: boolean;
}

declare function CheckableInput(props: CheckableInputProps): JSX.Element;

export default CheckableInput;
