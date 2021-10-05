import * as React from "react";
import { SpaceProps } from "styled-system";

export interface FormProps extends SpaceProps {
  /** Alignment of buttons */
  buttonAlignment?: "left" | "right";
  /** Child elements */
  children?: React.ReactNode;
  /** The total number of errors present in the form */
  errorCount?: number;
  /** Spacing between form fields, given number will be multiplied by base spacing unit (8) */
  fieldSpacing?: 0 | 1 | 2 | 3 | 4 | 5 | 7;
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
  /** Height of the form (any valid CSS value) */
  height?: string;
}

declare function Form(props: FormProps): JSX.Element;

export default Form;
