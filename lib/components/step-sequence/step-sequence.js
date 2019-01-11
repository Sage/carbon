'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StepSequenceItem = exports.StepSequence = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _stepSequenceItem = require('./step-sequence-item');

var _stepSequenceItem2 = _interopRequireDefault(_stepSequenceItem);

require('./step-sequence.scss');

require('./step-sequence-orientation.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseClass = 'carbon-step-sequence';
var classes = function classes(orientation) {
  return baseClass + ' ' + baseClass + '--' + orientation;
};

var StepSequence = function StepSequence(_ref) {
  var children = _ref.children,
      orientation = _ref.orientation;
  return _react2.default.createElement(
    'ol',
    { className: classes(orientation) },
    children
  );
};

StepSequence.propTypes = {
  children: _propTypes2.default.node,
  orientation: _propTypes2.default.oneOf(['horizontal', 'vertical'])
};

StepSequence.defaultProps = {
  orientation: 'horizontal'
};

exports.StepSequence = StepSequence;
exports.StepSequenceItem = _stepSequenceItem2.default;