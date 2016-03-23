import React from 'react';
import Request from 'superagent';
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
    totalRecords: '0'
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
    this.emitOnChangeCallback('data', this.emitOptions);
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
     * Defines a context object for child components of the table component.
     * https://facebook.github.io/react/docs/context.html
     *
     * @property table
     * @type {Object}
     */
    onSort: React.PropTypes.func
  }

  /**
   * Returns table object to child components.
   *
   * @method getChildContext
   * @return {void}
   */
  getChildContext = () => {
    return {
      onSort: this.onSort
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
   * Emit onChange event row data
   * @override
   *
   * @method emitOnChangeCallback
   * @param {String} element changed element
   * @param {Object} options base and updated options
   * @return {Void}
   */
  emitOnChangeCallback = (element, options) => {
    let resetHeight = Number(options.pageSize) < Number(this.pageSize);

    this.setState({
      currentPage: options.currentPage,
      pageSize: options.pageSize,
      sortOrder: options.sortOrder
    });

    this.stopTimeout();
    this.timeout = setTimeout(() => {
      Request
        .get(this.props.path)
        .query(this.queryParams(element, options))
        .end((err, response) => {
          if (!err) {
            let data = response.body.data[0];
            this.props.onChange(data);
            this.setState({totalRecords: String(data.records)});
            if (resetHeight) { this.resetTableHeight(); }
          }
        });
    }, 250);
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
   * Formatted params for server request
   *
   * @method queryParams
   * @param {String} element changed element
   * @param {Object} options base and updated options
   * @return {Object} params for query
   */
  queryParams = (element, options) => {
    return {
      page: options.currentPage,
      value: '',
      rows: options.pageSize
    };
  }

  /**
   * Base Options to be emitted by onChange
   * @override
   *
   * @method emitOptions
   * @return {Object} options to emit
   */
  get emitOptions() {
    return {
      currentPage: this.state.currentPage,
      pageSize: this.state.pageSize,
      columnToSort: this.props.columnToSort,
      sortOrder: this.props.sortOrder

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
