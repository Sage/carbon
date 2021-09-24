import React from "react";
import styledSystemPropTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import { filterStyledSystemMarginProps } from "../../style/utils";
import StyledValidationMessage from "./validation-message.style";

const ValidationMessage = ({ error, warning, info }) => {
  const validation = error || warning || info;
  const isStringValidation = typeof validation === "string";

  if (!isStringValidation) return null;

  return (
    <>
      {error && <StyledValidationMessage>{error}</StyledValidationMessage>}
      {warning && !error && (
        <StyledValidationMessage type="warning">
          {warning}
        </StyledValidationMessage>
      )}
      {info && !warning && !error && (
        <StyledValidationMessage type="info">{info}</StyledValidationMessage>
      )}
    </>
  );
};

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

ValidationMessage.propTypes = {
  ...marginPropTypes,
  /** Indicate that error has occurred
  Pass string to display hint with error */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that warning has occurred
  Pass string to display hint with warning */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate additional information
  Pass string to display hint with info */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default ValidationMessage;
