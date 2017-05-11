'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Column = function Column(props) {
  var _classNames;

  var columnClasses = (0, _classnames2.default)("carbon-column", props.className, (_classNames = {}, _defineProperty(_classNames, 'carbon-column--offset-' + props.columnOffset, props.columnOffset), _defineProperty(_classNames, 'carbon-column--span-' + props.columnSpan, props.columnSpan), _defineProperty(_classNames, 'carbon-column--align-' + props.columnAlign, props.columnAlign), _defineProperty(_classNames, "carbon-column--column-divide", props.columnDivide), _classNames));

  return _react2.default.createElement(
    'div',
    { className: columnClasses },
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