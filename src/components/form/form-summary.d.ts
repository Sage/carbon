import * as React from "react";

export interface FormSummaryProps {
  /** Child elements */
  children?: React.ReactNode;

  /** The total number of errors present in the form */
  errorCount?: number;

  /** The total number of warnings present in the form */
  warningCount?: number;
}

declare const FormSummary: React.FunctionComponent<FormSummaryProps>;
export default FormSummary;
