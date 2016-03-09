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
 * @class Table
 * @constructor
 */
class Table extends React.Component {

  emitOnChangeCallback = (element, options) => {
    this.props.onChange(element, options);
  }

  get emitOptions() {
    return {
      currentPage: this.props.currentPage,
      pageSize: this.props.pageSize
    };
  }

  onPagination = (currentPage, pageSize) => {
    let options = this.emitOptions;
    options.currentPage = currentPage;
    this.emitOnChangeCallback('pager', options);
  }

  get pagerProps() {
    return {
      currentPage: this.props.currentPage,
      onPagination: this.onPagination,
      pageSize: this.props.pageSize,
      pageSizeSelectionOptions: this.props.pageSizeSelectionOptions,
      showPageSizeSelection: this.props.showPageSizeSelection,
      totalRecords: this.props.totalRecords,
    }
  }

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
