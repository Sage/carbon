import React from "react";
import PropTypes from "prop-types";
import { StyledCounterWrapper, StyledCounter } from "./editor-counter.style";
import ValidationIcon from "../../../validations";

const Counter = ({ count = 0, limit = 3000, error, warning, info }) => (
  <StyledCounterWrapper
    hasIcon={!!(error || warning || info)}
    data-component="text-editor-counter"
  >
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

Counter.propTypes = {
  /** Sets the current count value */
  count: PropTypes.number,
  /** Sets the current limit value */
  limit: PropTypes.number,
  /** Message to be displayed when there is an error */
  error: PropTypes.string,
  /** Message to be displayed when there is a warning */
  warning: PropTypes.string,
  /** Message to be displayed when there is an info */
  info: PropTypes.string,
};

export default Counter;
