'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableSubheader = exports.TableHeader = exports.TableCell = exports.TableRow = exports.TableAjax = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _serialize = require('../../utils/helpers/serialize');

var _serialize2 = _interopRequireDefault(_serialize);

var _table = require('../table');

var _logger = require('../../utils/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A Table Ajax Widget
 *
 * == How to use a Table Ajax in a component
 *
 * In your file
 *
 *   import Table from 'carbon-react/lib/components/table-ajax';
 *   import { TableRow, TableCell, TableHeader } from 'carbon-react/lib/components/table';
 *
 * To render a Table please see the Table Component
 *
 * TableAjax requires a path to be provided
 *
 * <TableAjax
 *    path='./path'
 * >
 *
 */
var TableAjax = function (_Table) {
  _inherits(TableAjax, _Table);

  function TableAjax() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TableAjax);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TableAjax.__proto__ || Object.getPrototypeOf(TableAjax)).call.apply(_ref, [this].concat(args))), _this), _this.timeout = null, _this._request = null, _this.state = {
      /**
       * Pagination
       * Current Visible Page
       *
       * @property currentPage
       * @type {String}
       */
      currentPage: _this.props.currentPage || '1',

      /**
       * The current value of the data-state property
       *
       * @property dataState
       * @type {String}
       */
      dataState: 'idle',

      /**
       * Pagination
       * Page Size of grid (number of visible records)
       *
       * @property pageSize
       * @type {String}
       */
      pageSize: _this.defaultPageSize,

      /**
       * Pagination
       * Total number of records in the grid
       *
       * @property totalRecords
       * @type {String}
       */
      totalRecords: _this.props.totalRecords || '0',

      /**
       * Sorting
       * either 'asc' or 'desc' order
       *
       * @property sortOrder
       * @type {String}
       */
      sortOrder: _this.props.sortOrder || '',

      /**
       * Sorting
       * column name to sort
       *
       * @property sortedColumn
       * @type {String}
       */
      sortedColumn: _this.props.sortedColumn || ''

    }, _this.getChildContext = function () {
      return {
        attachActionToolbar: _this.attachActionToolbar,
        detachActionToolbar: _this.detachActionToolbar,
        attachToTable: _this.attachToTable,
        detachFromTable: _this.detachFromTable,
        checkSelection: _this.checkSelection,
        onSort: _this.onSort,
        selectable: _this.props.selectable,
        highlightable: _this.props.highlightable,
        selectAll: _this.selectAll,
        selectRow: _this.selectRow,
        highlightRow: _this.highlightRow,
        sortedColumn: _this.sortedColumn,
        sortOrder: _this.sortOrder
      };
    }, _this.emitOnChangeCallback = function (element, options) {
      var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 250;

      if (_this.selectAllComponent) {
        // reset the select all component
        _this.selectAllComponent.setState({ selected: false });
        _this.selectAllComponent = null;
      }

      var resetHeight = Number(options.pageSize) < Number(_this.pageSize),
          currentPage = element === 'filter' ? '1' : options.currentPage;

      _this.setState({
        currentPage: currentPage,
        pageSize: options.pageSize,
        sortOrder: options.sortOrder,
        sortedColumn: options.sortedColumn
      });

      _this.stopTimeout();
      _this.timeout = setTimeout(function () {
        // track the request incase we need to abort it
        _this.setState({
          dataState: 'requested',
          ariaBusy: true
        });
        _this._request = _superagent2.default.get(_this.props.path).set(_this.getHeaders()).query(_this.queryParams(element, options)).end(function (err, response) {
          _this._hasRetreivedData = true;
          _this.handleResponse(err, response);
          if (resetHeight) {
            _this.resetTableHeight();
          }
        });
      }, timeout);
    }, _this.stopTimeout = function () {
      if (_this.timeout) {
        clearTimeout(_this.timeout);
      }

      if (_this._request) {
        _this._request.abort();
      }
    }, _this.handleResponse = function (err, response) {
      if (!err) {
        var data = _this.props.formatResponse ? _this.props.formatResponse(response.body) : response.body;
        _this.props.onChange(data);
        _this.setState({ totalRecords: String(data.records), dataState: 'loaded', ariaBusy: false });
      } else if (_this.props.onAjaxError) {
        _this.setComponentTagsErrored();
        _this.props.onAjaxError(err, response);
      } else {
        _this.setComponentTagsErrored();
        _logger2.default.warn(err.status + ' - ' + response);
      }
    }, _this.queryParams = function (element, options) {
      var query = options.filter || {};
      query.page = element === 'filter' ? '1' : options.currentPage;
      query.rows = options.pageSize;
      if (options.sortOrder) {
        query.sord = options.sortOrder;
      }
      if (options.sortedColumn) {
        query.sidx = options.sortedColumn;
      }

      if (_this.props.formatRequest) {
        return (0, _serialize2.default)(_this.props.formatRequest(query));
      }
      return (0, _serialize2.default)(query);
    }, _this.getHeaders = function () {
      return _this.props.getCustomHeaders ? _this.props.getCustomHeaders() : { Accept: 'application/json' };
    }, _this.emitOptions = function () {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props;

      return {
        currentPage: _this.state.currentPage,
        filter: props.filter ? props.filter.toJS() : {},
        pageSize: _this.state.pageSize,
        sortedColumn: _this.state.sortedColumn,
        sortOrder: _this.state.sortOrder
      };
    }, _this.dataState = function () {
      return _this.state.dataState;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  /**
   * Timeout for firing ajax request
   *
   * @property timeout
   */


  /**
   * Tracks the ajax request
   *
   * @property _request
   */


  _createClass(TableAjax, [{
    key: 'componentDidMount',


    /**
     * Request initial data on mount
     * @override
     *
     * @method componentDidMount
     * @return {Void}
     */
    value: function componentDidMount() {
      _get(TableAjax.prototype.__proto__ || Object.getPrototypeOf(TableAjax.prototype), 'componentDidMount', this).call(this);
      this.emitOnChangeCallback('data', this.emitOptions(), 0);
    }

    /**
     * Lifecycle for after a update has happened
     * Retrieve the data when page size chagnes
     * Resize the grid to fit new content
     *
     * @method componentDidUpdate
     * @param {Object} preProps The previos props passed down to the component
     * @param {Object} prevState The previous of the component
     * @return {Void}
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.pageSize !== prevState.pageSize) {
        this.emitOnChangeCallback('data', this.emitOptions());
      }
      this.resizeTable();
    }

    /**
     * Lifecycle before a mounted component receives new props
     * Set pageSize state if component pass a new pageSize props
     *
     * @method componentWillReceiveProps
     * @param {Object} nextProps The new props passed down to the component
     * @return {Void}
     */

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      _get(TableAjax.prototype.__proto__ || Object.getPrototypeOf(TableAjax.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
      if (this.props.pageSize !== nextProps.pageSize) {
        this.setState({ pageSize: nextProps.pageSize });
      }
    }

    /**
     * Lifecycle for when a component unmounts
     * Clears any deferred tasks
     *
     * @method componentWillUnmount
     * @return {Void}
     */

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopTimeout();
    }

    /**
     * Returns table object to child components.
     *
     * @method getChildContext
     * @return {void}
     */

  }, {
    key: 'setComponentTagsErrored',
    value: function setComponentTagsErrored() {
      this.setState({ dataState: 'errored', ariaBusy: false });
    }

    /**
     * Formatted params for server request
     *
     * @method queryParams
     * @param {String} element changed element
     * @param {Object} options base and updated options
     * @return {Object} params for query
     */


    /**
     * Retrieve headers to use for the request
     *
     * @method getHeaders
     */


    /**
     * Base Options to be emitted by onChange
     * @override
     *
     * @method emitOptions
     * @return {Object} options to emit
     */

  }, {
    key: 'pageSize',


    /**
     * Get pageSize for table
     * @override
     *
     * @method pageSize
     * @return {String} table page size
     */
    get: function get() {
      return this.state.pageSize;
    }

    /**
     * Returns the currently sorted column.
     *
     * @method sortedColumn
     * @return {String}
     */

  }, {
    key: 'sortedColumn',
    get: function get() {
      return this.state.sortedColumn;
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
      return this.state.sortOrder;
    }

    /**
     * Emit onChange event row data
     * @override
     *
     * @method emitOnChangeCallback
     * @param {String} element changed element
     * @param {Object} options base and updated options
     * @return {Void}
     */


    /**
     * Clears the ajax timeout if present
     *
     * @method stopTimeout
     * @return {Void}
     */


    /**
     * Handles what happens with response.
     *
     * @method handlerResponse
     * @param {Object} err
     * @param {Object} response
     */

  }, {
    key: 'pagerProps',


    /**
     * Props to pass to pager component
     * @override
     *
     * @method pagerProps
     * @return {Object} props
     */
    get: function get() {
      return {
        currentPage: this.state.currentPage,
        pageSize: this.state.pageSize,
        totalRecords: this.state.totalRecords,
        onPagination: this.onPagination,
        pageSizeSelectionOptions: this.props.pageSizeSelectionOptions,
        showPageSizeSelection: this.props.showPageSizeSelection
      };
    }

    /**
     * Returns the data-state string used in componentTags
     */

  }, {
    key: 'dataComponent',


    /**
     * The name used for the data-component attribute
     */
    get: function get() {
      return 'table-ajax';
    }
  }]);

  return TableAjax;
}(_table.Table);

