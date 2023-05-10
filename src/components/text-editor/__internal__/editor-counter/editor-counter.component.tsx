import React from "react";

import { StyledCounterWrapper, StyledCounter } from "./editor-counter.style";
import ValidationIcon from "../../../../__internal__/validations";

export interface EditorCounterProps {
  /** Sets the current count value */
  count?: number;
  /** Sets the current limit value */
  limit?: number;
  /** Message to be displayed when there is an error */
  error?: string;
  /** Message to be displayed when there is a warning */
  warning?: string;
  /** Message to be displayed when there is an info */
  info?: string;
}

const Counter = ({
  count = 0,
  limit = 3000,
  error,
  warning,
  info,
}: EditorCounterProps) => (
  <StyledCounterWrapper data-component="text-editor-counter">
    {!!(error || warning || info) && (
      <ValidationIcon
        error={error}
        warning={warning}
        info={info}
        tooltipPosition="top"
        tabIndex={0}
      />
    )}
    <StyledCounter hasError={!!error}>{`${limit - count}`}</StyledCounter>
  </StyledCounterWrapper>
);

export default Counter;
