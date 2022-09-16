import React, { useMemo } from "react";
import PropTypes from "prop-types";

import {
  StyledFormSummary,
  StyledInternalSummary,
  StyledMessagePrefix,
} from "./form-summary.style";
import Icon from "../../icon";
import useLocale from "../../../hooks/__internal__/useLocale";

const Summary = ({ type, errors, warnings }) => {
  const l = useLocale();
  const messages = {
    errors,
    warnings,
  };
  const message = useMemo(
    () => l.errors.messages.formSummary(errors, warnings, type),
    [l.errors.messages, errors, warnings, type]
  );

  if (messages[type]) {
    return (
      <>
        <StyledMessagePrefix>{message[0]}</StyledMessagePrefix>
        <StyledInternalSummary type={type} data-element={type}>
          <Icon type={type.slice(0, -1)} />
          <span>{message[1]}</span>
        </StyledInternalSummary>
      </>
    );
  }
  return null;
};

Summary.propTypes = {
  type: PropTypes.oneOf(["errors", "warnings"]),
  errors: PropTypes.number,
  warnings: PropTypes.number,
};

const FormSummary = ({ fullWidth, ...props }) => {
  return (
    <StyledFormSummary
      showSummary={props.errors || props.warnings}
      data-element="form-summary"
      fullWidth={fullWidth}
    >
      <Summary type="errors" {...props} />
      <Summary type="warnings" {...props} />
      {props.children}
    </StyledFormSummary>
  );
};

FormSummary.propTypes = {
  children: PropTypes.node,
  errors: PropTypes.number,
  warnings: PropTypes.number,
  fullWidth: PropTypes.bool,
};

export default FormSummary;
