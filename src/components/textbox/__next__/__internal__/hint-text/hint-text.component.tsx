import React from "react";
import StyledHintText from "./hint-text.style";

export interface HintTextProps {
  /** Children elements */
  children?: React.ReactNode;
  /** Sets the id for the component */
  id?: string;
  /** If true, uses large font size */
  isLarge?: boolean;
  /** If true, the hint text will display in disabled styling */
  disabled?: boolean;
}

export const HintText = ({
  children,
  id,
  isLarge,
  disabled,
}: HintTextProps) => {
  return (
    <StyledHintText
      data-element="input-hint"
      data-role="hint-text"
      id={id}
      isLarge={isLarge}
      disabled={disabled}
    >
      {children}
    </StyledHintText>
  );
};

export default HintText;
