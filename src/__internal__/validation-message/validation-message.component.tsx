import React from "react";
import StyledValidationMessage from "./validation-message.style";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

export interface ValidationMessageProps extends TagProps {
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
  /** Render the validation message above the input */
  validationMessagePositionTop?: boolean;
  /** Set large font-size */
  isLarge?: boolean;
}

const ValidationMessage = ({
  error,
  validationId,
  warning,
  isDarkBackground,
  "data-element": dataElement,
  "data-role": dataRole = "validation-message",
  validationMessagePositionTop,
  isLarge,
}: ValidationMessageProps) => {
  const validation = error || warning;
  const isStringValidation = typeof validation === "string";

  return isStringValidation ? (
    <StyledValidationMessage
      id={validationId}
      isWarning={!!(!error && warning)}
      isDarkBackground={isDarkBackground}
      {...tagComponent("validation-message", {
        "data-element": dataElement,
        "data-role": dataRole,
      })}
      validationMessagePositionTop={validationMessagePositionTop}
      isLarge={isLarge}
    >
      {validation}
    </StyledValidationMessage>
  ) : null;
};

export default ValidationMessage;
