import React, { useMemo, useRef, useState } from "react";

import { ActionPopover } from "../action-popover";
import ActionPopoverItem from "../action-popover/action-popover-item/action-popover-item.component";
import Button from "../button";
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
  rowCount?: number;
}

const DataGridComponent = ({
  disableVirtualization,
  enableTabNavigation = true,
  maxHeight = "240px",
  maxWidth = "420px",
  rowCount = 6,
  rowOverscan,
  stickyHeader = true,
}: DataGridComponentProps) => {
  const gridRef = useRef<DataGridHandle>(null);
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
        width: 160,
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
      },
      {
        field: "actions",
        headerName: "",
        headerAriaLabel: "Actions",
        type: "action",
        width: 52,
        sticky: "right",
        renderCell: ({ row }) => (
          <ActionPopover
            aria-label={`Actions for row ${row.id}`}
            buttonLabel={<Icon type="ellipsis_vertical" />}
          >
            <ActionPopoverItem
              onClick={() =>
                setRows((currentRows) => {
                  const rowIndex = currentRows.findIndex(
                    ({ id }) => id === row.id,
                  );
                  const duplicate = {
                    ...row,
                    id: Math.max(...currentRows.map(({ id }) => id)) + 1,
                  };
                  return [
                    ...currentRows.slice(0, rowIndex + 1),
                    duplicate,
                    ...currentRows.slice(rowIndex + 1),
                  ];
                })
              }
            >
              Duplicate
            </ActionPopoverItem>
            <ActionPopoverItem
              onClick={() =>
                setRows((currentRows) =>
                  currentRows.filter(({ id }) => id !== row.id),
                )
              }
            >
              Delete
            </ActionPopoverItem>
          </ActionPopover>
        ),
      },
    ],
    [],
  );

  return (
    <div>
      <Button onClick={() => gridRef.current?.editCell(2, "name")} mb={2}>
        Edit first error
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
        onCellChange={({ rowId, field, value }) => {
          setRows((currentRows) =>
            currentRows.map((row) =>
              row.id === rowId ? { ...row, [field]: value } : row,
            ),
          );
        }}
      />
    </div>
  );
};

export default DataGridComponent;
