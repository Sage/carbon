import Icon from 'components/icon';
import PropTypes from 'prop-types';
import React from 'react';

import './step-sequence-item.scss';

const baseClass = 'carbon-step-sequence-item';
const classes = state => `${baseClass} ${baseClass}--${state}`;

const stepMarker = (state, indicator) => {
  return state === 'complete' ? <Icon type='tick' /> : indicator;
};

const StepSequenceItem = ({ label, state, indicator }) => (
  <li className={ classes(state) }>
    <span className='carbon-step-sequence-item__label'>
      <span className='carbon-step-sequence-item__indicator'>{ stepMarker(state, indicator) }</span>
      { label }
    </span>
  </li>
);

StepSequenceItem.propTypes = {
  label: PropTypes.string,
  state: PropTypes.string,
  indicator: PropTypes.string
};

StepSequenceItem.defaultProps = {
  label: '',
  state: 'incomplete',
  indicator: ''
};

export default StepSequenceItem;
