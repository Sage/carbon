'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _babelTransform = require('livereactload/babel-transform');

var _babelTransform2 = _interopRequireDefault(_babelTransform);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('./../../icon');

var _icon2 = _interopRequireDefault(_icon);

var _ether = require('../../../utils/ether');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _components = {
  TableHeader: {
    displayName: 'TableHeader'
  }
};

var _livereactloadBabelTransform2 = (0, _babelTransform2.default)({
  filename: 'src/components/table/table-header/table-header.js',
  components: _components,
  locals: [],
  imports: [_react3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _livereactloadBabelTransform2(Component, id);
  };
}

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
var TableHeader = _wrapComponent('TableHeader')((_temp2 = _class = function (_React$Component) {
  _inherits(TableHeader, _React$Component);

  function TableHeader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TableHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TableHeader.__proto__ || Object.getPrototypeOf(TableHeader)).call.apply(_ref, [this].concat(args))), _this), _this.emitSortEvent = function () {
      var sortOrder = _this.context.sortOrder || 'desc';

      // If this is the current sorted column. flip order
      if (_this.sorted) {
        sortOrder = _this.context.sortOrder === 'asc' ? 'desc' : 'asc';
      }

      _this.context.onSort(_this.props.name, sortOrder);
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
    key: 'tableHeaderClasses',


    /**
     * Returns classes to be used on the TH element.
     *
     * @method tableHeaderClasses
     * @return {String}
     */
    value: function tableHeaderClasses() {
      var _classNames;

      return (0, _classnames2.default)("carbon-table-header", this.props.className, (_classNames = {}, _defineProperty(_classNames, 'carbon-table-header--align-' + this.props.align, this.props.align), _defineProperty(_classNames, 'carbon-table-header--sortable', this.props.sortable), _classNames));
    }

    /**
     * Returns props to be used on the TH element.
     *
     * @method tableHeaderProps
     * @return {Object}
     */

  }, {
    key: 'render',


    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      return _react3.default.createElement(
        'th',
        _extends({}, this.tableHeaderProps, this.componentTags(this.props)),
        this.props.children,
        this.sortIconHTML
      );
    }
  }, {
    key: 'componentTags',
    value: function componentTags(props) {
      return {
        'data-component': 'table-header',
        'data-element': props['data-element'],
        'data-role': props['data-role']
      };
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
        var type = this.context.sortOrder === 'desc' ? 'sort-down' : 'sort-up';
        return _react3.default.createElement(_icon2.default, { type: type, className: this.sortIconClasses });
      }
    }

    /**
     * Returns classes to apply to the sort icon
     *
     * @method sortIconClasses
     * @return {JSX} Icon JSX
     */

  }, {
    key: 'sortIconClasses',
    get: function get() {
      return (0, _classnames2.default)('carbon-table-header__icon', _defineProperty({}, 'carbon-table-header__icon--align-' + this.props.align, this.props.align));
    }
  }, {
    key: 'tableHeaderProps',
    get: function get() {
      var _validProps = (0, _ether.validProps)(this),
          props = _objectWithoutProperties(_validProps, []);

      delete props.children;

      props.className = this.tableHeaderClasses();
      props.onClick = this.props.sortable ? this.emitSortEvent.bind(this) : '';

      return props;
    }
  }]);

  return TableHeader;
}(_react3.default.Component), _class.propTypes = {

  /**
   * Aligns the content of the cell (can be "left", "center" or "right").
   *
   * @property align
   * @type {String}
   */
  align: _propTypes2.default.string,

  /**
   * Name of the column to sort. Should correspond to name in database.
   *
   * @property name
   * @type {String}
   */
  name: function name(props, propName) {
    if (props.sortable) {
      if (!props[propName]) {
        throw new Error('Sortable columns require a prop of name of type String');
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
  sortable: _propTypes2.default.bool
}, _class.contextTypes = {
  onSort: _propTypes2.default.func,
  sortedColumn: _propTypes2.default.string,
  sortOrder: _propTypes2.default.string
}, _temp2));

exports.default = TableHeader;