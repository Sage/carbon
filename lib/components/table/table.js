/*istanbul ignore next*/'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableHeader = exports.TableCell = exports.TableRow = exports.Table = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var /*istanbul ignore next*/_react = require('react');

/*istanbul ignore next*/
var _react2 = _interopRequireDefault(_react);

var /*istanbul ignore next*/_reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

/*istanbul ignore next*/
var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var /*istanbul ignore next*/_classnames = require('classnames');

/*istanbul ignore next*/
var _classnames2 = _interopRequireDefault(_classnames);

var /*istanbul ignore next*/_immutable = require('immutable');

/*istanbul ignore next*/
var _immutable2 = _interopRequireDefault(_immutable);

var /*istanbul ignore next*/_i18nJs = require('i18n-js');

/*istanbul ignore next*/
var _i18nJs2 = _interopRequireDefault(_i18nJs);

var /*istanbul ignore next*/_actionToolbar = require('./../action-toolbar');

/*istanbul ignore next*/
var _actionToolbar2 = _interopRequireDefault(_actionToolbar);

var /*istanbul ignore next*/_tableRow = require('./table-row');

/*istanbul ignore next*/
var _tableRow2 = _interopRequireDefault(_tableRow);

var /*istanbul ignore next*/_tableCell = require('./table-cell');

/*istanbul ignore next*/
var _tableCell2 = _interopRequireDefault(_tableCell);

var /*istanbul ignore next*/_tableHeader = require('./table-header');

/*istanbul ignore next*/
var _tableHeader2 = _interopRequireDefault(_tableHeader);

var /*istanbul ignore next*/_pager = require('./../pager');

/*istanbul ignore next*/
var _pager2 = _interopRequireDefault(_pager);

var /*istanbul ignore next*/_spinner = require('./../spinner');

