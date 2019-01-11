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

var _tags2 = _interopRequireDefault(_tags);

var _button = require('../../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var saveButtonProps = function saveButtonProps(props) {
  return _extends({
    as: 'primary',
    disabled: props.saving,
    className: 'carbon-form-save__button'
  }, props.saveButtonProps);
};

var saveText = function saveText(props) {
  return props.saveText || _i18nJs2.default.t('actions.save', { defaultValue: 'Save' });
};

var SaveButton = function SaveButton(props) {
  return _react2.default.createElement(
    'div',
    _extends({ className: 'carbon-form-save' }, (0, _tags2.default)('save', props)),
    _react2.default.createElement(
      _button2.default,
      _extends({}, saveButtonProps(props), { 'data-element': 'save' }),
      saveText(props)
    )
  );
};

SaveButton.propTypes = {
  errors: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
  warnings: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};

exports.default = SaveButton;