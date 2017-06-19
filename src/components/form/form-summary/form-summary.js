import React from 'react';
import PropTypes from 'prop-types';
import { tagComponent } from '../../../utils/helpers/tags';

import Icon from './../../icon';

import translate from './translations';

const FormSummary = props =>
  <div className='carbon-form-summary' { ...tagComponent('form-summary', props) }>
    { summary(props, 'error') }
    { summary(props, 'warning') }
  </div>
;

FormSummary.propTypes = {
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  warnings: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
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
        <span
          className='carbon-form-summary__text'
          data-element={ pluralize(key) }
          dangerouslySetInnerHTML={{ __html: translation(props, key) }}
        />
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
