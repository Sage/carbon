/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_icon = require('./../../icon');

/*istanbul ignore next*/
var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A TableHeader widget.
 *
 * == How to use a TableHeader in a component:
 *
 * See documentation for Table component.
 *
 * You can set a property of 'align' which should be a string. This will
 * align the content to either "left", "center" or "right".
 *
 * == Sortable Columns:
 *
 * To make a column sortable, pass a prop of 'sortable={ true }' to the corresponding
 * TableHeader.
 * Sortable columns also require a 'name' prop which must correspond to the database key.
 *
 * You can also provide a custom sortOrder - 'asc' (ascending) or 'desc' (descending).
 * By Default columns are sorted in ascending order.
 *
 * See the Table documentation for more information on hooking up a change handler
 * to setup sort functionality in your app.
 *
 * @class TableHeader
 * @constructor
 */

var TableHeader = function (_React$Component) {
  _inherits(TableHeader, _React$Component);

  function TableHeader() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, TableHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TableHeader)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.emitSortEvent = function () {
      var sortOrder = /*istanbul ignore next*/_this.context.sortOrder || 'desc';

      // If this is the current sorted column. flip order
      if ( /*istanbul ignore next*/_this.sorted) {
        sortOrder = /*istanbul ignore next*/_this.context.sortOrder === 'asc' ? 'desc' : 'asc';
      }

      /*istanbul ignore next*/_this.context.onSort( /*istanbul ignore next*/_this.props.name, sortOrder);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /**
   * Sort handler passed from table context
   *
   * @property onSort
   * @type {Function}
   */


  /**
   * Emits sort event to parent context - table.
   *
   * @method emitSortEvent
   */


  _createClass(TableHeader, [{
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'th',
          this.tableHeaderProps,
          this.props.children,
          this.sortIconHTML
        )
      );
    }
  }, {
    key: 'sorted',


    /**
     * Determines if this column is currently sorted.
     *
     * @method sorted
     * @return {Boolean}
     */
    get: function get() {
      return this.props.sortable && this.context.sortedColumn === this.props.name;
    }

    /**
     * Returns sort icon HTML if column is sortable and has been sorted.
     *
     * @method sortIconHTML
     * @return {JSX} Icon JSX
     */

  }, {
    key: 'sortIconHTML',
    get: function get() {
      if (this.sorted) {
        var type = this.context.sortOrder === 'desc' ? 'sort-up' : 'sort-down';
        return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_icon2.default, /*istanbul ignore next*/{ type: type, className: 'ui-table-header__icon' })
        );
      }
    }

    /**
     * Returns classes to be used on the TH element.
     *
     * @method tableHeaderClasses
     * @return {String}
     */

  }, {
    key: 'tableHeaderClasses',
    get: function get() {
      /*istanbul ignore next*/
      var _classNames;

      return (/*istanbul ignore next*/(0, _classnames2.default)("ui-table-header", this.props.className, /*istanbul ignore next*/(_classNames = {}, _defineProperty(_classNames, 'ui-table-header--align-' + this.props.align, this.props.align), _defineProperty(_classNames, 'ui-table-header--sortable', this.props.sortable), _classNames))
      );
    }

    /**
     * Returns props to be used on the TH element.
     *
     * @method tableHeaderProps
     * @return {Object}
     */

  }, {
    key: 'tableHeaderProps',
    get: function get() {
      /*istanbul ignore next*/var _props = this.props;
      /*istanbul ignore next*/var children = _props.children;
      /*istanbul ignore next*/
      var props = _objectWithoutProperties(_props, ['children']);

      props.className = this.tableHeaderClasses;
      props.onClick = this.props.sortable ? this.emitSortEvent.bind(this) : '';

      return props;
    }
  }]);

  return TableHeader;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/TableHeader.propTypes = {

  /**
   * Aligns the content of the cell (can be "left", "center" or "right").
   *
   * @property align
   * @type {String}
   */
  align: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Name of the column to sort. Should correspond to name in database.
   *
   * @property name
   * @type {String}
   */
  name: function /*istanbul ignore next*/name(props, propName, componentName) {
    if (props.sortable) {
      if (!props[propName]) {
        throw new Error( /*istanbul ignore next*/'Sortable columns require a prop of name of type String. See render method of ' + componentName);
      }
      if (typeof props[propName] !== 'string') {
        throw new Error('name must be a string');
      }
    }
  },

  /**
   * Whether column is sortable.
   *
   * @property sortable
   * @type {Boolean}
   */
  sortable: /*istanbul ignore next*/_react2.default.PropTypes.bool
};
/*istanbul ignore next*/TableHeader.contextTypes = {
  onSort: /*istanbul ignore next*/_react2.default.PropTypes.func,
  sortedColumn: /*istanbul ignore next*/_react2.default.PropTypes.string,
  sortOrder: /*istanbul ignore next*/_react2.default.PropTypes.string
};
/*istanbul ignore next*/exports.default = TableHeader;