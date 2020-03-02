import React from 'react';
import { Table, TableHeader, TableRow, TableCell } from '../../../../../src/components/table';
import { ActionPopover, ActionPopoverItem } from '../../../../../src/components/action-popover';

const DemoTable = () => (
  <Table>
    <TableRow>
      <TableHeader>First Name</TableHeader>
      <TableHeader>Second Name</TableHeader>
      <TableHeader>&nbsp;</TableHeader>
    </TableRow>
    <TableRow>
      <TableCell>John</TableCell>
      <TableCell>Doe</TableCell>
      <TableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={ () => {} }icon='email'>
            Email Invoice
          </ActionPopoverItem>
        </ActionPopover>
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Paul</TableCell>
      <TableCell>Smith</TableCell>
      <TableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={ () => {} } icon='email'>
            Email Invoice
          </ActionPopoverItem>
        </ActionPopover>
      </TableCell>
    </TableRow>
  </Table>
);

export default DemoTable;
