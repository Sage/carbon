'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DraggableTableCell = exports.TableSubheader = exports.TableHeader = exports.TableCell = exports.TableRow = exports.Table = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CSSTransitionGroup = require('react-transition-group/CSSTransitionGroup');

var _CSSTransitionGroup2 = _interopRequireDefault(_CSSTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _i18nJs = require('i18n-js');

var _i18nJs2 = _interopRequireDefault(_i18nJs);

var _actionToolbar = require('./../action-toolbar');

var _actionToolbar2 = _interopRequireDefault(_actionToolbar);

var _icon = require('./../icon');

var _icon2 = _interopRequireDefault(_icon);

var _link = require('./../link');

var _link2 = _interopRequireDefault(_link);

var _tableRow = require('./table-row');

var _tableRow2 = _interopRequireDefault(_tableRow);

var _tableCell = require('./table-cell');

var _tableCell2 = _interopRequireDefault(_tableCell);

var _tableHeader = require('./table-header');

var _tableHeader2 = _interopRequireDefault(_tableHeader);

var _tableSubheader = require('./table-subheader');

var _tableSubheader2 = _interopRequireDefault(_tableSubheader);

var _draggableTableCell = require('./draggable-table-cell');

var _draggableTableCell2 = _interopRequireDefault(_draggableTableCell);

var _pager = require('./../pager');

var _pager2 = _interopRequireDefault(_pager);

var _spinner = require('./../spinner');

var _spinner2 = _interopRequireDefault(_spinner);

require('./table.scss');

require('./table--secondary-theme.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Table);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Table.__proto__ || Object.getPrototypeOf(Table)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      selectedCount: 0

      /**
       * Returns table object to child components.
       *
       * @method getChildContext
       * @return {void}
       */
    }, _this.getChildContext = function () {
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
    }, _this.onSort = function (sortedColumn, sortOrder) {
      var options = _this.emitOptions();
      options.sortedColumn = sortedColumn;
      options.sortOrder = sortOrder;
      _this.emitOnChangeCallback('table', options);
    }, _this.onPagination = function (currentPage, pageSize, element) {
      if (_this.props.onPageSizeChange && element === 'size') {
        _this.props.onPageSizeChange(pageSize);
      }
      var options = _this.emitOptions();
      options.currentPage = currentPage;
      options.pageSize = pageSize;
      _this.emitOnChangeCallback('pager', options);
    }, _this.emitOnChangeCallback = function (element, options) {
      if (_this.selectAllComponent) {
        // reset the select all component
        _this.selectAllComponent.setState({ selected: false });
        _this.selectAllComponent = null;
      }

      _this.props.onChange(element, options);
    }, _this.attachActionToolbar = function (comp) {
      _this.actionToolbarComponent = comp;
    }, _this.detachActionToolbar = function () {
      _this.actionToolbarComponent = null;
    }, _this.attachToTable = function (id, row) {
      _this.rows[id] = row;
    }, _this.detachFromTable = function (id) {
      delete _this.rows[id];
    }, _this.refresh = function () {
      _this.resetHighlightedRow();
      _this.selectedRows = {};
      if (_this.actionToolbarComponent) {
        _this.actionToolbarComponent.setState({
          total: 0,
          selected: []
        });
      }

      for (var key in _this.rows) {
        var _row = _this.rows[key];
        _row.setState({ selected: false });
      }
      _this.emitOnChangeCallback('refresh', _this.emitOptions());
    }, _this.resetHighlightedRow = function () {
      if (_this.highlightedRow.row && _this.rows[_this.highlightedRow.row.rowID]) {
        _this.highlightedRow.row.setState({ highlighted: false });
      }

      _this.highlightedRow = {
        id: null,
        row: null
      };
    }, _this.highlightRow = function (id, row) {
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
    }, _this.selectRow = function (id, row, state, skipCallback) {
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

      if (_this.actionToolbarComponent && !skipCallback) {
        var keys = Object.keys(_this.selectedRows);

        // update action toolbar
        _this.actionToolbarComponent.setState({
          total: keys.length,
          selected: _this.selectedRows
        });
      }

      if (_this.props.onSelect && !skipCallback) {
        // trigger onSelect event
        _this.props.onSelect(_this.selectedRows);
      }
    }, _this.selectAll = function (row) {
      var selectState = !row.state.selected;

      for (var key in _this.rows) {
        // update all the rows with the new state
        var _row = _this.rows[key];
        if (_row.shouldHaveMultiSelectColumn) {
          _this.selectRow(_row.props.uniqueID, _row, selectState, true);
        }
      }

      // update the row with the new state
      row.setState({ selected: selectState });

      // if select state is true, track the select all component
      _this.selectAllComponent = selectState ? row : null;

      if (_this.actionToolbarComponent) {
        var keys = Object.keys(_this.selectedRows);

        // update action toolbar
        _this.actionToolbarComponent.setState({
          total: keys.length,
          selected: _this.selectedRows
        });
      }

      if (_this.props.onSelect) {
        // trigger onSelect event
        _this.props.onSelect(_this.selectedRows);
      }
    }, _this.checkSelection = function (id, row) {
      var isSelected = _this.selectedRows[id] !== undefined,
          isHighlighted = _this.highlightedRow.id === id;

      if (isSelected !== row.state.selected) {
        row.setState({ selected: isSelected });
      }

      if (isHighlighted !== row.state.highlighted) {
        row.setState({ highlighted: isHighlighted });
      }
    }, _this.selectAllComponent = null, _this.actionToolbarComponent = null, _this.selectedRows = {}, _this.highlightedRow = {
      id: null,
      row: null
    }, _this.rows = {}, _this.tableHeight = 0, _this.emitOptions = function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;

      var currentPage = props.currentPage || '';

      if (Number(props.currentPage) > Number(props.pageSize)) {
        currentPage = '1';
      }

      return {
        // What if paginate if false - think about when next change functionality is added
        currentPage: currentPage,
        filter: props.filter ? props.filter.toJS() : {},
        pageSize: props.pageSize || '',
        sortOrder: props.sortOrder || '',
        sortedColumn: props.sortedColumn || ''
      };
    }, _this.configureLink = function (onConfigure) {
      if (!onConfigure) {
        return null;
      }

      return _react2.default.createElement(
        'div',
        { className: 'carbon-table__configure-link' },
        _react2.default.createElement(
          _link2.default,
          { href: '#', onClick: onConfigure },
          _react2.default.createElement(_icon2.default, { type: 'settings' })
        )
      );
    }, _this.dataState = function () {}, _temp), _possibleConstructorReturn(_this, _ret);
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
      if (!_immutable2.default.is(this.props.filter, nextProps.filter)) {
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
     * Handles what happens on sort.
     *
     * @method onSort
     * @param {String} sortedColumn
     * @param {String} sortOrder
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
      if (!this._table) {
        return;
      }
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
     * Tracks the rows which are currently selected.
     *
     * @property selectedRows
     * @type {Object}
     */


    /**
     * Tracks the currently highlighted row.
     *
     * @property highlightedRow
     * @type {String}
     */


    /**
     * The rows currently attached to the table.
     *
     * @property rows
     * @type {Object}
     */


    /**
     * Maintains the height of the table
     *
     * @property tableHeight
     * @type {Number}
     */


    /**
     * Base Options to be emitted by onChange
     *
     * @method emitOptions
     * @return {Object} options to emit
     */

  }, {
    key: 'componentTags',


    /**
     * Data tags used for the data-component attribute
     */
    value: function componentTags(props) {
      return {
        'data-component': this.dataComponent,
        'data-element': props['data-element'],
        'data-role': props['data-role'],
        'data-state': this.dataState(),
        'aria-busy': this.state.ariaBusy
      };
    }

    /**
     * Returns the caption prop wrapped in a <caption> tag,
     * or null if no caption prop was given.
     *
     * @method caption
     * @return {Object} JSX
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

      var tableProps = {
        className: this.tableClasses
      };

      if (this.props['aria-describedby']) {
        tableProps['aria-describedby'] = this.props['aria-describedby'];
      }

      return _react2.default.createElement(
        'div',
        _extends({ className: this.mainClasses }, this.componentTags(this.props)),
        this.actionToolbar,
        _react2.default.createElement(
          'div',
          { className: this.wrapperClasses, ref: function ref(wrapper) {
              _this3._wrapper = wrapper;
            } },
          this.configureLink(this.props.onConfigure),
          _react2.default.createElement(
            'table',
            _extends({
              ref: function ref(table) {
                _this3._table = table;
              }
            }, tableProps),
            this.caption,
            this.thead,
            this.tbody
          )
        ),
        this.pager
      );
    }
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
     * Get pageSize for table
     *
     * @method pageSize
     * @return {String} table page size
     */

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
        return _react2.default.createElement(_pager2.default, this.pagerProps);
      }
      return null;
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
      return (0, _classnames2.default)('carbon-table', this.props.className, 'carbon-table--' + this.props.theme);
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
      return (0, _classnames2.default)('carbon-table__wrapper', this.props.className, {
        'carbon-table--pager': this.props.paginate,
        'carbon-table--configurable': this.props.onConfigure
      });
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
      return 'carbon-table__table';
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
        return _react2.default.createElement(
          'thead',
          { className: 'carbon-table__header' },
          this.props.thead
        );
      }
      return null;
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
      if (!this.props.selectable || !this.props.actions) {
        return null;
      }

      return _react2.default.createElement(
        _actionToolbar2.default,
        {
          total: this.state.selectedCount,
          actions: this.props.actions
        },
        this.props.actionToolbarChildren
      );
    }
  }, {
    key: 'loadingRow',


    /**
     * Returns a row to be used for loading.
     *
     * @method loadingRow
     * @return {Object} JSX
     */
    get: function get() {
      return _react2.default.createElement(
        _tableRow2.default,
        {
          key: '__loading__', selectable: false,
          highlightable: false, hideMultiSelect: true
        },
        _react2.default.createElement(
          _tableCell2.default,
          { colSpan: '42', align: 'center' },
          _react2.default.createElement(
            _CSSTransitionGroup2.default,
            {
              component: 'div',
              transitionName: 'table-loading',
              transitionEnterTimeout: 300,
              transitionLeaveTimeout: 300,
              transitionAppearTimeout: 300,
              transitionAppear: true
            },
            _react2.default.createElement(_spinner2.default, { size: 'small' })
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
      return _react2.default.createElement(
        _tableRow2.default,
        {
          key: '__loading__', selectable: false,
          highlightable: false
        },
        _react2.default.createElement(
          _tableCell2.default,
          { colSpan: '42', align: 'center' },
          _i18nJs2.default.t('table.no_data', { defaultValue: 'No results to display' })
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
            onlyChildIsHeader = numOfChildren === 1 && children.first().props.as === 'header';

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
      }
      return this.loadingRow;
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
      }
      return _react2.default.createElement(
        'tbody',
        null,
        this.tableContent
      );
    }

    /**
     * Placeholder function for defining the data state, intended to be overriden in subclasses
     */

  }, {
    key: 'dataComponent',


    /**
     * The name used for the data-component attribute
     */
    get: function get() {
      return 'table';
    }
  }, {
    key: 'caption',
    get: function get() {
      if (this.props.caption) {
        return _react2.default.createElement(
          'caption',
          { className: 'carbon-table__caption' },
          this.props.caption
        );
      }

      return null;
    }
  }]);

  return Table;
}(_react2.default.Component);

