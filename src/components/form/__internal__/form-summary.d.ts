import * as React from "react";

export interface FormSummaryProps {
  /** Child elements */
  children?: React.ReactNode;
  /** The total number of errors present in the form */
  errors?: number;
  /** The total number of warnings present in the form */
  warnings?: number;
  /** Applies full width styling */
  fullWidth?: boolean;
}

declare function FormSummary(props: FormSummaryProps): JSX.Element;

export default FormSummary;
