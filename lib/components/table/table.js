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

var _tableRow = require('./table-row');

var _tableRow2 = _interopRequireDefault(_tableRow);

var _tableCell = require('./table-cell');

var _tableCell2 = _interopRequireDefault(_tableCell);

var _tableHeader = require('./table-header');

var _tableHeader2 = _interopRequireDefault(_tableHeader);

var _pager = require('./../pager');

var _pager2 = _interopRequireDefault(_pager);

/**
 * A Table widget.
 *
 * == How to use a Table in a component:
 *
 * In your file:
 *
 *   import { Table, TableRow, TableCell, TableHeader } from 'carbon/lib/components/table';
 *
 * To render a Table:
 *
 *   // map data to table rows
 *   let tableRows = (
 *     this.props.data.map((datum, key) => {
 *       return (
 *         <TableRow>
 *           <TableCell>
 *             { datum.firstName }
 *           </TableCell>
 *
 *           <TableCell>
 *             { datum.lastName }
 *           </TableCell>
 *         </TableRow>
 *       );
 *     });
 *   );
 *
 *   // prepend array of rows with a header row
 *   tableRows.unshift(
 *     <TableRow>
 *       <TableHeader>First Name</TableHeader>
 *       <TableHeader>Last Name</TableHeader>
 *     </TableRow>
 *   );
 *
 *   // render the table with the table rows
 *   <Table>
 *     { tableRows }
 *   </Table>
 *
 * == Pagination
 *
 * To add a pagination footer to the table you will need to pass some extra props to the table
 *
 *  let sizeOptions = Immutable.fromJS([{ id: '10', name: 10 }, { id: '25', name: 25 }, { id: '50', name: 50 }]),
 *
 * <Table
 *   paginate={ true }                        // Show the pagination footer
 *   currentPage='1'                          // Required - Current visible page
 *   pageSize='10'                            // Required - Number of records to show per page
 *   totalRecords                             // Required - Total number of records
 *   showPageSizeSelection={ false }          // Options  - Show page size selection
 *   pageSizeSelectionOptions={ sizeOptions } // Optional - Page Size Options
 * />
 *
 * @class Table
 * @constructor
 */

