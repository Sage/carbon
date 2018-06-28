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

var classes = function classes(props) {
  var _classNames;

  return (0, _classnames2.default)('carbon-column', props.className, props.columnClasses, (_classNames = {}, _defineProperty(_classNames, 'carbon-column--offset-' + props.columnOffset, props.columnOffset), _defineProperty(_classNames, 'carbon-column--span-' + props.columnSpan, props.columnSpan), _defineProperty(_classNames, 'carbon-column--align-' + props.columnAlign, props.columnAlign), _defineProperty(_classNames, 'carbon-column--column-divide', props.columnDivide), _classNames));
};

var Column = function Column(props) {
  return _react2.default.createElement(
    'div',
    { className: classes(props) },
    props.children
  );
};

/* eslint-disable react/no-unused-prop-types */
Column.propTypes = {
  /**
   * Children elements
   *
   * @property children
   * @type {Node}
   */
  children: _propTypes2.default.node,

  /**
   * Custom className
   *
   * @property className
   * @type {String}
   */
  className: _propTypes2.default.string,

  /**
   * Classes applied by row component to affect all rows
   *
   * @property columnDivide
   * @type {Boolean}
   */
  columnClasses: _propTypes2.default.string,

  /**
   * Show a divide between columns
   * This is defined on the Row Component
   *
   * @property columnDivide
   * @type {Boolean}
   */
  columnDivide: _propTypes2.default.bool,

  /**
   * Alignment of content within column
   *
   * @property columnDivide
   * @type {String}
   */
  columnAlign: _propTypes2.default.string,

  /**
   * Offset the column by n number of columns
   *
   * @property columnDivide
   * @type {String}
   */
  columnOffset: _propTypes2.default.string,

  /**
   * Number of columns to span
   *
   * @property columnDivide
   * @type {String}
   */
  columnSpan: _propTypes2.default.string
};

exports.default = Column;