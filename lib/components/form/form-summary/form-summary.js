'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tags = require('../../../utils/helpers/tags');

var _icon = require('./../../icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormSummary = function FormSummary(props) {
  return _react2.default.createElement(
    'div',
    _extends({ className: 'carbon-form-summary' }, (0, _tags.tagComponent)('form-summary', props)),
    summary(props, 'error'),
    summary(props, 'warning')
  );
};

FormSummary.propTypes = {
  errors: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  warnings: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
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
      _react2.default.createElement('span', {
        className: 'carbon-form-summary__text',
        'data-element': pluralize(key),
        dangerouslySetInnerHTML: { __html: translation(props, key) }
      })
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