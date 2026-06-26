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
  size: "small" | "medium" | "large";
  /** If true, displays a required indicator (*) */
  isRequired?: boolean;
  /** If true, the label will display in disabled styling */
  disabled?: boolean;
  /** If true, the label will display in read-only styling */
  readOnly?: boolean;
  /** onClick event */
  onClick?: () => void;
}

export const Label = ({
  children,
  id,
  htmlFor,
  size,
  isRequired,
  disabled,
  readOnly,
  onClick,
}: LabelProps) => {
  return (
    <StyledLabel
      id={id}
      htmlFor={htmlFor}
      $size={size}
      $isRequired={isRequired}
      $disabled={disabled}
      $readOnly={readOnly}
      data-component="label"
      data-element="label"
      aria-disabled={disabled || undefined}
      onClick={onClick}
    >
      {children}
    </StyledLabel>
  );
};

export default React.memo(Label);