/*istanbul ignore next*/
var _spinner2 = _interopRequireDefault(_spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Table);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Table)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.getChildContext = function () {
      return {
        attachActionToolbar: /*istanbul ignore next*/_this.attachActionToolbar,
        detachActionToolbar: /*istanbul ignore next*/_this.detachActionToolbar,
        attachToTable: /*istanbul ignore next*/_this.attachToTable,
        detachFromTable: /*istanbul ignore next*/_this.detachFromTable,
        checkSelection: /*istanbul ignore next*/_this.checkSelection,
        highlightRow: /*istanbul ignore next*/_this.highlightRow,
        onSort: /*istanbul ignore next*/_this.onSort,
        highlightable: /*istanbul ignore next*/_this.props.highlightable,
        selectable: /*istanbul ignore next*/_this.props.selectable,
        selectAll: /*istanbul ignore next*/_this.selectAll,
        selectRow: /*istanbul ignore next*/_this.selectRow,
        sortedColumn: /*istanbul ignore next*/_this.sortedColumn,
        sortOrder: /*istanbul ignore next*/_this.sortOrder
      };
    }, _this.state = {
      selectedCount: 0
    }, _this.tableHeight = 0, _this.rows = {}, _this.highlightedRow = {
      id: null,
      row: null
    }, _this.selectedRows = {}, _this.selectAllComponent = null, _this.actionToolbarComponent = null, _this.attachActionToolbar = function (comp) {
      /*istanbul ignore next*/_this.actionToolbarComponent = comp;
    }, _this.detachActionToolbar = function () {
      /*istanbul ignore next*/_this.actionToolbarComponent = null;
    }, _this.attachToTable = function (id, row) {
      /*istanbul ignore next*/_this.rows[id] = row;
    }, _this.detachFromTable = function (id) {
      delete /*istanbul ignore next*/_this.rows[id];
    }, _this.refresh = function () {
      /*istanbul ignore next*/_this.resetHighlightedRow();
      /*istanbul ignore next*/_this.selectedRows = [];
      if ( /*istanbul ignore next*/_this.actionToolbarComponent) {
        /*istanbul ignore next*/_this.actionToolbarComponent.setState({
          total: 0,
          selected: []
        });
      }
      /*istanbul ignore next*/_this.emitOnChangeCallback('refresh', /*istanbul ignore next*/_this.emitOptions());
    }, _this.resetHighlightedRow = function () {
      if ( /*istanbul ignore next*/_this.highlightedRow.row && /*istanbul ignore next*/_this.rows[/*istanbul ignore next*/_this.highlightedRow.row.rowID]) {
        /*istanbul ignore next*/_this.highlightedRow.row.setState({ highlighted: false });
      }

      /*istanbul ignore next*/_this.highlightedRow = {
        id: null,
        row: null
      };
    }, _this.highlightRow = function (id, row) {
      var state = true;

      if ( /*istanbul ignore next*/_this.highlightedRow.id !== null) {
        if (id === /*istanbul ignore next*/_this.highlightedRow.id) {
          // is the same row - toggle the current state
          state = !row.state.highlighted;
        } else {
          // is a different row - reset the old row
          /*istanbul ignore next*/_this.resetHighlightedRow();
        }
      }

      // set state of the highlighted row
      row.setState({ highlighted: state });

      // update the current highlighted row
      /*istanbul ignore next*/_this.highlightedRow = {
        id: id,
        row: row
      };

      if ( /*istanbul ignore next*/_this.props.onHighlight) {
        // trigger onHighlight event
        /*istanbul ignore next*/_this.props.onHighlight(id, state, row);
      }
    }, _this.selectRow = function (id, row, state, skipCallback) {
      var isSelected = /*istanbul ignore next*/_this.selectedRows[id] !== undefined;

      // if row state has not changed - return early
      if (state === isSelected) {
        return;
      }

      if ( /*istanbul ignore next*/_this.selectAllComponent) {
        // if there is a select all component, reset it
        /*istanbul ignore next*/_this.selectAllComponent.setState({ selected: false });
        /*istanbul ignore next*/_this.selectAllComponent = null;
      }

      if (!state && isSelected) {
        // if unselecting the row, delete it from the object
        delete /*istanbul ignore next*/_this.selectedRows[id];
      } else if (!row.props.selectAll) {
        // add current row to the list of selected rows
        /*istanbul ignore next*/_this.selectedRows[id] = row;
      }

      // set new state for the row
      row.setState({ selected: state });

      if ( /*istanbul ignore next*/_this.actionToolbarComponent && !skipCallback) {
        var keys = Object.keys( /*istanbul ignore next*/_this.selectedRows);

        // update action toolbar
        /*istanbul ignore next*/_this.actionToolbarComponent.setState({
          total: keys.length,
          selected: /*istanbul ignore next*/_this.selectedRows
        });
      }

      if ( /*istanbul ignore next*/_this.props.onSelect && !skipCallback) {
        // trigger onSelect event
        /*istanbul ignore next*/_this.props.onSelect( /*istanbul ignore next*/_this.selectedRows);
      }
    }, _this.selectAll = function (row) {
      var selectState = !row.state.selected;

      for (var key in /*istanbul ignore next*/_this.rows) {
        // update all the rows with the new state
        var _row = /*istanbul ignore next*/_this.rows[key];
        if (_row.shouldHaveMultiSelectColumn) {
          /*istanbul ignore next*/_this.selectRow(_row.props.uniqueID, _row, selectState, true);
        }
      }

      // update the row with the new state
      row.setState({ selected: selectState });

      // if select state is true, track the select all component
      /*istanbul ignore next*/_this.selectAllComponent = selectState ? row : null;

      if ( /*istanbul ignore next*/_this.actionToolbarComponent) {
        var keys = Object.keys( /*istanbul ignore next*/_this.selectedRows);

        // update action toolbar
        /*istanbul ignore next*/_this.actionToolbarComponent.setState({
          total: keys.length,
          selected: /*istanbul ignore next*/_this.selectedRows
        });
      }

      if ( /*istanbul ignore next*/_this.props.onSelect) {
        // trigger onSelect event
        /*istanbul ignore next*/_this.props.onSelect( /*istanbul ignore next*/_this.selectedRows);
      }
    }, _this.checkSelection = function (id, row) {
      var isSelected = /*istanbul ignore next*/_this.selectedRows[id] !== undefined,
          isHighlighted = /*istanbul ignore next*/_this.highlightedRow.id === id;

      if (isSelected !== row.state.selected) {
        row.setState({ selected: isSelected });
      }

      if (isHighlighted !== row.state.highlighted) {
        row.setState({ highlighted: isHighlighted });
      }
    }, _this.emitOnChangeCallback = function (element, options) {
      if ( /*istanbul ignore next*/_this.selectAllComponent) {
        // reset the select all component
        /*istanbul ignore next*/_this.selectAllComponent.setState({ selected: false });
        /*istanbul ignore next*/_this.selectAllComponent = null;
      }

      /*istanbul ignore next*/_this.props.onChange(element, options);
    }, _this.onPagination = function (currentPage, pageSize) {
      var options = /*istanbul ignore next*/_this.emitOptions();
      options.currentPage = currentPage;
      options.pageSize = pageSize;
      /*istanbul ignore next*/_this.emitOnChangeCallback('pager', options);
    }, _this.onSort = function (sortedColumn, sortOrder) {
      var options = /*istanbul ignore next*/_this.emitOptions();
      options.sortedColumn = sortedColumn;
      options.sortOrder = sortOrder;
      /*istanbul ignore next*/_this.emitOnChangeCallback('table', options);
    }, _this.emitOptions = function () {
      /*istanbul ignore next*/var props = arguments.length <= 0 || arguments[0] === undefined ? /*istanbul ignore next*/_this.props : arguments[0];

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
    }, _temp), _possibleConstructorReturn(_this, _ret);
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
      if (! /*istanbul ignore next*/_immutable2.default.is(this.props.filter, nextProps.filter)) {
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

    /**
     * Returns table object to child components.
     *
     * @method getChildContext
     * @return {void}
     */


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

  }, {
    key: 'resetTableHeight',


    /**
     * Reset the minHeight and tableHeight of the table
     *
     * @method resetTableHeight
     * @return {Void}
     */
    value: function resetTableHeight() {
      /*istanbul ignore next*/
      var _this2 = this;

      this._wrapper.style.minHeight = '0';
      this.tableHeight = 0;
      setTimeout(function () {
        /*istanbul ignore next*/_this2.resizeTable();
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
      /*istanbul ignore next*/
      var _this3 = this;

      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/'div',
          /*istanbul ignore next*/{ className: this.mainClasses },
          this.actionToolbar,
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'div',
            /*istanbul ignore next*/{ className: this.wrapperClasses, ref: function /*istanbul ignore next*/ref(wrapper) {
                /*istanbul ignore next*/_this3._wrapper = wrapper;
              } },
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/'table',
              /*istanbul ignore next*/{ className: this.tableClasses, ref: function /*istanbul ignore next*/ref(table) {
                  /*istanbul ignore next*/_this3._table = table;
                } },
              this.thead,
              this.tbody
            )
          ),
          this.pager
        )
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


    /**
     * Base Options to be emitted by onChange
     *
     * @method emitOptions
     * @return {Object} options to emit
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
        return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_pager2.default, this.pagerProps)
        );
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
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-table', this.props.className)
      );
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
      return (/*istanbul ignore next*/(0, _classnames2.default)('ui-table__wrapper', this.props.className, /*istanbul ignore next*/_defineProperty({}, 'ui-table--pager', this.props.paginate))
      );
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
        return (/*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'thead',
            /*istanbul ignore next*/{ className: 'ui-table__header' },
            this.props.thead
          )
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

      return (/*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_actionToolbar2.default, /*istanbul ignore next*/{ total: this.state.selectedCount, actions: this.props.actions })
      );
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
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/_tableRow2.default,
          /*istanbul ignore next*/{ key: '__loading__', selectable: false, highlightable: false, hideMultiSelect: true },
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_tableCell2.default,
            /*istanbul ignore next*/{ colSpan: '42', align: 'center' },
            /*istanbul ignore next*/_react2.default.createElement(
              /*istanbul ignore next*/_reactAddonsCssTransitionGroup2.default,
              /*istanbul ignore next*/{
                transitionName: 'table-loading',
                transitionEnterTimeout: 300,
                transitionLeaveTimeout: 300,
                transitionAppearTimeout: 300,
                transitionAppear: true
              },
              /*istanbul ignore next*/_react2.default.createElement( /*istanbul ignore next*/_spinner2.default, /*istanbul ignore next*/{ size: 'small' })
            )
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
      return (/*istanbul ignore next*/_react2.default.createElement(
          /*istanbul ignore next*/_tableRow2.default,
          /*istanbul ignore next*/{ key: '__loading__', selectable: false, highlightable: false },
          /*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/_tableCell2.default,
            /*istanbul ignore next*/{ colSpan: '42', align: 'center' },
            /*istanbul ignore next*/_i18nJs2.default.t("table.no_data", { defaultValue: "No results to display" })
          )
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

    /**
     * Returns the content, wrapped in a tbody.
     *
     * @method tbody
     * @return {Object} JSX
     */

  }, {
    key: 'tbody',
    get: function get() {
      if (this.props.tbody === false) {
        return this.tableContent;
      } else {
        return (/*istanbul ignore next*/_react2.default.createElement(
            /*istanbul ignore next*/'tbody',
            /*istanbul ignore next*/null,
            this.tableContent
          )
        );
      }
    }
  }]);

  return Table;
}( /*istanbul ignore next*/_react2.default.Component);

