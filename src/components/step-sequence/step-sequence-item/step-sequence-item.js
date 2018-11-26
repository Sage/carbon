import I18n from 'i18n-js';
import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../../icon';
import './step-sequence-item.scss';

import './i18n';

const baseClass = 'carbon-step-sequence-item';
const classes = status => `${baseClass} ${baseClass}--${status}`;

const stepMarker = (status, indicator) => {
  return status === 'complete' ? <Icon type='tick' /> : indicator;
};

const ariaLabel = (stepNumber, totalSteps) => {
  if (stepNumber && totalSteps) {
    return { 'aria-label': I18n.t('carbonStepSequence.ariaLabel', { stepNumber, totalSteps }) };
  }

  return {};
};

const ariaRole = (status) => {
  return status === 'current' ? { 'aria-current': 'step' } : {};
};

const StepSequenceItem = ({
  children,
  status,
  indicator,
  stepNumber,
  totalSteps
}) => (
  <li
    className={ classes(status) }
    { ...ariaRole(status) }
    { ...ariaLabel(stepNumber, totalSteps) }
  >
    <div className='carbon-step-sequence-item__label'>
      <span className='carbon-step-sequence-item__indicator'>{ stepMarker(status, indicator) }</span>
      { children }
    </div>
  </li>
);

StepSequenceItem.propTypes = {
  children: PropTypes.node,
  indicator: PropTypes.string,
  status: PropTypes.oneOf([
    'complete',
    'current',
    'incomplete'
  ]),
  stepNumber: PropTypes.number,
  totalSteps: PropTypes.number
};

StepSequenceItem.defaultProps = {
  status: 'incomplete'
};

export default StepSequenceItem;
