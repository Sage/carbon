import React from 'react';
import { StoryHeader, StoryCode, StoryCodeBlock } from '../../../../.storybook/style/storybook-info.styles';

const info = (
  <div>
    <p>Table component</p>
    <StoryHeader>Implementation</StoryHeader>

    <p>Import the component:</p>
    <StoryCode padded>
      {'import { Table, TableRow, TableCell, TableHeader } from "carbon-react/lib/components/table";'}
    </StoryCode>

    <p>To render a Table:</p>
    <StoryCodeBlock>
      {'// map data to table rows'}
      {'let tableRows = ('}
      {'  this.props.data.map((datum, key) => {'}
      {'    return ('}
      {'      <TableRow>'}
      {'        <TableCell>'}
      {'          { datum.firstName }'}
      {'        </TableCell>'} {'        <TableCell>'}
      {'          { datum.lastName }'}
      {'        </TableCell>'}
      {'      </TableRow>'}
      {'    );'}
      {'  });'}
      {');'} {'// prepend array of rows with a header row'}
      {'tableRows.unshift('}
      {'  <TableRow>'}
      {'    <TableHeader>First Name</TableHeader>'}
      {'    <TableHeader>Last Name</TableHeader>'}
      {'  </TableRow>'}
      {');'} {'// render the table with the table rows'}
      {'<Table>'}
      {'  { tableRows }'}
      {'</Table>'}
    </StoryCodeBlock>

    <p>Pagination:</p>

    <p>To add a pagination footer to the table you will need to pass some extra props to the table</p>

    <StoryCodeBlock>
      {`let sizeOptions = Immutable.fromJS([{ 
                  id: "10", name: 10 }, { id: "25", name: 25 }, { id: "50", name: 50 
                }]),`}{' '}
      {' <Table'}
      {'  paginate // Show the pagination footer'}
      {'  currentPage="1" // Required - Current visible page'}
      {'  pageSize="10" // Required - Number of records to show per page'}
      {'  totalRecords // Required - Total number of records'}
      {'  showPageSizeSelection={ false } // Options  - Show page size selection'}
      {'  pageSizeSelectionOptions={ sizeOptions } // Optional - Page Size Options'}
      {'  thead={ TableRow } // Optional - A TableRow to be wrapped in <thead>'}
      {'/>'}
    </StoryCodeBlock>

    <p>Sorting:</p>

    <p>
      To enable column sorting, you will need to configure the
      <StoryCode>{' <TableHeader /> '}</StoryCode> component.
    </p>
  </div>
);

export default info;
