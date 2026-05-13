import React from "react";
import StyledValidationMessage from "./validation-message.style";
import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags";

export interface ValidationMessageProps extends TagProps {
  /**
   * If true, displays error styling. If passed as a valid string, displays error styling
   * and the message as children.
   */
  error?: boolean | string;
  /** Id of the component, to be used for accessibility purposes */
  id?: string;
  /**
   * If true, displays warning styling. If passed as a valid string, displays warning styling
   * and the message as children.
   */
  warning?: boolean | string;
  /** Size of the validation message font */
  size?: "small" | "medium" | "large";
}

const ValidationMessage = ({
  error,
  id,
  warning,
  "data-element": dataElement,
  "data-role": dataRole = "validation-message",
  size,
}: ValidationMessageProps) => {
  const validation = error || warning;
  const isStringValidation = typeof validation === "string";

  return isStringValidation ? (
    <StyledValidationMessage
      id={id}
      $isError={Boolean(error)}
      {...tagComponent("validation-message", {
        "data-element": dataElement,
        "data-role": dataRole,
      })}
      $size={size}
    >
      {validation}
    </StyledValidationMessage>
  ) : null;
};

export default ValidationMessage;
