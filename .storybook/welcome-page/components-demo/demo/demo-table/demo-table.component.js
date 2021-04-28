import React from "react";
import {
  FlatTable,
  FlatTableHeader,
  FlatTableRow,
  FlatTableCell,
} from "../../../../../src/components/flat-table";

const DemoTable = () => (
  <FlatTable>
    <FlatTableRow>
      <FlatTableHeader>First Name</FlatTableHeader>
      <FlatTableHeader>Second Name</FlatTableHeader>
      <FlatTableHeader>&nbsp;</FlatTableHeader>
    </FlatTableRow>
    <FlatTableRow>
      <FlatTableCell>John</FlatTableCell>
      <FlatTableCell>Doe</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}} icon="email">
            Email Invoice
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>
    <FlatTableRow>
      <FlatTableCell>Paul</FlatTableCell>
      <FlatTableCell>Smith</FlatTableCell>
      <FlatTableCell>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}} icon="email">
            Email Invoice
          </ActionPopoverItem>
        </ActionPopover>
      </FlatTableCell>
    </FlatTableRow>
  </FlatTable>
);

export default DemoTable;
