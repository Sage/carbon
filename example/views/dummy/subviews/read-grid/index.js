import React from 'react';
import { Table, TableRow, TableCell, TableHeader } from 'components/table';
import FinancesActions from './../../../../actions/finances';

class ReadGrid extends React.Component {

  get tableProps() {
    return {
      currentPage: this.props.currentPage,
      paginate: true,
      pageSize: this.props.pageSize,
      totalRecords: String(this.props.totalRecords),
      onChange: FinancesActions.tableChange,
      showPageSizeSelection: true,
      columnToSort: this.props.columnToSort
    }
  }

  render() {
    let gridContent = (
      this.props.data.map((row, key) => {
        return (
          <TableRow key={ key }>
            <TableCell>{ row.get('id') }</TableCell>
            <TableCell>{ row.get('value') }</TableCell>
            <TableCell>{ row.get('name') }</TableCell>
          </TableRow>
        );
      })
    );

    gridContent = gridContent.unshift(
      <TableRow key="header">
        <TableHeader name='id'>Id</TableHeader>
        <TableHeader name='code'>Code</TableHeader>
        <TableHeader name='name'>Name</TableHeader>
      </TableRow>
    );

    return (
      <Table { ...this.tableProps } >
        { gridContent }
      </Table>
    );
  }
}

export default ReadGrid;
