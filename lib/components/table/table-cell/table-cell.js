'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

/**
 * A TableCell widget.
 *
 * == How to use a TableCell in a component:
 *
 * See documentation for Table component.
 *
 * You can set a property of 'align' which should be a string. This will
 * align the content to either "left", "center" or "right".
 *
 * You can set a property of 'action' which should be a boolean. This will
 * set styling options for the cell used for action such as delete.
 *
 * @class TableCell
 * @constructor
 */

var TableCell = (function (_React$Component) {
  _inherits(TableCell, _React$Component);

  function TableCell() {
    _classCallCheck(this, TableCell);

    _get(Object.getPrototypeOf(TableCell.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(TableCell, [{
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return _react2['default'].createElement(
        'td',
        this.tableCellProps,
        this.props.children
      );
    }
  }, {
    key: 'tableCellClasses',

    /**
     * Returns classes to be used on the TD element.
     *
     * @method tableCellClasses
     * @return {String}
     */
    get: function get() {
      return (0, _classnames2['default'])("ui-table-cell", this.props.className, _defineProperty({}, 'ui-table-cell--align-' + this.props.align, this.props.align), _defineProperty({}, 'ui-table-cell--action', this.props.action));
    }

    /**
     * Returns props to be used on the TD element.
     *
     * @method tableCellProps
     * @return {Object}
     */
  }, {
    key: 'tableCellProps',
    get: function get() {
      var _props = this.props;
      var children = _props.children;

      var props = _objectWithoutProperties(_props, ['children']);

      props.className = this.tableCellClasses;
      return props;
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * Defines the alignment of the cell (eg "left", "center" or "right").
       *
       * @property align
       * @type {String}
       */
      align: _react2['default'].PropTypes.string,

      /**
       * Defines the cell type to be an action - used for the delete cell.
       *
       * @property action
       * @type {Boolean}
       */
      action: _react2['default'].PropTypes.bool
    },
    enumerable: true
  }]);

  return TableCell;
})(_react2['default'].Component);

exports['default'] = TableCell;
module.exports = exports['default'];