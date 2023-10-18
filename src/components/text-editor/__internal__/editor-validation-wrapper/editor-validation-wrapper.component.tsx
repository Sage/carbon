import React from "react";

import StyledValidationWrapper from "./editor-validation-wrapper.style";
import ValidationIcon from "../../../../__internal__/validations";

export interface EditorValidationWrapperProps {
  /** Message to be displayed when there is an error */
  error?: string;
  /** Message to be displayed when there is a warning */
  warning?: string;
  /** Message to be displayed when there is an info */
  info?: string;
}

const ValidationWrapper = ({
  error,
  warning,
  info,
}: EditorValidationWrapperProps) => (
  <StyledValidationWrapper data-component="text-editor-validation-wrapper">
    <ValidationIcon
      error={error}
      warning={warning}
      info={info}
      tooltipPosition="top"
      tabIndex={0}
    />
  </StyledValidationWrapper>
);

export default ValidationWrapper;
