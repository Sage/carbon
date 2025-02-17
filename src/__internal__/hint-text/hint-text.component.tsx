import React, { useContext } from "react";

import StyledHintText from "./hint-text.style";
import NewValidationContext from "../../components/carbon-provider/__internal__/new-validation.context";

export interface HintTextProps {
  /** The alignment of the hint text */
  align?: "left" | "right";
  /** Children elements */
  children?: React.ReactNode;
  /** Sets the font weight for the hint text */
  fontWeight?: string;
  /** Sets the id for the component. */
  id?: string;
  /** Indicates whether the parent component is inline. */
  isComponentInline?: boolean;
  /** Indicates whether the parent component has a dark background. */
  isDarkBackground?: boolean;
  /** Indicates whether the parent component is disabled. */
  isDisabled?: boolean;
  /** Margin bottom for the hint text */
  marginBottom?: string;
  /** Margin top for the hint text */
  marginTop?: string;
  /** Max width for the hint text */
  maxWidth?: string;
}

export const HintText = ({
  align,
  children,
  fontWeight,
  id,
  isComponentInline = false,
  isDarkBackground = false,
  isDisabled = false,
  marginBottom = "var(--spacing100)",
  marginTop = "var(--spacing000)",
  maxWidth,
}: HintTextProps) => {
  const { validationRedesignOptIn } = useContext(NewValidationContext);

  if (isComponentInline && !validationRedesignOptIn) return null;

  return (
    <StyledHintText
      align={align}
      data-element="input-hint"
      data-role="hint-text"
      fontWeight={fontWeight}
      id={id}
      isDarkBackground={isDarkBackground}
      isDisabled={isDisabled}
      marginBottom={marginBottom}
      marginTop={marginTop}
      maxWidth={maxWidth}
    >
      {children}
    </StyledHintText>
  );
};

export default HintText;
