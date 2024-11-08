import React from "react";
import StyledValidationMessage from "./validation-message.style";

export interface ValidationMessageProps {
  /** Indicate that error has occurred
  Pass string to display hint with error */
  error?: boolean | string;
  /** Id of the component, to be used for accessibility purposes */
  validationId?: string;
  /** Indicate that warning has occurred
  Pass string to display hint with warning */
  warning?: boolean | string;
  /** Whether this component resides on a dark background */
  isDarkBackground?: boolean;
}

const ValidationMessage = ({
  error,
  validationId,
  warning,
  isDarkBackground,
}: ValidationMessageProps) => {
  const validation = error || warning;
  const isStringValidation = typeof validation === "string";

  return isStringValidation ? (
    <StyledValidationMessage
      id={validationId}
      isWarning={!!(!error && warning)}
      data-role="validation-message"
      isDarkBackground={isDarkBackground}
    >
      {validation}
    </StyledValidationMessage>
  ) : null;
};

export default ValidationMessage;
