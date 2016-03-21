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

/**
 * A TableHeader widget.
 *
 * == How to use a TableHeader in a component:
 *
 * See documentation for Table component.
 *
 * You can set a property of 'align' which should be a string. This will
 * align the content to either "left" or "right".
 *
 * @class TableHeader
 * @constructor
 */

var TableHeader = (function (_React$Component) {
  _inherits(TableHeader, _React$Component);

  function TableHeader() {
    var _this = this;

    _classCallCheck(this, TableHeader);

    _get(Object.getPrototypeOf(TableHeader.prototype), 'constructor', this).apply(this, arguments);

    this.emitSortEvent = function () {
      var columnToSort = _this.props.name;
      var sortOrder = _this.props.sortOrder || 'asc';
      _this.context.onSort(columnToSort, sortOrder);
    };
  }

  _createClass(TableHeader, [{
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      var className = (0, _classnames2['default'])("ui-table-header", this.props.className, _defineProperty({}, 'ui-table-header--align-' + this.props.align, this.props.align));

      var onClick = this.props.sortable ? this.emitSortEvent.bind(this) : '';

      return _react2['default'].createElement(
        'th',
        { className: className, onClick: onClick, name: this.props.name },
        this.props.children
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * Aligns the content of the cell (can be "left" or "right").
       *
       * @property align
       * @type {String}
       */
      align: _react2['default'].PropTypes.string,

      /**
       * Name of the column to sort. Should correspond to name in database.
       *
       * @property name
       * @type {String}
       */
      name: function name(props, propName, componentName) {
        if (props.sortable && !props[propName]) {
          return new Error('Sortable columns require a prop of name of type String');
        }
        if (typeof props[propName] !== 'string') {
          return new Error('name must be a string');
        }
      },

      /**
       * Whether column is sortable.
       *
       * @property sortable
       * @type {Boolean}
       */
      sortable: _react2['default'].PropTypes.boolean,

      /**
       * Order to sort in - either 'asc' (ascending) or 'desc' (descending)
       *
       * @property sortOrder
       * @type {String}
       */
      sortOrder: _react2['default'].PropTypes.string
    },

    /**
     * Sort handler passed from table context
     *
     * @property onSort
     * @type {Function}
     */
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {
      onSort: _react2['default'].PropTypes.func
    },

    /**
     * Emits sort event to parent context - table.
     *
     * @method emitSortEvent
     */
    enumerable: true
  }]);

  return TableHeader;
})(_react2['default'].Component);

exports['default'] = TableHeader;
module.exports = exports['default'];