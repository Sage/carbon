'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Column = function Column(props) {
  return _react2.default.createElement(
    'div',
    { className: 'carbon-column ' + props.className },
    props.children
  );
};

Column.PropTypes = {
  columnAlign: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  columnOffset: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  columnSpan: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

  columnDivide: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string])
};

exports.default = Column;