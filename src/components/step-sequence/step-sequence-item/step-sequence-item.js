import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../../icon';
import './step-sequence-item.scss';

const baseClass = 'carbon-step-sequence-item';
const classes = status => `${baseClass} ${baseClass}--${status}`;

const stepMarker = (status, indicator) => {
  return status === 'complete' ? <Icon type='tick' /> : indicator;
};

const ariaLabelProp = (ariaLabel) => {
  return ariaLabel ? { 'aria-label': ariaLabel } : {};
};

const ariaRoleProp = (status) => {
  return status === 'current' ? { 'aria-current': 'step' } : {};
};

const completeLabel = (label, status) => {
  if (label && status === 'complete') {
    return <span className='carbon-step-sequence-item__visually-hidden'>{ label }</span>;
  }

  return null;
};

const currentLabel = (label, status) => {
  if (label && status === 'current') {
    return <span className='carbon-step-sequence-item__visually-hidden'>{ label }</span>;
  }

  return null;
};

const StepSequenceItem = ({
  ariaLabel,
  children,
  indicator,
  status,
  hiddenCompleteLabel,
  hiddenCurrentLabel
}) => (
  <li
    className={ classes(status) }
    { ...ariaLabelProp(ariaLabel) }
    { ...ariaRoleProp(status) }
  >
    { completeLabel(hiddenCompleteLabel, status) }
    { currentLabel(hiddenCurrentLabel, status) }
    <div className='carbon-step-sequence-item__label'>
      <span className='carbon-step-sequence-item__indicator'>{ stepMarker(status, indicator) }</span>
      { children }
    </div>
  </li>
);

StepSequenceItem.propTypes = {
  ariaLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
  indicator: PropTypes.string.isRequired,
  status: PropTypes.oneOf([
    'complete',
    'current',
    'incomplete'
  ]),
  hiddenCompleteLabel: PropTypes.string,
  hiddenCurrentLabel: PropTypes.string
};

StepSequenceItem.defaultProps = {
  status: 'incomplete'
};

export default StepSequenceItem;
