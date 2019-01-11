'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icon = require('../../icon');

var _icon2 = _interopRequireDefault(_icon);

require('./step-sequence-item.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var baseClass = 'carbon-step-sequence-item';
var classes = function classes(status) {
  return baseClass + ' ' + baseClass + '--' + status;
};

var stepMarker = function stepMarker(status, indicator) {
  return status === 'complete' ? _react2.default.createElement(_icon2.default, { type: 'tick' }) : indicator;
};

var ariaRoleProp = function ariaRoleProp(status) {
  return status === 'current' ? { 'aria-current': 'step' } : {};
};

var completeLabel = function completeLabel(label, status) {
  if (label && status === 'complete') {
    return _react2.default.createElement(
      'span',
      { className: 'carbon-step-sequence-item__visually-hidden' },
      label
    );
  }

  return null;
};

var currentLabel = function currentLabel(label, status) {
  if (label && status === 'current') {
    return _react2.default.createElement(
      'span',
      { className: 'carbon-step-sequence-item__visually-hidden' },
      label
    );
  }

  return null;
};

var StepSequenceItem = function StepSequenceItem(_ref) {
  var children = _ref.children,
      indicator = _ref.indicator,
      status = _ref.status,
      hiddenCompleteLabel = _ref.hiddenCompleteLabel,
      hiddenCurrentLabel = _ref.hiddenCurrentLabel,
      props = _objectWithoutProperties(_ref, ['children', 'indicator', 'status', 'hiddenCompleteLabel', 'hiddenCurrentLabel']);

  return _react2.default.createElement(
    'li',
    _extends({
      className: classes(status)
    }, ariaRoleProp(status), props),
    completeLabel(hiddenCompleteLabel, status),
    currentLabel(hiddenCurrentLabel, status),
    _react2.default.createElement(
      'div',
      { className: 'carbon-step-sequence-item__label' },
      _react2.default.createElement(
        'span',
        { className: 'carbon-step-sequence-item__indicator' },
        stepMarker(status, indicator)
      ),
      children
    )
  );
};

StepSequenceItem.propTypes = {
  children: _propTypes2.default.node.isRequired,
  indicator: _propTypes2.default.string.isRequired,
  status: _propTypes2.default.oneOf(['complete', 'current', 'incomplete']),
  hiddenCompleteLabel: _propTypes2.default.string,
  hiddenCurrentLabel: _propTypes2.default.string
};

StepSequenceItem.defaultProps = {
  status: 'incomplete'
};

exports.default = StepSequenceItem;