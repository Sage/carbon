import React from 'react';
import Request from 'superagent';
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
   *
   * @method componentDidMount
   * @return {Void}
   */
  componentDidMount() {
    this.emitOnChangeCallback('data', this.emitOptions);
  }

  /**
   * Emit onChange event row data
   * Overides super method
   *
   * @method emitOnChangeCallback
   * @param {String} element changed element
   * @param {Object} options base and updated options
   * @return {Void}
   */
  emitOnChangeCallback = (element, options) => {
    let currentPage = options.currentPage,
        pageSize = options.pageSize;

    Request
      .get(this.props.path)
      .query({
        page: currentPage,
        value: '',
        rows: pageSize
      })
      .end((err, response) => {
        if (!err) {
          let data = response.body.data[0];
          this.setState({ currentPage, pageSize, totalRecords: String(data.records) });
          this.props.onChange(data);
        }
      });
  }

  /**
   * Base Options to be emitted by onChange
   * Overides super method
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
   * Overides super method
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
