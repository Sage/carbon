import React from 'react';
import classNames from 'classnames';
import TableRow from './table-row';
import TableCell from './table-cell';
import TableHeader from './table-header';
import Pager from './../pager';

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
 *
 *
 *
 * @class Table
 * @constructor
 */
class Table extends React.Component {

  static propTypes = {
    /**
     * Emitted when table component changes e.g.
     * Pager, sorting, filter
     *
     * @property onChange
     * @type {Function}
     */
    onChange: React.PropTypes.func,

    /**
     * Show the pagination footer
     *
     * @property paginate
     * @type {Boolean}
     */
    paginate: React.PropTypes.bool,
    /**
     * Pagination
     * Current Visible Page
     *
     * @property currentPage
     * @type {String}
     */
    currentPage: React.PropTypes.string,

    /**
     * Pagination
     * Page Size of grid (number of visible records)
     *
     * @property pageSize
     * @type {String}
     */
    pageSize: React.PropTypes.string,

    /**
     * Pagination
     * Options for pageSize default - 10, 25, 50
     *
     * @property pageSizeSelectionOptions
     * @type {Object} Immutable
     */
    pageSizeSelectionOptions: React.PropTypes.object,

    /**
     * Pagination
     * Is the page size dropdown visible
     *
     * @property showPageSizeSelection
     * @type {Boolean}
     */
    showPageSizeSelection: React.PropTypes.bool,

    /**
     * Pagination
     * Total number of records in the grid
     *
     * @property totalRecords
     * @type {String}
     */
    totalRecords: React.PropTypes.string
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
  emitOnChangeCallback = (element, options) => {
    this.props.onChange(element, options);
  }

  /**
   * Handlers when the pager emits a onChange event
   * Passes data to emitOnChangeCallback in the correct
   * format
   *
   * @method onPagination
   * @param {String} currentPage
   * @param {String} pageSize
   * @return {Void}
   */
  onPagination = (currentPage, pageSize) => {
    let options = this.emitOptions;
    options.currentPage = currentPage;
    options.pageSize = pageSize;
    this.emitOnChangeCallback('pager', options);
  }

  /**
   * Base Options to be emitted by onChange
   *
   * @method emitOptions
   * @return {Object} options to emit
   */
  get emitOptions() {
    return {
      // What if paginate if false - think about when next change functionality is added
      currentPage: this.props.currentPage,
      pageSize: this.props.pageSize
    };
  }

  /**
   * Props to pass to pager component
   *
   * @method pagerProps
   * @return {Object} props
   */
  get pagerProps() {
    return {
      currentPage: this.props.currentPage,
      onPagination: this.onPagination,
      pageSize: this.props.pageSize,
      pageSizeSelectionOptions: this.props.pageSizeSelectionOptions,
      showPageSizeSelection: this.props.showPageSizeSelection,
      totalRecords: this.props.totalRecords
    };
  }

  /**
   * Returns the pager if paginate is true
   *
   * @method pager
   * @return {JSX} pager
   */
  get pager() {
    if (this.props.paginate) {
      return (<Pager { ...this.pagerProps } />);
    }
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let className = classNames('ui-table', this.props.className);

    return (
      <div>
        <table className={ className }>
          <tbody>
            { this.props.children }
          </tbody>
        </table>
        { this.pager }
      </div>
    );
  }
}

export {
  Table,
  TableRow,
  TableCell,
  TableHeader
};
