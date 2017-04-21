'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('./../../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormSummary = function FormSummary(props) {
  return _react2.default.createElement(
    'div',
    { className: 'carbon-form-summary' },
    summary(props, 'error'),
    summary(props, 'warning')
  );
};

FormSummary.propTypes = {
  errors: _react2.default.PropTypes.number.isRequired,
  warnings: _react2.default.PropTypes.number.isRequired
};

/**
 * builds a summary in JSX
 *
 * @param {object} props
 * @param {string} key
 * @return {JSX}
 */
var summary = function summary(props, key) {
  if (props[pluralize(key)] > 0) {
    return _react2.default.createElement(
      'span',
      { className: 'carbon-form-summary__summary carbon-form-summary__' + key + '-summary' },
      _react2.default.createElement(_icon2.default, { className: 'carbon-form-summary__icon', type: '' + key }),
      _react2.default.createElement('span', { className: 'carbon-form-summary__text', dangerouslySetInnerHTML: { __html: translation(props, key) } })
    );
  }
};

/**
 * Returns the default translation set
 *
 * @param {number} errorCount
 * @param {number} warningCount
 * @return {object} default translations
 */
var defaultTranslations = function defaultTranslations(errorCount, warningCount) {
  return {
    errors: {
      defaultValue: {
        one: 'There is ' + errorCount + ' error',
        other: 'There are ' + errorCount + ' errors'
      },
      count: parseInt(errorCount)
    },
    warnings: {
      defaultValue: {
        one: 'There is ' + warningCount + ' warning',
        other: 'There are ' + warningCount + ' warnings'
      },
      count: parseInt(warningCount)
    },
    errors_and_warnings: {
      defaultValue: {
        one: 'and ' + warningCount + ' warning',
        other: 'and ' + warningCount + ' warnings'
      },
      count: parseInt(warningCount)
    }
  };
};

/**
 * Adds an 's' to pluralise (keys will always be error or warning)
 *
 * @param {string} key
 * @return {string} pluralized key
 */
var pluralize = function pluralize(key) {
  return key + 's';
};

/**
 * finds the correct translation key
 *
 * @param {object} props
 * @param {string} key
 * @return {string} correct key
 */
var translationKey = function translationKey(props, key) {
  return warningAppend(props, key) ? 'errors_and_warnings' : pluralize(key);
};

/**
 * gets the correct translation
 *
 * @param {object} props
 * @param {string} key
 * @return {string} correct translation
 */
var translation = function translation(props, key) {
  key = translationKey(props, key);

  var defaultTranslation = defaultTranslations(props.errors, props.warnings)[key],
      location = 'errors.messages.form_summary.' + key;

  return _i18nJs2.default.t(location, defaultTranslation);
};

/**
 * decides whether the warning message should be appended to the sentence or output as a sentence on it's own
 *
 * @param {object} props
 * @param {string} key
 * @return {boolean} true if the warning message needs to be appended
 */
var warningAppend = function warningAppend(props, key) {
  return props.errors > 0 && props.warnings > 0 && key === 'warning';
};

exports.default = FormSummary;