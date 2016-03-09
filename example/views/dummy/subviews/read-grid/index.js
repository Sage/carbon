import React from 'react';
import { Table, TableRow, TableCell, TableHeader } from 'components/table';
import FinancesActions from './../../../../actions/finances';

class ReadGrid extends React.Component {

  get pagerProps() {
    return {
      currentPage: this.props.currentPage,
      pageSize: this.props.pageSize,
      totalRecords: String(this.props.totalRecords),
      onPagination: FinancesActions.pagerChange,
      showPageSizeSelection: true
    }
  }

  render() {
    let gridContent = (
      this.props.data.map((row, key) => {
        return (
          <TableRow key={ key }>
            { /* add description */ }
            <TableCell>{ row.get('id') }</TableCell>

            { /* add credit field */ }
            <TableCell>{ row.get('value') }</TableCell>

            { /* add debit field */ }
            <TableCell>{ row.get('name') }</TableCell>
          </TableRow>
        );
      })
    );

    // add header
    gridContent = gridContent.unshift(
      <TableRow key="header">
        <TableHeader>Id</TableHeader>
        <TableHeader>Code</TableHeader>
        <TableHeader>Name</TableHeader>
      </TableRow>
    );

    return (
      <Table { ...this.pagerProps } >
        { gridContent }
      </Table>
    );
  }
}

export default ReadGrid;
