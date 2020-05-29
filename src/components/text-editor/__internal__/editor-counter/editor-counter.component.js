import React from 'react';
import PropTypes from 'prop-types';
import StyledCounter from './editor-counter.style';

const Counter = ({ count = 0, limit = 3000 }) => (
  <StyledCounter data-component='text-editor-counter'>
    { `${limit - count}` }
  </StyledCounter>
);

Counter.propTypes = {
  /** Sets the current count value */
  count: PropTypes.number,
  /** Sets the current limit value */
  limit: PropTypes.number
};

export default Counter;
