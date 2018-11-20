import Icon from 'components/icon';
import PropTypes from 'prop-types';
import React from 'react';

const stepMarker = (state, number) => {
  return state === 'complete' ? <Icon type='tick' /> : number;
};

const StepSequenceItem = ({ label, state, stepNumber }) => (
  <li className='carbon-step-sequence-item'>
    <span>{ stepMarker(state, stepNumber) }</span>
    <span>{ label }</span>
  </li>
);

StepSequenceItem.propTypes = {
  label: PropTypes.string,
  state: PropTypes.string,
  stepNumber: PropTypes.number
};

export default StepSequenceItem;
