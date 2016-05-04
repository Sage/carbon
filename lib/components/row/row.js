'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

/**
 * A row widget.
 *
 * This is a standalone row widget used for layout; for table rows use the table-row widget.
 *
 * == How to use a Row in a component:
 *
 * In your file
 *
 *   import Row from 'carbon/lib/components/row';
 *
 * To render the Row:
 *
 *   <Row />
 *
 * @class Row
 * @constructor
 */

var Row = (function (_React$Component) {
  _inherits(Row, _React$Component);

  function Row() {
    var _this = this;

    _classCallCheck(this, Row);

    _get(Object.getPrototypeOf(Row.prototype), 'constructor', this).apply(this, arguments);

    this.buildColumns = function () {
      if (!_this.props.children) {
        return null;
      }

      var columns = [],
          children = _this.props.children.constructor === Array ? (0, _lodash.compact)(_this.props.children) : _this.props.children;

      if (children.constructor === Array && children.length) {
        children.forEach(function (child, index) {
          columns.push(_this.buildColumn(child, index));
        });
      } else if (children.constructor !== Array) {
        columns.push(_this.buildColumn(children, 0));
      }

      return columns;
    };

    this.buildColumn = function (child, key) {
      var _classNames;

      var columnClass = (0, _classnames2['default'])("ui-row__column", child.props.columnClasses, (_classNames = {}, _defineProperty(_classNames, 'ui-row__column--offset-' + child.props.columnOffset, child.props.columnOffset), _defineProperty(_classNames, 'ui-row__column--span-' + child.props.columnSpan, child.props.columnSpan), _defineProperty(_classNames, 'ui-row__column--align-' + child.props.columnAlign, child.props.columnAlign), _classNames));

      return _react2['default'].createElement(
        'div',
        { key: key, className: columnClass },
        child
      );
    };
  }

  _createClass(Row, [{
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     * @return {Object} JSX
     */
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses },
        this.buildColumns()
      );
    }
  }, {
    key: 'mainClasses',

    /**
     * Main Class getter
     *
     * @method mainClasses
     * @return {String} Main className
     */
    get: function get() {
      var columns = 1;

      if (this.props.columns) {
        columns = this.props.columns;
      } else if (this.props.children && this.props.children.constructor === Array) {
        columns = (0, _lodash.compact)(this.props.children).length;
      }

      return (0, _classnames2['default'])('ui-row', this.props.className, 'ui-row--columns-' + columns);
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * The elements to be rendered in the row
       *
       * @property children
       * @type {Object | Array}
       */
      children: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.array, _react2['default'].PropTypes.object])
    },

    /**
     * Builds row columns from the children object fields
     *
     * @method buildColumns
     * @return {Array} array of built columns
     */
    enumerable: true
  }]);

  return Row;
})(_react2['default'].Component);

exports['default'] = Row;
module.exports = exports['default'];

/**
 * Builds each column field with appropriate classes
 *
 * @method buildColumn
 * @param {Object} child child component
 * @param {Object} key index of child
 * @return {Object} JSX of build column
 */