import * as React from "react";

export interface FieldHelpProps {
  /** Child elements */
  children?: React.ReactNode;
  /** When true, label is placed in line an input */
  labelInline?: boolean;
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth?: number;
}

declare function FieldHelp(props: FieldHelpProps): JSX.Element;

export default FieldHelp;
