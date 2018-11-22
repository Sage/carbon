import PropTypes from 'prop-types';
import React from 'react';

import './step-sequence.scss';
import './step-sequence-orientation.scss';

const baseClass = 'carbon-step-sequence';
const classes = orientation => `${baseClass} ${baseClass}--${orientation}`;

const StepSequence = ({ children, orientation = 'horizontal' }) => (
  <ol className={ classes(orientation) }>
    { children }
  </ol>
);

StepSequence.propTypes = {
  children: PropTypes.node,
  orientation: PropTypes.string
};

export default StepSequence;
