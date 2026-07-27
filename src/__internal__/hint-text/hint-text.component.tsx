import React from "react";
import StyledHintText from "./hint-text.style";

export interface HintTextProps {
  /** Child elements */
  children?: React.ReactNode;
  /** Sets the id for the component */
  id?: string;
  /* Size of the hint text */
  size: "small" | "medium" | "large";
  /** If true, the hint text will display in disabled styling */
  disabled?: boolean;
  /** Class name to target component */
  className?: string;
}

export const HintText = ({
  children,
  id,
  size,
  disabled,
  className,
}: HintTextProps) => {
  return (
    <StyledHintText
      className={className}
      data-element="input-hint"
      data-role="hint-text"
      id={id}
      $size={size}
      $disabled={disabled}
      aria-disabled={disabled || undefined}
    >
      {children}
    </StyledHintText>
  );
};

export default HintText;
