import React, { useMemo } from "react";

import {
  StyledFormSummary,
  StyledInternalSummary,
  StyledMessagePrefix,
  StyledInternalSummaryProps,
} from "./form-summary.style";
import Icon from "../../icon";
import useLocale from "../../../hooks/__internal__/useLocale";

interface SummaryProps extends StyledInternalSummaryProps {
  errorCount?: number;
  warningCount?: number;
}

export interface FormSummaryProps {
  /** Child elements */
  children?: React.ReactNode;
  /** The total number of errors present in the form */
  errorCount?: number;
  /** The total number of warnings present in the form */
  warningCount?: number;
  /** Applies full width styling */
  fullWidth?: boolean;
}

export const Summary = ({
  type,
  errorCount = 0,
  warningCount = 0,
}: SummaryProps) => {
  const l = useLocale();
  const messages = {
    errorCount,
    warningCount,
  };
  const message = useMemo(
    () => l.errors.messages.formSummary(errorCount, warningCount, type),
    [l.errors.messages, errorCount, warningCount, type],
  );

  if (messages[`${type}Count`]) {
    return (
      <>
        <StyledMessagePrefix>{message?.[0]}</StyledMessagePrefix>
        <StyledInternalSummary
          type={type}
          data-element={`${type}s`}
          data-role="internal-summary"
        >
          <Icon type={type} />
          <span>{message?.[1]}</span>
        </StyledInternalSummary>
      </>
    );
  }
  return null;
};

const FormSummary = ({ fullWidth, ...props }: FormSummaryProps) => {
  return (
    <StyledFormSummary
      showSummary={!!(props.errorCount || props.warningCount)}
      data-element="form-summary"
      data-role="form-summary"
      fullWidth={fullWidth}
    >
      <Summary type="error" {...props} />
      <Summary type="warning" {...props} />
      {props.children}
    </StyledFormSummary>
  );
};

export default FormSummary;
