import React from "react";

import {
  ActionPopover,
  ActionPopoverItem,
} from "../../../../../src/components/action-popover";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableHeader,
  FlatTableRow,
  FlatTableCell,
} from "../../../../../src/components/flat-table";

const DemoTable = () => (
  <FlatTable>
    <FlatTableHead>
      <FlatTableRow>
        <FlatTableHeader>First Name</FlatTableHeader>
        <FlatTableHeader>Second Name</FlatTableHeader>
        <FlatTableHeader align="center">Actions</FlatTableHeader>
      </FlatTableRow>
    </FlatTableHead>
    <FlatTableBody>
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
    </FlatTableBody>
  </FlatTable>
);

export default DemoTable;