Table.propTypes = {
  /**
   * The actions to display in the toolbar
   *
   * @property actions - each action is object with the action attributes
   * @type {Object}
   */
  actions: _propTypes2.default.object,

  /**
   * The extra actions to display in the toolbar
   *
   * @property actionToolbarChildren - additional buttons can be added to the tool bar
   * @type {Function}
   */
  actionToolbarChildren: _propTypes2.default.func,

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
   * Data used to filter the data
   *
   * @property filter
   * @type {Object}
   */
  filter: _propTypes2.default.object,

  /**
   * Emitted when table component changes e.g.
   * Pager, sorting, filter
   *
   * @property onChange
   * @type {Function}
   */
  onChange: _propTypes2.default.func,

  /**
   * Enable configure icon that triggers this callback on click
   *
   * @property onConfigure
   * @type {Function}
   */
  onConfigure: _propTypes2.default.func,

  /**
   * Show the pagination footer
   *
   * @property paginate
   * @type {Boolean}
   */
  paginate: _propTypes2.default.bool,

  /**
   * Pagination
   * Current Visible Page
   *
   * @property currentPage
   * @type {String}
   */
  currentPage: _propTypes2.default.string,

  /**
   * Pagination
   * Page Size of grid (number of visible records)
   *
   * @property pageSize
   * @type {String}
   */
  pageSize: _propTypes2.default.string,

  /**
   * Pagination
   * Options for pageSize default - 10, 25, 50
   *
   * @property pageSizeSelectionOptions
   * @type {Object} Immutable
   */
  pageSizeSelectionOptions: _propTypes2.default.object,

  /**
   * Pagination
   * Is the page size dropdown visible
   *
   * @property showPageSizeSelection
   * @type {Boolean}
   */
  showPageSizeSelection: _propTypes2.default.bool,

  /**
   * Enables multi-selectable table rows.
   *
   * @property selectable
   * @type {Boolean}
   */
  selectable: _propTypes2.default.bool,

  /**
   * Enables highlightable table rows.
   *
   * @property highlightable
   * @type {Boolean}
   */
  highlightable: _propTypes2.default.bool,

  /**
   * A callback for when a row is selected.
   *
   * @property onSelect
   * @type {Function}
   */
  onSelect: _propTypes2.default.func,

  /**
   * A callback for when a row is highlighted.
   *
   * @property onHighlight
   * @type {Function}
   */
  onHighlight: _propTypes2.default.func,

  /**
   * A callback for when the page size changes.
   *
   * @property onPageSizeChange
   * @type {Function}
   */
  onPageSizeChange: _propTypes2.default.func,

  /**
   * Pagination
   * Total number of records in the grid
   *
   * @property totalRecords
   * @type {String}
   */
  totalRecords: _propTypes2.default.string,

  /**
   * Allow table to shrink in size.
   *
   * @property shrink
   * @type {Boolean}
   */
  shrink: _propTypes2.default.bool,

  /**
   * The currently sorted column.
   *
   * @property sortedColumn
   * @type {String}
   */
  sortedColumn: _propTypes2.default.string,

  /**
   * The current sort order applied.
   *
   * @property sortOrder
   * @type {String}
   */
  sortOrder: _propTypes2.default.string,

  /**
   * TableRows to be wrapped in <thead>
   *
   * @property thead
   * @type {Object}
   */
  thead: _propTypes2.default.object,

  /**
   * Determines if you want the table to automatically render a tbody.
   *
   * @property tbody
   * @type {Object}
   */
  tbody: _propTypes2.default.bool,

  /**
   * A string to render as the table's caption
   *
   * @property caption
   * @type string
   */
  caption: _propTypes2.default.string,

  /**
   * The HTML id of the element that contains a description
   * of this table.
   *
   * @property aria-describedby
   * @type string
   */
  'aria-describedby': _propTypes2.default.string,

  /**
   * Renders as light or dark
   * Uses common theme definition of 'primary' (dark, default) and 'secondary' (light)
   *
   * @property theme
   * @type string
   */
  theme: _propTypes2.default.string
};
Table.childContextTypes = {
  /**
   * Defines a context object for child components of the table component.
   * https://facebook.github.io/react/docs/context.html
   *
   * @property childContextTypes
   * @type {Object}
   */
  attachActionToolbar: _propTypes2.default.func, // tracks the action toolbar component
  detachActionToolbar: _propTypes2.default.func, // tracks the action toolbar component
  attachToTable: _propTypes2.default.func, // attach the row to the table
  checkSelection: _propTypes2.default.func, // a function to check if the row is currently selected
  detachFromTable: _propTypes2.default.func, // detach the row from the table
  highlightRow: _propTypes2.default.func, // highlights the row
  selectable: _propTypes2.default.bool, // table can enable all rows to be multi-selectable
  onSort: _propTypes2.default.func, // a callback function for when a sort order is updated
  selectAll: _propTypes2.default.func, // a callback function for when all visible rows are selected
  selectRow: _propTypes2.default.func, // a callback function for when a row is selected
  highlightable: _propTypes2.default.bool, // table can enable all rows to be highlightable
  sortOrder: _propTypes2.default.string, // the current sort order applied
  sortedColumn: _propTypes2.default.string // the currently sorted column
};
Table.defaultProps = {
  theme: 'primary'
};
exports.Table = Table;
exports.TableRow = _tableRow2.default;
exports.TableCell = _tableCell2.default;
exports.TableHeader = _tableHeader2.default;
exports.TableSubheader = _tableSubheader2.default;
exports.DraggableTableCell = _draggableTableCell2.default;