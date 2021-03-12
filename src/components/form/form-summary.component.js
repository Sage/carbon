import React from "react";
import PropTypes from "prop-types";

import { StyledFormSummary, StyledInternalSummary } from "./form-summary.style";
import useTranslation from "../../hooks/__internal__/useTranslation";
import Icon from "../icon";

const warningAppend = ({ errors, warnings }, type) =>
  errors > 0 && warnings > 0 && type === "warnings";

const translationKey = (props, type) =>
  warningAppend(props, type) ? "errors_and_warnings" : type;

const defaultTranslations = (errorCount, warningCount) => ({
  errors: {
    defaultValue: "There is {{count}} error",
    defaultValue_plural: "There are {{count}} errors",
    count: parseInt(errorCount, 10),
  },
  warnings: {
    defaultValue: "There is {{count}} warning",
    defaultValue_plural: "There are {{count}} warnings",
    count: parseInt(warningCount, 10),
  },
  errors_and_warnings: {
    defaultValue: "and {{count}} warning",
    defaultValue_plural: "and {{count}} warnings",
    count: parseInt(warningCount, 10),
  },
});

const translation = (props, type, t) => {
  const parsedKey = translationKey(props, type);

  const defaultTranslation = defaultTranslations(props.errors, props.warnings)[
    parsedKey
  ];
  const location = `errors.messages.form_summary.${parsedKey}`;

  return t(location, defaultTranslation);
};

const Summary = ({ type, ...props }) => {
  const t = useTranslation();

  if (props[type] > 0) {
    return (
      <StyledInternalSummary type={type} data-element={type}>
        <Icon type={type.slice(0, -1)} />
        <span>{translation(props, type, t)}</span>
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