TableAjax.propTypes = {
  /**
   * Data used to filter the data
   *
   * @property filter
   * @type {Object}
   */
  filter: _propTypes2.default.object,

  /**
   * A callback function used to format the Ajax
   * request into the format required endpoint
   *
   * @property formatRequest
   * @type {Function}
   */
  formatRequest: _propTypes2.default.func,

  /**
   * A callback function used to set the Ajax
   * headers using custom ones provided by the consumer
   *
   * Expected return object format
   * {
      'Accept': 'application/json',
      'jwt': 'secret',
      ...
     }
   *
   * @property getCustomHeaders
   * @type {Function}
   */
  getCustomHeaders: _propTypes2.default.func,

  /**
   * A callback function used to format the Ajax
   * response into the format required by the table
   *
   * @property formatResponse
   * @type {Function}
   */
  formatResponse: _propTypes2.default.func,

  /**
   * Setting to true turns on pagination for the table
   *
   * @property paginate
   * @type {Boolean}
   */
  paginate: _propTypes2.default.bool,

  /**
   * Pagination
   * Page Size of grid (number of visible records)
   *
   * @property pageSize
   * @type {String}
   */
  pageSize: _propTypes2.default.string,

  /**
   * Endpoint to fetch the data for table
   *
   * @property path
   * @type {String}
   */
  path: _propTypes2.default.string.isRequired,

  /**
   * Callback function for XHR request errors
   *
   * @property onAjaxError
   * @type {Function}
   */
  onAjaxError: _propTypes2.default.func
};
TableAjax.defaultProps = {
  paginate: true
};
TableAjax.childContextTypes = {
  /**
   * Defines a context object for child components of the table-ajax component.
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
  highlightable: _propTypes2.default.bool, // table can enable all rows to be highlightable
  onSort: _propTypes2.default.func, // a callback function for when a sort order is updated
  selectAll: _propTypes2.default.func, // a callback function for when all visible rows are selected
  selectRow: _propTypes2.default.func, // a callback function for when a row is selected
  highlightRow: _propTypes2.default.func, // a callback function for when a row is highlighted
  selectable: _propTypes2.default.bool, // table can enable all rows to be selectable
  sortOrder: _propTypes2.default.string, // the current sort order applied
  sortedColumn: _propTypes2.default.string // the currently sorted column
};
exports.TableAjax = TableAjax;
exports.TableRow = _table.TableRow;
exports.TableCell = _table.TableCell;
exports.TableHeader = _table.TableHeader;
exports.TableSubheader = _table.TableSubheader;