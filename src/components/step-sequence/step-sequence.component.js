import PropTypes from 'prop-types';
import React from 'react';
import StepSequenceStyle from './step-sequence.style';

const StepSequence = ({ children, orientation }) => (
  <StepSequenceStyle orientation={ orientation }>
    { children }
  </StepSequenceStyle>
);

StepSequence.propTypes = {
  /** Step sequence items to be rendered */
  children: PropTypes.node,
  /** The direction that step sequence items should be rendered */
  orientation: PropTypes.oneOf([
    'horizontal',
    'vertical'
  ])
};

StepSequence.defaultProps = {
  orientation: 'horizontal'
};

export default StepSequence;
