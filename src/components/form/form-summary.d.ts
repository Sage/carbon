import * as React from "react";

export interface FormSummaryProps {
  /** Child elements */
  children?: React.ReactNode;
  /** The total number of errors present in the form */
  errorCount?: number;
  /** The total number of warnings present in the form */
  warningCount?: number;
}

declare function FormSummary(props: FormSummaryProps): JSX.Element;

export default FormSummary;
