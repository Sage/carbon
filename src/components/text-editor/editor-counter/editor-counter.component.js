import React from 'react';
import PropTypes from 'prop-types';
import StyledCounter from './editor-counter.style';

const Counter = ({ contentLength, limit }) => (
  <StyledCounter data-component='text-editor-counter'>
    { `${limit - contentLength}` }
  </StyledCounter>
);

Counter.propTypes = {
  contentLength: PropTypes.number,
  limit: PropTypes.number
};

Counter.defaultProps = {
  contentLength: 0,
  limit: 3000
};

export default Counter;
