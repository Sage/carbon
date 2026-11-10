import React, { useState } from "react";
import { DataGrid, DataGridColumn } from "..";
import { createColumnReorderPlugin, createColumnResizePlugin } from ".";

interface Row {
  id: number;
  name: string;
  amount: string;
  note: string;
  total: string;
}
const columns: DataGridColumn<Row>[] = [
  { field: "name", headerName: "Name", width: 120, sticky: "left" },
  { field: "amount", headerName: "Amount", width: 150 },
  { field: "note", headerName: "Note", flex: 1, minWidth: 120 },
  { field: "total", headerName: "Total", width: 100, sticky: "right" },
];
const plugins = [
  createColumnReorderPlugin<Row>(),
  createColumnResizePlugin<Row>(),
];

export const ColumnPluginGrid = () => {
  const [rows, setRows] = useState(() =>
    Array.from({ length: 1000 }, (_, index) => ({
      id: index,
      name: `Item ${index}`,
      amount: `${index}`,
      note: `Note ${index}`,
      total: `${index}`,
    })),
  );
  return (
    <DataGrid
      aria-label="Plugin grid"
      columns={columns}
      rows={rows}
      plugins={plugins}
      maxWidth={720}
      maxHeight={320}
      stickyHeader
      onCellChange={({ rowId, field, value }) =>
        setRows((current) =>
          current.map((row) =>
            row.id === rowId ? { ...row, [field]: value } : row,
          ),
        )
      }
    />
  );
};

export const TwoColumnPluginGrids = () => (
  <>
    <ColumnPluginGrid />
    <ColumnPluginGrid />
  </>
);