/*istanbul ignore next*/Table.propTypes = {
  /**
   * Data used to filter the data
   *
   * @property filter
   * @type {Object}
   */
  filter: /*istanbul ignore next*/_react2.default.PropTypes.object,

  /**
   * Emitted when table component changes e.g.
   * Pager, sorting, filter
   *
   * @property onChange
   * @type {Function}
   */
  onChange: /*istanbul ignore next*/_react2.default.PropTypes.func,

  /**
   * Show the pagination footer
   *
   * @property paginate
   * @type {Boolean}
   */
  paginate: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Pagination
   * Current Visible Page
   *
   * @property currentPage
   * @type {String}
   */
  currentPage: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Pagination
   * Page Size of grid (number of visible records)
   *
   * @property pageSize
   * @type {String}
   */
  pageSize: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Pagination
   * Options for pageSize default - 10, 25, 50
   *
   * @property pageSizeSelectionOptions
   * @type {Object} Immutable
   */
  pageSizeSelectionOptions: /*istanbul ignore next*/_react2.default.PropTypes.object,

  /**
   * Pagination
   * Is the page size dropdown visible
   *
   * @property showPageSizeSelection
   * @type {Boolean}
   */
  showPageSizeSelection: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Enables multi-selectable table rows.
   *
   * @property selectable
   * @type {Boolean}
   */
  selectable: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * Enables highlightable table rows.
   *
   * @property highlightable
   * @type {Boolean}
   */
  highlightable: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * A callback for when a row is selected.
   *
   * @property onSelect
   * @type {Function}
   */
  onSelect: /*istanbul ignore next*/_react2.default.PropTypes.func,

  /**
   * A callback for when a row is highlighted.
   *
   * @property onHighlight
   * @type {Function}
   */
  onHighlight: /*istanbul ignore next*/_react2.default.PropTypes.func,

  /**
   * Pagination
   * Total number of records in the grid
   *
   * @property totalRecords
   * @type {String}
   */
  totalRecords: /*istanbul ignore next*/_react2.default.PropTypes.string,

  /**
   * Allow table to shrink in size.
   *
   * @property shrink
   * @type {Boolean}
   */
  shrink: /*istanbul ignore next*/_react2.default.PropTypes.bool,

  /**
   * TableRows to be wrapped in <thead>
   *
   * @property thead
   * @type {Object}
   */
  thead: /*istanbul ignore next*/_react2.default.PropTypes.object,

  /**
   * Determines if you want the table to automatically render a tbody.
   *
   * @property tbody
   * @type {Object}
   */
  tbody: /*istanbul ignore next*/_react2.default.PropTypes.bool
};
/*istanbul ignore next*/Table.childContextTypes = {
  /**
   * Defines a context object for child components of the table component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property childContextTypes
   * @type {Object}
   */
  attachActionToolbar: /*istanbul ignore next*/_react2.default.PropTypes.func, // tracks the action toolbar component
  detachActionToolbar: /*istanbul ignore next*/_react2.default.PropTypes.func, // tracks the action toolbar component
  attachToTable: /*istanbul ignore next*/_react2.default.PropTypes.func, // attach the row to the table
  checkSelection: /*istanbul ignore next*/_react2.default.PropTypes.func, // a function to check if the row is currently selected
  detachFromTable: /*istanbul ignore next*/_react2.default.PropTypes.func, // detach the row from the table
  highlightRow: /*istanbul ignore next*/_react2.default.PropTypes.func, // highlights the row
  selectable: /*istanbul ignore next*/_react2.default.PropTypes.bool, // table can enable all rows to be multi-selectable
  onSort: /*istanbul ignore next*/_react2.default.PropTypes.func, // a callback function for when a sort order is updated
  selectAll: /*istanbul ignore next*/_react2.default.PropTypes.func, // a callback function for when all visible rows are selected
  selectRow: /*istanbul ignore next*/_react2.default.PropTypes.func, // a callback function for when a row is selected
  highlightable: /*istanbul ignore next*/_react2.default.PropTypes.bool, // table can enable all rows to be highlightable
  sortOrder: /*istanbul ignore next*/_react2.default.PropTypes.string, // the current sort order applied
  sortedColumn: /*istanbul ignore next*/_react2.default.PropTypes.string // the currently sorted column
};
/*istanbul ignore next*/exports.Table = Table;
/*istanbul ignore next*/exports.TableRow = _tableRow2.default;
/*istanbul ignore next*/exports.TableCell = _tableCell2.default;
/*istanbul ignore next*/exports.TableHeader = _tableHeader2.default;