import React from 'react';
import I18n from 'i18n-js';
import PropTypes from 'prop-types';
import StyledFormSummary, { StyledInternalSummary, StyledSummaryText } from './form-summary.style';
import tagComponent from '../../../../utils/helpers/tags';
import Icon from '../../../../components/icon';

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
 * decides whether the warning message should be appended to the sentence or output as a sentence on it's own
 *
 * @param {object} props
 * @param {string} key
 * @return {boolean} true if the warning message needs to be appended
 */
const warningAppend = (props, key) => {
  return props.errors > 0 && props.warnings > 0 && key === 'warning';
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
 * Returns the default translation set
 *
 * @param {number} errorCount
 * @param {number} warningCount
 * @return {object} default translations
 */
const defaultTranslations = (errorCount, warningCount) => {
  return {
    errors: {
      defaultValue: {
        one: 'There is %{count} error',
        other: 'There are %{count} errors'
      },
      count: parseInt(errorCount, 10)
    },
    warnings: {
      defaultValue: {
        one: 'There is %{count} warning',
        other: 'There are %{count} warnings'
      },
      count: parseInt(warningCount, 10)
    },
    errors_and_warnings: {
      defaultValue: {
        one: 'and %{count} warning',
        other: 'and %{count} warnings'
      },
      count: parseInt(warningCount, 10)
    }
  };
};

/**
 * gets the correct translation
 *
 * @param {object} props
 * @param {string} key
 * @return {string} correct translation
 */
const translation = (props, key) => {
  const parsedKey = translationKey(props, key);

  const defaultTranslation = defaultTranslations(props.errors, props.warnings)[parsedKey],
      location = `errors.messages.form_summary.${parsedKey}`;

  return I18n.t(location, defaultTranslation);
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
      <StyledInternalSummary type={ key }>
        <Icon type={ key } />
        <StyledSummaryText
          type={ key }
          data-element={ pluralize(key) }
          dangerouslySetInnerHTML={ { __html: translation(props, key) } } // eslint-disable-line react/no-danger
        />
      </StyledInternalSummary>
    );
  }
  return null;
};

const FormSummary = props => (
  <StyledFormSummary
    isInvalid={ props.errors > 0 || props.warnings > 0 }
    { ...tagComponent('form-summary', props) }
  >
    { summary(props, 'error') }
    { summary(props, 'warning') }
    { props.children }
  </StyledFormSummary>
);

FormSummary.propTypes = {
  children: PropTypes.node,
  errors: PropTypes.oneOfType([ // eslint-disable-line react/no-unused-prop-types
    PropTypes.string,
    PropTypes.number
  ]),
  warnings: PropTypes.oneOfType([ // eslint-disable-line react/no-unused-prop-types
    PropTypes.string,
    PropTypes.number
  ])
};


export default FormSummary;
