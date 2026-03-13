import React from "react";
import StyledLabel from "./label.style";

export interface LabelProps {
  /** Children elements */
  children?: React.ReactNode;
  /** HTML for attribute to associate label with input */
  htmlFor?: string;
  /** Sets the id for the component */
  id?: string;
  /** If true, uses large font size */
  isLarge?: boolean;
  /** If true, displays a required indicator (*) */
  isRequired?: boolean;
  /** If true, the label will display in disabled styling */
  disabled?: boolean;
  /** If true, the label will display in read-only styling */
  readOnly?: boolean;
}

export const Label = ({
  children,
  id,
  htmlFor,
  isLarge,
  isRequired,
  disabled,
  readOnly,
}: LabelProps) => {
  return (
    <StyledLabel
      id={id}
      htmlFor={htmlFor}
      isLarge={isLarge}
      isRequired={isRequired}
      disabled={disabled}
      readOnly={readOnly}
    >
      {children}
    </StyledLabel>
  );
};

export default React.memo(Label);
