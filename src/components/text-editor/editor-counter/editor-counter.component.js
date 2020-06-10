import React from 'react';
import PropTypes from 'prop-types';
import StyledCounter from './editor-counter.style';

const Counter = ({ count, limit }) => (
  <StyledCounter data-component='text-editor-counter'>
    { `${limit - count}` }
  </StyledCounter>
);

Counter.propTypes = {
  count: PropTypes.number,
  limit: PropTypes.number
};

Counter.defaultProps = {
  count: 0,
  limit: 3000
};

export default Counter;
