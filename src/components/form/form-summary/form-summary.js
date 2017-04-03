import React from 'react';

import Icon from './../../icon';

import translate from './translations';

const FormSummary = props =>
  <div className='carbon-form-summary'>
    { summary(props, 'error') }
    { summary(props, 'warning') }
  </div>
;

FormSummary.propTypes = {
  errors:   React.PropTypes.number.isRequired,
  warnings: React.PropTypes.number.isRequired
};

/**
 * builds a summary in JSX
 *
 * @param {object} props
 * @param {string} key
 * @return {JSX}
 */
const summary = (props, key) => {
  if (props[pluralize(key)] > 0) {
    return (
      <span className={ `carbon-form-summary__summary carbon-form-summary__${key}-summary` }>
        <Icon className='carbon-form-summary__icon' type={ `${key}` } />
        <span className='carbon-form-summary__text'>{ translation(props, key) }</span>
      </span>
    );
  }
};

/**
 * Adds an 's' to pluralise (keys will always be error or warning)
 *
 * @param {string} key
 * @return {string} pluralized key
 */
const pluralize = (key) => {
  return `${key}s`;
};

/**
 * finds the correct translation key
 *
 * @param {object} props
 * @param {string} key
 * @return {string} correct key
 */
const translationKey = (props, key) => {
  return warningAppend(props, key) ? 'errors_and_warnings' : pluralize(key);
};

/**
 * gets the correct translation
 *
 * @param {object} props
 * @param {string} key
 * @return {string} correct translation
 */
const translation = (props, key) => {
  return translate(props.errors, props.warnings)[translationKey(props, key)];
};

/**
 * decides whether the warning message should be appended to the sentence or output as a sentence on it's own
 *
 * @param {object} props
 * @param {string} key
 * @return {boolean} true if the warning message needs to be appended
 */
const warningAppend = (props, key) => {
  return props.errors > 0 && props.warnings > 0 && key === 'warning';
};

export default FormSummary;
