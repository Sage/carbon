import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../../icon';
import './step-sequence-item.scss';

const baseClass = 'carbon-step-sequence-item';
const classes = state => `${baseClass} ${baseClass}--${state}`;

const stepMarker = (state, indicator) => {
  return state === 'complete' ? <Icon type='tick' /> : indicator;
};

const StepSequenceItem = ({ children, state, indicator }) => (
  <li className={ classes(state) }>
    <span className='carbon-step-sequence-item__label'>
      <span className='carbon-step-sequence-item__indicator'>{ stepMarker(state, indicator) }</span>
      { children }
    </span>
  </li>
);

StepSequenceItem.propTypes = {
  children: PropTypes.node,
  state: PropTypes.oneOf([
    'complete',
    'current',
    'incomplete'
  ]),
  indicator: PropTypes.string
};

StepSequenceItem.defaultProps = {
  state: 'incomplete'
};

export default StepSequenceItem;
