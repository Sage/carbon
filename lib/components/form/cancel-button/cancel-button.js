'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tags = require('../../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

var _button = require('../../button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cancelButtonProps = function cancelButtonProps(props) {
  return _extends({
    onClick: props.cancelClick,
    type: 'button',
    className: 'carbon-form-cancel__button'
  }, props.cancelButtonProps);
};

var cancelText = function cancelText(props) {
  return props.cancelText || _i18nJs2.default.t('actions.cancel', { defaultValue: 'Cancel' });
};

var CancelButton = function CancelButton(props) {
  return _react2.default.createElement(
    'div',
    _extends({ className: 'carbon-form-cancel' }, (0, _tags2.default)('cancel', props)),
    _react2.default.createElement(
      _button2.default,
      _extends({}, cancelButtonProps(props), { 'data-element': 'cancel' }),
      cancelText(props)
    )
  );
};

exports.default = CancelButton;