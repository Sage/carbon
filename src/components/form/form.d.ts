import * as React from "react";
import { FormFieldSpacing } from "../../utils/helpers/options-helper/options-helper";

export interface FormProps {
  /** Alignment of buttons */
  buttonAlignment?: "left" | "right";
  /** Child elements */
  children?: React.ReactNode;
  /** The total number of errors present in the form */
  errorCount?: number;
  /** Spacing between form fields, given number will be multiplied by base spacing unit (8) */
  fieldSpacing?: FormFieldSpacing;
  /** Additional buttons rendered on the left side of the save button */
  leftSideButtons?: React.ReactNode;
  /** Disable HTML5 validation */
  noValidate?: boolean;
  /** Callback passed to the form element */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => any;
  /** Additional buttons rendered on the right side of the save button */
  rightSideButtons?: React.ReactNode;
  /** Save button to be rendered */
  saveButton?: React.ReactNode;
  /** Enables the sticky footer. */
  stickyFooter?: boolean;
  /** The total number of warnings present in the form */
  warningCount?: number;
}

declare function Form(props: FormProps): JSX.Element;

export default Form;
