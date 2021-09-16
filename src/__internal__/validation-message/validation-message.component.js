import React from "react";
import PropTypes from "prop-types";
import StyledValidationMessage from "./validation-message.style";

const ValidationMessage = ({ error, warning }) => {
  const validation = error || warning;
  const isStringValidation = typeof validation === "string";

  return isStringValidation ? (
    <StyledValidationMessage isWarning={!!(!error && warning)}>
      {validation}
    </StyledValidationMessage>
  ) : null;
};

ValidationMessage.propTypes = {
  /** Indicate that error has occurred
  Pass string to display hint with error */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that warning has occurred
  Pass string to display hint with warning */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default ValidationMessage;
