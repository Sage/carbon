'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _table = require('./../table');

/**
 * A Table Ajax Widget
 *
 * == How to use a Table Ajax in a component
 *
 * In your file
 *
 *   import Table from 'carbon/lib/components/table-ajax';
 *   import { TableRow, TableCell, TableHeader } from 'carbon/lib/components/table';
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

var TableAjax = (function (_Table) {
  _inherits(TableAjax, _Table);

  function TableAjax() {
    var _this = this;

    _classCallCheck(this, TableAjax);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(TableAjax.prototype), 'constructor', this).apply(this, args);
    this.timeout = null;
    this.state = {

      /**
       * Pagination
       * Current Visible Page
       *
       * @property currentPage
       * @type {String}
       */
      currentPage: this.props.currentPage || '1',

      /**
       * Pagination
       * Page Size of grid (number of visible records)
       *
       * @property pageSize
       * @type {String}
       */
      pageSize: this.defaultPageSize,

      /**
       * Pagination
       * Total number of records in the grid
       *
       * @property totalRecords
       * @type {String}
       */
      totalRecords: '0'
    };

    this.emitOnChangeCallback = function (element, options) {
      var resetHeight = Number(options.pageSize) < Number(_this.pageSize);

      _this.setState({
        currentPage: options.currentPage,
        pageSize: options.pageSize
      });

      _this.stopTimeout();
      _this.timeout = setTimeout(function () {
        _superagent2['default'].get(_this.props.path).query(_this.queryParams(element, options)).end(function (err, response) {
          if (!err) {
            var data = response.body.data[0];
            _this.props.onChange(data);
            _this.setState({ totalRecords: String(data.records) });
            if (resetHeight) {
              _this.resetTableHeight();
            }
          }
        });
      }, 250);
    };

    this.stopTimeout = function () {
      if (_this.timeout) {
        clearTimeout(_this.timeout);
      }
    };

    this.queryParams = function (element, options) {
      return {
        page: options.currentPage,
        value: '',
        rows: options.pageSize
      };
    };
  }

  /**
   * Timeout for firing ajax request
   *
   * @property timeout
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
      _get(Object.getPrototypeOf(TableAjax.prototype), 'componentDidMount', this).call(this);
      this.emitOnChangeCallback('data', this.emitOptions);
    }

    /**
     * Lifecycle for after a update has happened
     * Resize the grid to fit new content
     *
     * @method componentDidUpdate
     * @return {Void}
     */
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.resizeTable();
    }

    /**
     * Get pageSize for table
     * @override
     *
     * @method pageSize
     * @return {String} table page size
     */
  }, {
    key: 'pageSize',
    get: function get() {
      return this.state.pageSize;
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
  }, {
    key: 'emitOptions',

    /**
     * Base Options to be emitted by onChange
     * @override
     *
     * @method emitOptions
     * @return {Object} options to emit
     */
    get: function get() {
      return {
        currentPage: this.state.currentPage,
        pageSize: this.state.pageSize
      };
    }

    /**
     * Props to pass to pager component
     * @override
     *
     * @method pagerProps
     * @return {Object} props
     */
  }, {
    key: 'pagerProps',
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
  }], [{
    key: 'propTypes',
    value: {

      /**
       * Setting to true turns on pagination for the table
       *
       * @property paginate
       * @type {Boolean}
       */
      paginate: _react2['default'].PropTypes.bool,

      /**
       * Endpoint to fetch the data for table
       *
       * @property path
       * @type {String}
       */
      path: _react2['default'].PropTypes.string.isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      paginate: true
    },
    enumerable: true
  }]);

  return TableAjax;
})(_table.Table);

exports.TableAjax = TableAjax;
exports.TableRow = _table.TableRow;
exports.TableCell = _table.TableCell;
exports.TableHeader = _table.TableHeader;

/**
 * Clears the ajax timeout if present
 *
 * @method stopTimeout
 * @return {Void}
 */

/**
 * Formatted params for server request
 *
 * @method queryParams
 * @param {String} element changed element
 * @param {Object} options base and updated options
 * @return {Object} params for query
 */