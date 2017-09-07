'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _tags = require('../../../utils/helpers/tags');

var _tags2 = _interopRequireDefault(_tags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fullScrenHeadingClasses = function fullScrenHeadingClasses(props) {
  return (0, _classnames2.default)('carbon-full-screen-heading', props.className);
};

var FullScrenHeading = function FullScrenHeading(props) {
  return _react2.default.createElement('div', _extends({}, props, { className: fullScrenHeadingClasses(props) }, (0, _tags2.default)('full-screen-heading', props)));
};

FullScrenHeading.propTypes = {
  className: _propTypes2.default.string
};

exports.default = FullScrenHeading;