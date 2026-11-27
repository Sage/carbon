import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";

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

  const checkbox = screen.getByRole("checkbox", { name: "Selected, row 1" });
  fireEvent.click(within(checkbox).getByRole("checkbox", { hidden: true }));

  expect(checkbox).not.toBeChecked();
  expect(checkbox).not.toHaveAttribute("aria-readonly");
});

test.each([
  {
    checked: true,
    readOnly: true,
    headerAriaLabel: undefined,
    label: "Selected",
  },
  {
    checked: true,
    readOnly: true,
    headerAriaLabel: "Select item",
    label: "Select item",
  },
])(
  "exposes checked and read-only state with the name $label",
  ({ checked, readOnly, headerAriaLabel, label }) => {
    const row: Row = { id: 1, selected: checked };
    render(
      <DataGridCellContent
        params={{
          api: {} as DataGridApi<Row>,
          column: {
            field: "selected",
            headerName: "Selected",
            type: "checkbox",
            headerAriaLabel,
          },
          field: "selected",
          row,
          rowId: row.id,
          value: checked,
        }}
        rowIndex={0}
        align="center"
        readOnly={readOnly}
      />,
    );

    const checkbox = screen.getByRole("checkbox", { name: `${label}, row 1` });
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute("aria-readonly", "true");
    expect(
      within(checkbox).getByRole("checkbox", { hidden: true }),
    ).toHaveAttribute("inert");
  },
);

test("preserves custom checkbox-cell controls without adding checkbox semantics", () => {
  const row: Row = { id: 1, selected: false };
  render(
    <DataGridCellContent
      params={{
        api: {} as DataGridApi<Row>,
        column: {
          field: "selected",
          headerName: "Selected",
          type: "checkbox",
          renderCell: () => <button>Custom selection</button>,
        },
        field: "selected",
        row,
        rowId: row.id,
        value: false,
      }}
      rowIndex={0}
      align="center"
      readOnly={false}
    />,
  );

  expect(
    screen.getByRole("button", { name: "Custom selection" }),
  ).toBeVisible();
  expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
});
