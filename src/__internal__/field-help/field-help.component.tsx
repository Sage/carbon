import React from "react";
import FieldHelpStyle from "./field-help.style";

export interface FieldHelpProps {
  /** Child elements */
  children?: React.ReactNode;
  /** When true, label is placed in line an input */
  labelInline?: boolean;
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth?: number;
  /** The unique id of the FieldHelp component */
  id?: string;
  /** use of any to support rest props */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const FieldHelp = ({
  children,
  labelInline,
  labelWidth = 30,
  ...rest
}: FieldHelpProps) => (
  <FieldHelpStyle
    data-element="help"
    labelInline={labelInline}
    labelWidth={labelWidth}
    {...rest}
  >
    {children}
  </FieldHelpStyle>
);

export default FieldHelp;
