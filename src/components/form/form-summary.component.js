import React from "react";
import I18n from "i18n-js";
import PropTypes from "prop-types";

import { StyledFormSummary, StyledInternalSummary } from "./form-summary.style";
import Icon from "../icon";

const warningAppend = ({ errors, warnings }, type) =>
  errors > 0 && warnings > 0 && type === "warnings";

const translationKey = (props, type) =>
  warningAppend(props, type) ? "errors_and_warnings" : type;

const defaultTranslations = (errorCount, warningCount) => ({
  errors: {
    defaultValue: {
      one: "There is %{count} error",
      other: "There are %{count} errors",
    },
    count: parseInt(errorCount, 10),
  },
  warnings: {
    defaultValue: {
      one: "There is %{count} warning",
      other: "There are %{count} warnings",
    },
    count: parseInt(warningCount, 10),
  },
  errors_and_warnings: {
    defaultValue: {
      one: "and %{count} warning",
      other: "and %{count} warnings",
    },
    count: parseInt(warningCount, 10),
  },
});

const translation = (props, type) => {
  const parsedKey = translationKey(props, type);

  const defaultTranslation = defaultTranslations(props.errors, props.warnings)[
    parsedKey
  ];
  const location = `errors.messages.form_summary.${parsedKey}`;

  return I18n.t(location, defaultTranslation);
};

const Summary = ({ type, ...props }) => {
  if (props[type] > 0) {
    return (
      <StyledInternalSummary type={type} data-element={type}>
        <Icon type={type.slice(0, -1)} />
        <span>{translation(props, type)}</span>
      </StyledInternalSummary>
    );
  }
  return null;
};

Summary.propTypes = {
  type: PropTypes.oneOf(["errors", "warnings"]),
};

const FormSummary = (props) => (
  <StyledFormSummary
    showSummary={props.errors > 0 || props.warnings > 0}
    data-element="form-summary"
  >
    <Summary type="errors" {...props} />
    <Summary type="warnings" {...props} />
    {props.children}
  </StyledFormSummary>
);

FormSummary.propTypes = {
  children: PropTypes.node,
  errors: PropTypes.number,
  warnings: PropTypes.number,
};

export default FormSummary;