var Table = (function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table() {
    var _this = this;

    _classCallCheck(this, Table);

    _get(Object.getPrototypeOf(Table.prototype), 'constructor', this).apply(this, arguments);

    this.tableHeight = 0;

    this.getChildContext = function () {
      return {
        onSort: _this.onSort
      };
    };

    this.emitOnChangeCallback = function (element, options) {
      _this.props.onChange(element, options);
    };

    this.onPagination = function (currentPage, pageSize) {
      var options = _this.emitOptions;
      options.currentPage = currentPage;
      options.pageSize = pageSize;
      _this.emitOnChangeCallback('pager', options);
    };

    this.onSort = function (columnToSort, sortOrder) {
      var options = _this.emitOptions;
      options.columnToSort = columnToSort;
      options.sortOrder = sortOrder;
      _this.emitOnChangeCallback('table', options);
    };
  }

  _createClass(Table, [{
    key: 'componentDidMount',

    /**
     * Lifecycle for after mounting
     * Resize the table to set the correct height on pageload
     *
     * @method componentDidMount
     * @return {Void}
     */
    value: function componentDidMount() {
      this.resizeTable();
    }
  }, {
    key: 'componentDidUpdate',

    /**
     * Lifecycle for after a update has happened
     * If pageSize has updated to a smaller value - reset table height
     * else resize table
     *
     * @method componentDidUpdate
     * @return {Void}
     */
    value: function componentDidUpdate(prevProps) {
      if (this.shouldResetTableHeight(prevProps)) {
        this.resetTableHeight();
      } else {
        this.resizeTable();
      }
    }

    /**
     * Reset the minHeight and tableHeight of the table
     *
     * @method resetTableHeight
     * @return {Void}
     */
  }, {
    key: 'resetTableHeight',
    value: function resetTableHeight() {
      var _this2 = this;

      this._wrapper.style.minHeight = '0';
      this.tableHeight = 0;
      setTimeout(function () {
        _this2.resizeTable();
      }, 0);
    }

    /**
     * Increase the minheight of the table if the new height
     * is greater than the previous
     *
     * @method resizeTable
     * @return {Void}
     */
  }, {
    key: 'resizeTable',
    value: function resizeTable() {
      if (this._table.offsetHeight > this.tableHeight) {
        this.tableHeight = this._table.offsetHeight;
        this._wrapper.style.minHeight = this.tableHeight + 'px';
      }
    }

    /**
     * Test if the table height should be reset to 0
     *
     * @method shouldResetTableHeight
     * @param prevProps - props before update
     * @return {Boolean}
     */
  }, {
    key: 'shouldResetTableHeight',
    value: function shouldResetTableHeight(prevProps) {
      return prevProps.pageSize > this.pageSize;
    }

    /**
     * Get pageSize for table
     *
     * @method pageSize
     * @return {String} table page size
     */
  }, {
    key: 'render',

    /**
     * Renders the component.
     *
     * @method render
     */
    value: function render() {
      var _this3 = this;

      return _react2['default'].createElement(
        'div',
        { className: this.mainClasses },
        _react2['default'].createElement(
          'div',
          { className: this.wrapperClasses, ref: function (wrapper) {
              _this3._wrapper = wrapper;
            } },
          _react2['default'].createElement(
            'table',
            { className: this.tableClasses, ref: function (table) {
                _this3._table = table;
              } },
            _react2['default'].createElement(
              'tbody',
              null,
              this.props.children
            )
          )
        ),
        this.pager
      );
    }
  }, {
    key: 'pageSize',
    get: function get() {
      return this.props.pageSize;
    }

    /**
     * Emit onChange event with options
     * needed to fetch the new data
     *
     * @method emitOnChangeCallback
     * @param {String} element changed element
     * @param {Object} options base and updated options
     * @return {Void}
     */
  }, {
    key: 'emitOptions',

    /**
     * Base Options to be emitted by onChange
     *
     * @method emitOptions
     * @return {Object} options to emit
     */
    get: function get() {
      return {
        // What if paginate if false - think about when next change functionality is added
        currentPage: this.props.currentPage || '',
        pageSize: this.props.pageSize || ''
      };
    }

    /**
     * Props to pass to pager component
     *
     * @method pagerProps
     * @return {Object} props
     */
  }, {
    key: 'pagerProps',
    get: function get() {
      return {
        currentPage: this.props.currentPage,
        onPagination: this.onPagination,
        pageSize: this.defaultPageSize,
        pageSizeSelectionOptions: this.props.pageSizeSelectionOptions,
        showPageSizeSelection: this.props.showPageSizeSelection,
        totalRecords: this.props.totalRecords
      };
    }

    /**
     * Page size for page load
     *
     * @method defaultPageSize
     * @return {Void}
     */
  }, {
    key: 'defaultPageSize',
    get: function get() {
      if (this.props.pageSize) {
        return this.props.pageSize;
      } else if (this.props.pageSizeSelectionOptions) {
        return this.props.pageSizeSelectionOptions.first().get('id');
      }
      return '10';
    }

    /**
     * Returns the pager if paginate is true
     *
     * @method pager
     * @return {JSX} pager
     */
  }, {
    key: 'pager',
    get: function get() {
      if (this.props.paginate) {
        return _react2['default'].createElement(_pager2['default'], this.pagerProps);
      }
    }

    /**
     * Classes that apply to the parent table div
     *
     * @method mainClasses
     * @return {String}
     */
  }, {
    key: 'mainClasses',
    get: function get() {
      return (0, _classnames2['default'])('ui-table', this.props.className);
    }

    /**
     * Classes that apply to the table wrapper
     *
     * @method wrapperClasses
     * @return {String}
     */
  }, {
    key: 'wrapperClasses',
    get: function get() {
      return (0, _classnames2['default'])('ui-table__wrapper', this.props.className, _defineProperty({}, 'ui-table--pager', this.props.paginate));
    }

    /**
     * Classes to apply to the table
     *
     * @method tableClasses
     * @return {String}
     */
  }, {
    key: 'tableClasses',
    get: function get() {
      return 'ui-table__table';
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * Emitted when table component changes e.g.
       * Pager, sorting, filter
       *
       * @property onChange
       * @type {Function}
       */
      onChange: _react2['default'].PropTypes.func,

      /**
       * Show the pagination footer
       *
       * @property paginate
       * @type {Boolean}
       */
      paginate: _react2['default'].PropTypes.bool,

      /**
       * Pagination
       * Current Visible Page
       *
       * @property currentPage
       * @type {String}
       */
      currentPage: _react2['default'].PropTypes.string,

      /**
       * Pagination
       * Page Size of grid (number of visible records)
       *
       * @property pageSize
       * @type {String}
       */
      pageSize: _react2['default'].PropTypes.string,

      /**
       * Pagination
       * Options for pageSize default - 10, 25, 50
       *
       * @property pageSizeSelectionOptions
       * @type {Object} Immutable
       */
      pageSizeSelectionOptions: _react2['default'].PropTypes.object,

      /**
       * Pagination
       * Is the page size dropdown visible
       *
       * @property showPageSizeSelection
       * @type {Boolean}
       */
      showPageSizeSelection: _react2['default'].PropTypes.bool,

      /**
       * Pagination
       * Total number of records in the grid
       *
       * @property totalRecords
       * @type {String}
       */
      totalRecords: _react2['default'].PropTypes.string
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      /**
       * Defines a context object for child components of the table component.
       * https://facebook.github.io/react/docs/context.html
       *
       * @property table
       * @type {Object}
       */
      onSort: _react2['default'].PropTypes.func
    },

    /**
     * Returns table object to child components.
     *
     * @method getChildContext
     * @return {void}
     */
    enumerable: true
  }]);

  return Table;
})(_react2['default'].Component);

exports.Table = Table;
exports.TableRow = _tableRow2['default'];
exports.TableCell = _tableCell2['default'];
exports.TableHeader = _tableHeader2['default'];

/**
 * Maintains the height of the table
 *
 * @property tableHeight
 * @type {Number}
 */

/**
 * Handles when the pager emits a onChange event
 * Passes data to emitOnChangeCallback in the correct
 * format
 *
 * @method onPagination
 * @param {String} currentPage
 * @param {String} pageSize
 * @return {Void}
 */