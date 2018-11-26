import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../../icon';
import './step-sequence-item.scss';

const baseClass = 'carbon-step-sequence-item';
const classes = status => `${baseClass} ${baseClass}--${status}`;

const stepMarker = (status, indicator) => {
  return status === 'complete' ? <Icon type='tick' /> : indicator;
};

const ariaRole = (status) => {
  return status === 'current' ? { 'aria-current': 'step' } : {};
};

const StepSequenceItem = ({
  ariaLabel,
  children,
  indicator,
  status
}) => (
  <li
    className={ classes(status) }
    { ...ariaRole(status) }
    aria-label={ ariaLabel }
  >
    <div className='carbon-step-sequence-item__label'>
      <span className='carbon-step-sequence-item__indicator'>{ stepMarker(status, indicator) }</span>
      { children }
    </div>
  </li>
);

StepSequenceItem.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  indicator: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    'complete',
    'current',
    'incomplete'
  ])
};

StepSequenceItem.defaultProps = {
  status: 'incomplete'
};

export default StepSequenceItem;
