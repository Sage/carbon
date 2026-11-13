import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { DataGridApi, DataGridCellParams } from "../../data-grid.types";
import DataGridCellContent from "./data-grid-cell-content.component";

interface Row {
  id: number;
  selected: boolean;
}

test("keeps the nested checkbox controlled by the grid cell", () => {
  const row: Row = { id: 1, selected: false };
  const params: DataGridCellParams<Row> = {
    api: {} as DataGridApi<Row>,
    column: {
      field: "selected",
      headerName: "Selected",
      type: "checkbox",
    },
    field: "selected",
    row,
    rowId: row.id,
    value: row.selected,
  };

  render(
    <DataGridCellContent
      params={params}
      rowIndex={0}
      align="center"
      readOnly={false}
    />,
  );

  fireEvent.click(screen.getByRole("checkbox"));

  expect(screen.getByRole("checkbox")).not.toBeChecked();
});
