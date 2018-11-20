import PropTypes from 'prop-types';
import React from 'react';

import StepSequence from './step-sequence';

const Wizard = ({ children, current, steps }) => (
  <div className='carbon-wizard'>
    <div className='carbon-wizard__steps'>
      <StepSequence { ...{ current, steps } } />
    </div>
    <div className='carbon-wizard__content'>
      { children[current] }
    </div>
  </div>
);

Wizard.propTypes = {
  children: PropTypes.array,
  current: PropTypes.number,
  steps: PropTypes.array
};

export default Wizard;
