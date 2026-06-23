import React from "react";
import StyledFieldHelp, { StyledFieldHelpProps } from "./field-help.style";

export interface FieldHelpProps extends StyledFieldHelpProps {
  /** Child elements */
  children?: React.ReactNode;
  /** The unique id of the FieldHelp component */
  id?: string;
}

const FieldHelp = ({
  children,
  labelInline,
  labelWidth = 30,
  id,
}: FieldHelpProps) => (
  <StyledFieldHelp
    data-element="help"
    labelInline={labelInline}
    labelWidth={labelWidth}
    id={id}
  >
    {children}
  </StyledFieldHelp>
);

export default FieldHelp;
