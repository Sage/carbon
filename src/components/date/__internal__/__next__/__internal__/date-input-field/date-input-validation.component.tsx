import React from "react";

import ErrorBorder from "../../../../../../__internal__/error-border/error-border.style";
import ValidationMessage from "../../../../../../__internal__/validation-message/__next__";
import type { DatePickerSize } from "../date-picker";

interface DateInputValidationProps {
  error?: string | boolean;
  id?: string;
  shouldShowValidation: boolean;
  size: DatePickerSize;
  warning?: string | boolean;
}

const DateInputValidation = ({
  error,
  id,
  shouldShowValidation,
  size,
  warning,
}: DateInputValidationProps) => {
  if (!shouldShowValidation) {
    return null;
  }

  return (
    <>
      <ValidationMessage id={id} size={size} error={error} warning={warning} />
      <ErrorBorder data-role="error-border" $warning={!!(!error && warning)} />
    </>
  );
};

export default DateInputValidation;
