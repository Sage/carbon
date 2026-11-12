import React, { useMemo, useRef, useState } from "react";

import { ActionPopover } from "../action-popover";
import ActionPopoverItem from "../action-popover/action-popover-item/action-popover-item.component";
import Button from "../button/__next__";
import Icon from "../icon";
import { DataGrid, DataGridColumn, DataGridHandle, DataGridProps } from ".";

interface TestRow {
  id: number;
  name: string;
  type: string;
  quantity: string;
  selected: boolean;
  actions: null;
}

const createRows = (count: number): TestRow[] =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: index === 1 ? "" : `Line ${index + 1}`,
    type: index % 2 === 0 ? "Service" : "Product",
    quantity: String((index % 5) + 1),
    selected: false,
    actions: null,
  }));

interface DataGridComponentProps
  extends Pick<
    DataGridProps<TestRow>,
    | "disableVirtualization"
    | "enableTabNavigation"
    | "maxHeight"
    | "maxWidth"
    | "rowOverscan"
    | "stickyHeader"
  > {
  filterableDropdown?: boolean;
  rowCount?: number;
}

const DataGridComponent = ({
  disableVirtualization,
  enableTabNavigation = true,
  filterableDropdown = false,
  maxHeight = "240px",
  maxWidth = "420px",
  rowCount = 6,
  rowOverscan,
  stickyHeader = true,
}: DataGridComponentProps) => {
  const gridRef = useRef<DataGridHandle<TestRow>>(null);
  const [rows, setRows] = useState(() => createRows(rowCount));
  const columns = useMemo<DataGridColumn<TestRow>[]>(
    () => [
      {
        field: "name",
        headerName: "Name",
        width: 180,
        sticky: "left",
        error: ({ value }) => !value && "Enter a name",
        readOnly: ({ row }) => row.id === 3,
      },
      {
        field: "type",
        headerName: "Type",
        type: "dropdown",
        filterable: filterableDropdown,
        width: 160,
        readOnly: ({ row }) => row.id === 3,
        options: [
          { label: "Service", value: "Service" },
          { label: "Product", value: "Product" },
        ],
      },
      { field: "quantity", headerName: "Quantity", width: 120 },
      {
        field: "selected",
        headerName: "Selected",
        type: "checkbox",
        width: 100,
        readOnly: ({ row }) => row.id === 3,
      },
      {
        field: "actions",
        headerName: "",
        headerAriaLabel: "Actions",
        type: "action",
        width: 52,
        sticky: "right",
        readOnly: ({ row }) => row.id === 3,
        renderCell: ({ api, row, rowId }) => (
          <ActionPopover
            aria-label={`Actions for row ${row.id}`}
            buttonLabel={<Icon type="ellipsis_vertical" />}
            size="small"
          >
            <ActionPopoverItem
              onClick={() =>
                api.duplicateRow(rowId, {
                  ...row,
                  id: Math.max(0, ...rows.map(({ id }) => id)) + 1,
                })
              }
            >
              Duplicate
            </ActionPopoverItem>
            <ActionPopoverItem onClick={() => api.deleteRow(rowId)}>
              Delete
            </ActionPopoverItem>
          </ActionPopover>
        ),
      },
    ],
    [filterableDropdown, rows],
  );

  return (
    <div>
      <Button onClick={() => gridRef.current?.editCell(2, "name")} mb={2}>
        Edit first error
      </Button>
      <Button
        onClick={() =>
          gridRef.current?.addRow({
            id: Math.max(0, ...rows.map(({ id }) => id)) + 1,
            name: "",
            type: "Service",
            quantity: "1",
            selected: false,
            actions: null,
          })
        }
        mb={2}
        ml={2}
      >
        Add line
      </Button>
      <DataGrid
        ref={gridRef}
        aria-label="Invoice lines"
        rows={rows}
        columns={columns}
        disableVirtualization={disableVirtualization}
        enableTabNavigation={enableTabNavigation}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        rowOverscan={rowOverscan}
        stickyHeader={stickyHeader}
        onRowsChange={(nextRows) => setRows(nextRows)}
      />
    </div>
  );
};

export default DataGridComponent;
