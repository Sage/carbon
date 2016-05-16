'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _actionToolbar = require('./../action-toolbar');

var _actionToolbar2 = _interopRequireDefault(_actionToolbar);

var _tableRow = require('./table-row');

var _tableRow2 = _interopRequireDefault(_tableRow);

var _tableCell = require('./table-cell');

var _tableCell2 = _interopRequireDefault(_tableCell);

var _tableHeader = require('./table-header');

var _tableHeader2 = _interopRequireDefault(_tableHeader);

var _pager = require('./../pager');

var _pager2 = _interopRequireDefault(_pager);

var _spinner = require('./../spinner');

var _spinner2 = _interopRequireDefault(_spinner);

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
 *   thead={ TableRow }                       // Optional - A TableRow to be wrapped in <thead>
 * />
 *
 * == Sorting
 *
 *  To enable column sorting, you will need to configure the Table Header component.
 * See the Table Header component documentation.
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

    this.getChildContext = function () {
      return {
        attachActionToolbar: _this.attachActionToolbar,
        detachActionToolbar: _this.detachActionToolbar,
        attachToTable: _this.attachToTable,
        detachFromTable: _this.detachFromTable,
        checkSelection: _this.checkSelection,
        highlightRow: _this.highlightRow,
        onSort: _this.onSort,
        highlightable: _this.props.highlightable,
        selectable: _this.props.selectable,
        selectAll: _this.selectAll,
        selectRow: _this.selectRow,
        sortedColumn: _this.sortedColumn,
        sortOrder: _this.sortOrder
      };
    };

    this.state = {
      selectedCount: 0
    };
    this.tableHeight = 0;
    this.rows = {};
    this.highlightedRow = {
      id: null,
      row: null
    };
    this.selectedRows = {};
    this.selectAllComponent = null;
    this.actionToolbarComponent = null;

    this.attachActionToolbar = function (comp) {
      _this.actionToolbarComponent = comp;
    };

    this.detachActionToolbar = function () {
      _this.actionToolbarComponent = null;
    };

    this.attachToTable = function (id, row) {
      _this.rows[id] = row;
    };

    this.detachFromTable = function (id) {
      delete _this.rows[id];
    };

    this.refresh = function () {
      _this.resetHighlightedRow();
      _this.selectedRows = [];
      _this.actionToolbarComponent.setState({
        total: 0,
        selected: []
      });
      _this.emitOnChangeCallback('refresh', _this.emitOptions());
    };

    this.resetHighlightedRow = function () {
      if (_this.highlightedRow.row && _this.rows[_this.highlightedRow.row.rowID]) {
        _this.highlightedRow.row.setState({ highlighted: false });
      }

      _this.highlightedRow = {
        id: null,
        row: null
      };
    };

    this.highlightRow = function (id, row) {
      var state = true;

      if (_this.highlightedRow.id !== null) {
        if (id === _this.highlightedRow.id) {
          // is the same row - toggle the current state
          state = !row.state.highlighted;
        } else {
          // is a different row - reset the old row
          _this.resetHighlightedRow();
        }
      }

      // set state of the highlighted row
      row.setState({ highlighted: state });

      // update the current highlighted row
      _this.highlightedRow = {
        id: id,
        row: row
      };

      if (_this.props.onHighlight) {
        // trigger onHighlight event
        _this.props.onHighlight(id, state, row);
      }
    };

    this.selectRow = function (id, row, state, skipCallback) {
      var isSelected = _this.selectedRows[id] !== undefined;

      // if row state has not changed - return early
      if (state === isSelected) {
        return;
      }

      if (_this.selectAllComponent) {
        // if there is a select all component, reset it
        _this.selectAllComponent.setState({ selected: false });
        _this.selectAllComponent = null;
      }

      if (!state && isSelected) {
        // if unselecting the row, delete it from the object
        delete _this.selectedRows[id];
      } else if (!row.props.selectAll) {
        // add current row to the list of selected rows
        _this.selectedRows[id] = row;
      }

      // set new state for the row
      row.setState({ selected: state });

      var keys = Object.keys(_this.selectedRows);

      if (_this.actionToolbarComponent && !skipCallback) {
        // update action toolbar
        _this.actionToolbarComponent.setState({
          total: keys.length,
          selected: keys
        });
      }

      if (_this.props.onSelect && !skipCallback) {
        // trigger onSelect event
        _this.props.onSelect(keys);
      }
    };

    this.selectAll = function (row) {
      var selectState = !row.state.selected;

      for (var key in _this.rows) {
        // update all the rows with the new state
        var _row = _this.rows[key];
        _this.selectRow(_row.props.uniqueID, _row, selectState, true);
      }

      // update the row with the new state
      row.setState({ selected: selectState });

      // if select state is true, track the select all component
      _this.selectAllComponent = selectState ? row : null;

      var keys = Object.keys(_this.selectedRows);

      if (_this.actionToolbarComponent) {
        // update action toolbar
        _this.actionToolbarComponent.setState({
          total: keys.length,
          selected: keys
        });
      }

      if (_this.props.onSelect) {
        // trigger onSelect event
        _this.props.onSelect(keys);
      }
    };

    this.checkSelection = function (id, row) {
      var isSelected = _this.selectedRows[id] !== undefined,
          isHighlighted = _this.highlightedRow.id === id;

      if (isSelected !== row.state.selected) {
        row.setState({ selected: isSelected });
      }

      if (isHighlighted !== row.state.highlighted) {
        row.setState({ highlighted: isHighlighted });
      }
    };

    this.emitOnChangeCallback = function (element, options) {
      if (_this.selectAllComponent) {
        // reset the select all component
        _this.selectAllComponent.setState({ selected: false });
        _this.selectAllComponent = null;
      }

      _this.props.onChange(element, options);
    };

    this.onPagination = function (currentPage, pageSize) {
      var options = _this.emitOptions();
      options.currentPage = currentPage;
      options.pageSize = pageSize;
      _this.emitOnChangeCallback('pager', options);
    };

    this.onSort = function (sortedColumn, sortOrder) {
      var options = _this.emitOptions();
      options.sortedColumn = sortedColumn;
      options.sortOrder = sortOrder;
      _this.emitOnChangeCallback('table', options);
    };

    this.emitOptions = function () {
      var props = arguments.length <= 0 || arguments[0] === undefined ? _this.props : arguments[0];

      var currentPage = props.currentPage || '';

      if (Number(props.currentPage) > Number(props.pageSize)) {
        currentPage = "1";
      }

      return {
        // What if paginate if false - think about when next change functionality is added
        currentPage: currentPage,
        filter: props.filter ? props.filter.toJS() : {},
        pageSize: props.pageSize || '',
        sortOrder: props.sortOrder || '',
        sortedColumn: props.sortedColumn || ''
      };
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

    /**
     * Lifecycle for after a update has happened
     * If filter has changed then emit the on change event.
     *
     * @method componentWillReceiveProps
     * @return {Void}
     */
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // if filter has changed, update the data
      if (!_immutable2['default'].is(this.props.filter, nextProps.filter)) {
        this.emitOnChangeCallback('filter', this.emitOptions(nextProps));
      }

      if (this.props.highlightable && nextProps.highlightable === false) {
        this.resetHighlightedRow();
      }

      if (this.props.selectable && nextProps.selectable === false) {
        for (var key in this.rows) {
          // update all the rows with the new state
          var row = this.rows[key];
          this.selectRow(row.props.uniqueID, row, false);
        }
        this.selectedRows = {};
      }
    }

    /**
     * Lifecycle for after a update has happened
     * If pageSize has updated to a smaller value - reset table height
     * else resize table
     *
     * @method componentDidUpdate
     * @return {Void}
     */
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.shouldResetTableHeight(prevProps)) {
        this.resetTableHeight();
      } else {
        this.resizeTable();
      }
    }
  }, {
    key: 'resetTableHeight',

    /**
     * Reset the minHeight and tableHeight of the table
     *
     * @method resetTableHeight
     * @return {Void}
     */
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
      var shrink = this.props.shrink && this._table.offsetHeight < this.tableHeight;

      if (shrink || this._table.offsetHeight > this.tableHeight) {
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
        this.actionToolbar,
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
            this.thead,
            _react2['default'].createElement(
              'tbody',
              null,
              this.tableContent
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
    key: 'sortedColumn',

    /**
     * Returns the currently sorted column.
     *
     * @method sortedColumn
     * @return {String}
     */
    get: function get() {
      return this.props.sortedColumn;
    }

    /**
     * Returns the current sort order.
     *
     * @method sortOrder
     * @return {String}
     */
  }, {
    key: 'sortOrder',
    get: function get() {
      return this.props.sortOrder;
    }

    /**
     * Handles what happens on sort.
     *
     * @method onSort
     * @param {String} sortedColumn
     * @param {String} sortOrder
     */
  }, {
    key: 'pagerProps',

    /**
     * Props to pass to pager component
     *
     * @method pagerProps
     * @return {Object} props
     */
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

    /**
     * Returns thead content wrapped in <thead>
     *
     * @method thead
     * @return {JSX}
     */
  }, {
    key: 'thead',
    get: function get() {
      if (this.props.thead) {
        return _react2['default'].createElement(
          'thead',
          { className: 'ui-table__header' },
          this.props.thead
        );
      }
    }

    /**
     * Returns the component for the action toolbar.
     *
     * @method actionToolbar
     * @return {JSX}
     */
  }, {
    key: 'actionToolbar',
    get: function get() {
      if (!this.props.selectable) {
        return null;
      }

      return _react2['default'].createElement(_actionToolbar2['default'], { total: this.state.selectedCount, actions: this.props.actions });
    }

    /**
     * Returns a row to be used for loading.
     *
     * @method loadingRow
     * @return {Object} JSX
     */
  }, {
    key: 'loadingRow',
    get: function get() {
      return _react2['default'].createElement(
        _tableRow2['default'],
        { key: '__loading__', selectable: false, highlightable: false, hideMultiSelect: true },
        _react2['default'].createElement(
          _tableCell2['default'],
          { colSpan: '9999', align: 'center' },
          _react2['default'].createElement(
            _reactAddonsCssTransitionGroup2['default'],
            {
              transitionName: 'table-loading',
              transitionEnterTimeout: 300,
              transitionLeaveTimeout: 300,
              transitionAppearTimeout: 300,
              transitionAppear: true
            },
            _react2['default'].createElement(_spinner2['default'], { size: 'small' })
          )
        )
      );
    }

    /**
     * Returns a row to be used for no data.
     *
     * @method emptyRow
     * @return {Object} JSX
     */
  }, {
    key: 'emptyRow',
    get: function get() {
      return _react2['default'].createElement(
        _tableRow2['default'],
        { key: '__loading__', selectable: false, highlightable: false },
        _react2['default'].createElement(
          _tableCell2['default'],
          { colSpan: '9999', align: 'center' },
          _i18nJs2['default'].t("table.no_data", { defaultValue: "No results to display" })
        )
      );
    }

    /**
     * Works out what content to display in the table.
     *
     * @method tableContent
     * @return {Object} JSX
     */
  }, {
    key: 'tableContent',
    get: function get() {
      var children = this.props.children,
          hasChildren = children;

      // if using immutable js we can count the children
      if (children && children.count) {
        var numOfChildren = children.count(),
            onlyChildIsHeader = numOfChildren === 1 && children.first().props.as === "header";

        if (onlyChildIsHeader) {
          if (this._hasRetreivedData) {
            // if already retreived data then show empty row
            children = children.push(this.emptyRow);
          } else {
            // if not yet retreived data then show loading row
            children = children.push(this.loadingRow);
          }
        } else {
          // check if there actually are any children
          hasChildren = numOfChildren > 0;
        }
      }

      if (hasChildren) {
        return children;
      } else if (this._hasRetreivedData) {
        return this.emptyRow;
      } else {
        return this.loadingRow;
      }
    }
  }], [{
    key: 'propTypes',
    value: {
      /**
       * Data used to filter the data
       *
       * @property filter
       * @type {Object}
       */
      filter: _react2['default'].PropTypes.object,

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
       * Enables multi-selectable table rows.
       *
       * @property selectable
       * @type {Boolean}
       */
      selectable: _react2['default'].PropTypes.bool,

      /**
       * Enables highlightable table rows.
       *
       * @property highlightable
       * @type {Boolean}
       */
      highlightable: _react2['default'].PropTypes.bool,

      /**
       * A callback for when a row is selected.
       *
       * @property onSelect
       * @type {Function}
       */
      onSelect: _react2['default'].PropTypes.func,

      /**
       * A callback for when a row is highlighted.
       *
       * @property onHighlight
       * @type {Function}
       */
      onHighlight: _react2['default'].PropTypes.func,

      /**
       * Pagination
       * Total number of records in the grid
       *
       * @property totalRecords
       * @type {String}
       */
      totalRecords: _react2['default'].PropTypes.string,

      /**
       * Allow table to shrink in size.
       *
       * @property shrink
       * @type {Boolean}
       */
      shrink: _react2['default'].PropTypes.bool,

      /**
       * TableRows to be wrapped in <thead>
       *
       * @property thead
       * @type {Object}
       */
      thead: _react2['default'].PropTypes.object
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      /**
       * Defines a context object for child components of the table component.
       * https://facebook.github.io/react/docs/context.html
       *
       * @property childContextTypes
       * @type {Object}
       */
      attachActionToolbar: _react2['default'].PropTypes.func, // tracks the action toolbar component
      detachActionToolbar: _react2['default'].PropTypes.func, // tracks the action toolbar component
      attachToTable: _react2['default'].PropTypes.func, // attach the row to the table
      checkSelection: _react2['default'].PropTypes.func, // a function to check if the row is currently selected
      detachFromTable: _react2['default'].PropTypes.func, // detach the row from the table
      highlightRow: _react2['default'].PropTypes.func, // highlights the row
      selectable: _react2['default'].PropTypes.bool, // table can enable all rows to be multi-selectable
      onSort: _react2['default'].PropTypes.func, // a callback function for when a sort order is updated
      selectAll: _react2['default'].PropTypes.func, // a callback function for when all visible rows are selected
      selectRow: _react2['default'].PropTypes.func, // a callback function for when a row is selected
      highlightable: _react2['default'].PropTypes.bool, // table can enable all rows to be highlightable
      sortOrder: _react2['default'].PropTypes.string, // the current sort order applied
      sortedColumn: _react2['default'].PropTypes.string // the currently sorted column
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
 * The rows currently attached to the table.
 *
 * @property rows
 * @type {Object}
 */

/**
 * Tracks the currently highlighted row.
 *
 * @property highlightedRow
 * @type {String}
 */

/**
 * Tracks the rows which are currently selected.
 *
 * @property selectedRows
 * @type {Object}
 */

/**
 * Tracks the component used for select all.
 *
 * @property selectAllComponent
 * @type {Object}
 */

/**
 * Tracks the action toolbar component.
 *
 * @property actionToolbarComponent
 * @type {Object}
 */

/**
 * Attaches action toolbar to the table.
 *
 * @method attachActionToolbar
 * @param {Object}
 */

/**
 * Detaches action toolbar to the table.
 *
 * @method detachActionToolbar
 * @param {Object}
 */

/**
 * Attaches a row to the table.
 *
 * @method attachToTable
 * @param {String} unique id
 * @param {Object} the row
 * @return {Void}
 */

/**
 * Detaches a row from the table.
 *
 * @method detachFromTable
 * @param {String} unique id
 * @return {Void}
 */

/**
 * Refreshes the grid and resets any selected rows.
 *
 * @method refresh
 * @return {Void}
 */

/**
 * Resets the highlighted row.
 *
 * @method resetHighlightedRow
 * @return {Void}
 */

/**
 * Highlights the row in the table.
 *
 * @method highlightRow
 * @param {String} unique id
 * @param {Object} the row
 * @return {Void}
 */

/**
 * Selects the row in the table.
 *
 * @method selectRow
 * @param {String} unique id
 * @param {Object} the row
 * @param {Boolean} the new selected state
 * @param {Boolean} should method skip the callback
 * @return {Void}
 */

/**
 * Selects all the currently visible rows.
 *
 * @method selectAll
 * @param {Object} the select all row (usually the header)
 * @return {Void}
 */

/**
 * Checks the rows status using the table's stored checked rows and updates
 * its status based on this.
 *
 * @method checkSelection
 * @param {String} unique id
 * @param {Object} the row
 * @return {Void}
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

/**
 * Base Options to be emitted by onChange
 *
 * @method emitOptions
 * @return {Object} options to emit
 */