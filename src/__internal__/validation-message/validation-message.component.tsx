import React from "react";
import StyledValidationMessage from "./validation-message.style";

export interface ValidationMessageProps {
  /** Indicate that error has occurred
  Pass string to display hint with error */
  error?: boolean | string;
  /** Indicate that warning has occurred
  Pass string to display hint with warning */
  warning?: boolean | string;
}

const ValidationMessage = ({ error, warning }: ValidationMessageProps) => {
  const validation = error || warning;
  const isStringValidation = typeof validation === "string";

  return isStringValidation ? (
    <StyledValidationMessage isWarning={!!(!error && warning)}>
      {validation}
    </StyledValidationMessage>
  ) : null;
};

export default ValidationMessage;
