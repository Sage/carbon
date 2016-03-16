import React from 'react';
import Request from 'superagent';
import classNames from 'classnames';
import { Table } from './../table';

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
 * TableAjax requires pagination to be turned on and a path to be provided
 *
 * <TableAjax
 *    paginate={ true }
 *    path='./path'
 * >
 *
 */
class TableAjax extends Table {

  constructor(...args) {
    super(...args);
  }

  timeout = null;

  static propTypes = {
    /**
     * Setting to true turns on pagination for the table
     *
     * @property paginate
     * @type {Boolean}
     */
    paginate: React.PropTypes.bool.isRequired,

    /**
     * Endpoint to fetch the data for table
     *
     * @property path
     * @type {String}
     */
    path: React.PropTypes.string.isRequired
  }

  state = {
    currentPage: '1',
    pageSize: '10',
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

  // Override Super
  componentDidUpdate(prevProps, prevState) {
    this.resizeTable();
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
    let resetHeight = options.pageSize < this.pageSize;

    this.setState({
      currentPage: options.currentPage,
      pageSize: options.pageSize
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
            this.setState({totalRecords: String(data.records)})
            if (resetHeight) { this.resetTableHeight() }
          }
        });
    }, 250);
  }

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

export default TableAjax;
