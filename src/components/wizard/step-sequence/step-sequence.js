import PropTypes from 'prop-types';
import React from 'react';

import StepSequenceItem from '../step-sequence-item';

const stepSequenceItems = (step, index) => {
  const { label, state } = step;
  const props = {
    label,
    state,
    stepNumber: index + 1,
    key: label + index
  };
  return <StepSequenceItem { ...props } />;
};

const StepSequence = ({ steps }) => (
  <ol className='carbon-step-sequence'>
    { steps.map(stepSequenceItems) }
  </ol>
);

StepSequence.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      state: PropTypes.string
    })
  )
};

export default StepSequence;
