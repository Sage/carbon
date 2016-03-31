import React from 'react';
import Request from 'superagent';
import serialize from './../../utils/helpers/serialize';
import { Table, TableRow, TableCell, TableHeader } from './../table';

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
class TableAjax extends Table {

  constructor(...args) {
    super(...args);
  }

  /**
   * Timeout for firing ajax request
   *
   * @property timeout
   */
  timeout = null;

  static propTypes = {
    /**
     * Data used to filter the data
     *
     * @property filter
     * @type {Object}
     */
    filter: React.PropTypes.object,

    /**
     * Setting to true turns on pagination for the table
     *
     * @property paginate
     * @type {Boolean}
     */
    paginate: React.PropTypes.bool,

    /**
     * Endpoint to fetch the data for table
     *
     * @property path
     * @type {String}
     */
    path: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    paginate: true
  }

  state = {

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
    totalRecords: '0',

    /**
     * Sorting
     * either 'asc' or 'desc' order
     *
     * @property sortOrder
     * @type {String}
     */
    sortOrder: this.props.sortOrder || '',

    /**
     * Sorting
     * column name to sort
     *
     * @property sortedColumn
     * @type {String}
     */
    sortedColumn: this.props.sortedColumn || ''

  };

  /**
   * Request initial data on mount
   * @override
   *
   * @method componentDidMount
   * @return {Void}
   */
  componentDidMount() {
    super.componentDidMount();
    this.emitOnChangeCallback('data', this.emitOptions(), 0);
  }

  /**
   * Lifecycle for after a update has happened
   * Resize the grid to fit new content
   *
   * @method componentDidUpdate
   * @return {Void}
   */
  componentDidUpdate() {
    this.resizeTable();
  }

  static childContextTypes = {
    /**
     * Defines a context object for child components of the table-ajax component.
     * https://facebook.github.io/react/docs/context.html
     *
     * @property childContextTypes
     * @type {Object}
     */
    onSort: React.PropTypes.func,
    sortedColumn: React.PropTypes.string,
    sortOrder: React.PropTypes.string
  }

  /**
   * Returns table object to child components.
   *
   * @method getChildContext
   * @return {void}
   */
  getChildContext = () => {
    return {
      onSort: this.onSort,
      sortedColumn: this.sortedColumn,
      sortOrder: this.sortOrder
    };
  }

  /**
   * Get pageSize for table
   * @override
   *
   * @method pageSize
   * @return {String} table page size
   */
  get pageSize() {
    return this.state.pageSize;
  }

  /**
   * Returns the currently sorted column.
   *
   * @method sortedColumn
   * @return {String}
   */
  get sortedColumn() {
    return this.state.sortedColumn;
  }

  /**
   * Returns the current sort order.
   *
   * @method sortOrder
   * @return {String}
   */
  get sortOrder() {
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
  emitOnChangeCallback = (element, options, timeout = 250) => {
    let resetHeight = Number(options.pageSize) < Number(this.pageSize),
        currentPage = (element === "filter") ? "1" : options.currentPage;

    this.setState({
      currentPage: currentPage,
      pageSize: options.pageSize,
      sortOrder: options.sortOrder,
      sortedColumn: options.sortedColumn
    });

    this.stopTimeout();
    this.timeout = setTimeout(() => {
      Request
        .get(this.props.path)
        .set('Accept', 'application/json')
        .query(this.queryParams(element, options))
        .end((err, response) => {
          this.handleResponse(err, response);
          if (resetHeight) { this.resetTableHeight(); }
        });
    }, timeout);
  }

  /**
   * Clears the ajax timeout if present
   *
   * @method stopTimeout
   * @return {Void}
   */
  stopTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  /**
   * Handles what happens with response.
   *
   * @method handlerResponse
   * @param {Object} err
   * @param {Object} response
   */
  handleResponse = (err, response) => {
    if (!err) {
      let data = response.body;
      this.props.onChange(data);
      this.setState({ totalRecords: String(data.records) });
    }
  }

  /**
   * Formatted params for server request
   *
   * @method queryParams
   * @param {String} element changed element
   * @param {Object} options base and updated options
   * @return {Object} params for query
   */
  queryParams = (element, options) => {
    let query = options.filter || {};
    query.page = (element === "filter") ? "1" : options.currentPage;
    query.rows = options.pageSize;
    if (options.sortOrder) { query.sord = options.sortOrder; }
    if (options.sortedColumn) { query.sidx = options.sortedColumn; }
    return serialize(query);
  }

  /**
   * Base Options to be emitted by onChange
   * @override
   *
   * @method emitOptions
   * @return {Object} options to emit
   */
  emitOptions = (props = this.props) => {
    return {
      currentPage: this.state.currentPage,
      filter: props.filter ? props.filter.toJS() : {},
      pageSize: this.state.pageSize,
      sortedColumn: this.state.sortedColumn,
      sortOrder: this.state.sortOrder
    };
  }

  /**
   * Props to pass to pager component
   * @override
   *
   * @method pagerProps
   * @return {Object} props
   */
  get pagerProps() {
    return {
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
      totalRecords: this.state.totalRecords,
      onPagination: this.onPagination,
      pageSizeSelectionOptions: this.props.pageSizeSelectionOptions,
      showPageSizeSelection: this.props.showPageSizeSelection
    };
  }
}

export {
  TableAjax,
  TableRow,
  TableCell,
  TableHeader
};
