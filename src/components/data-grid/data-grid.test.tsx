import React, { createRef } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DataGrid, DataGridColumn, DataGridHandle } from ".";

interface Row {
  id: number;
  name: string;
  type: string;
  selected: boolean;
}

const rows: Row[] = [
  { id: 1, name: "One", type: "A", selected: false },
  { id: 2, name: "Two", type: "B", selected: true },
];

const columns: DataGridColumn<Row>[] = [
  { field: "name", headerName: "Name" },
  {
    field: "type",
    headerName: "Type",
    type: "dropdown",
    options: [
      { label: "A", value: "A" },
      { label: "B", value: "B" },
    ],
  },
  { field: "selected", headerName: "Selected", type: "checkbox" },
];

test("renders object rows with accessible grid semantics", () => {
  render(<DataGrid aria-label="Items" rows={rows} columns={columns} />);

  expect(screen.getByRole("grid", { name: "Items" })).toHaveAttribute(
    "aria-rowcount",
    "3",
  );
  expect(screen.getAllByRole("columnheader")).toHaveLength(3);
  expect(screen.getAllByRole("gridcell")).toHaveLength(6);
  expect(screen.getByText("One")).toBeVisible();
});

test("uses arrow keys to navigate cells", async () => {
  const user = userEvent.setup();
  render(<DataGrid aria-label="Items" rows={rows} columns={columns} />);
  const cells = screen.getAllByRole("gridcell");

  await user.click(cells[0]);
  await user.keyboard("{ArrowRight}");
  expect(cells[1]).toHaveFocus();
  await user.keyboard("{ArrowDown}");
  expect(cells[4]).toHaveFocus();
});

test("scrolls horizontally to reveal the cell reached with arrow keys", async () => {
  const user = userEvent.setup();
  const wideColumns: DataGridColumn<Row>[] = columns.map((column) => ({
    ...column,
    width: 200,
  }));
  render(<DataGrid aria-label="Items" rows={rows} columns={wideColumns} />);
  const wrapper = screen.getByRole("grid");
  Object.defineProperty(wrapper, "clientWidth", {
    configurable: true,
    value: 300,
  });

  await user.click(screen.getAllByRole("gridcell")[0]);
  await user.keyboard("{ArrowRight}");

  expect(wrapper.scrollLeft).toBe(100);
});

test("accounts for sticky edge columns when revealing a navigated cell", async () => {
  const user = userEvent.setup();
  const stickyColumns: DataGridColumn<Row>[] = [
    { ...columns[0], width: 100, sticky: "left" },
    { ...columns[1], width: 200 },
    { ...columns[2], width: 100, sticky: "right" },
  ];
  render(<DataGrid aria-label="Items" rows={rows} columns={stickyColumns} />);
  const wrapper = screen.getByRole("grid");
  Object.defineProperty(wrapper, "clientWidth", {
    configurable: true,
    value: 300,
  });

  await user.click(screen.getAllByRole("gridcell")[0]);
  await user.keyboard("{ArrowRight}");

  expect(wrapper.scrollLeft).toBe(100);
});

test("scrolls vertically to keep the navigated cell below the sticky header", async () => {
  const user = userEvent.setup();
  const fourRows = [
    ...rows,
    { id: 3, name: "Three", type: "A", selected: false },
    { id: 4, name: "Four", type: "B", selected: false },
  ];
  render(<DataGrid aria-label="Items" rows={fourRows} columns={columns} />);
  const wrapper = screen.getByRole("grid");
  Object.defineProperty(wrapper, "clientHeight", {
    configurable: true,
    value: 120,
  });
  wrapper.scrollTop = 80;

  const thirdRowFirstCell = screen.getAllByRole("gridcell")[6];
  await user.click(thirdRowFirstCell);
  await user.keyboard("{ArrowUp}");

  expect(screen.getAllByRole("gridcell")[3]).toHaveFocus();
  expect(wrapper.scrollTop).toBe(40);
});

test("enters edit mode, commits a value, and returns focus to the cell", async () => {
  const user = userEvent.setup();
  const onCellChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      onCellChange={onCellChange}
    />,
  );
  const cell = screen.getAllByRole("gridcell")[0];

  await user.click(cell);
  await user.keyboard("{Enter}");
  const input = screen.getByRole("textbox", { name: "Name, row 1" });
  await user.clear(input);
  await user.type(input, "Changed{Enter}");

  expect(onCellChange).toHaveBeenCalledWith(
    expect.objectContaining({ rowId: 1, field: "name", value: "Changed" }),
  );
  expect(cell).toHaveFocus();
});

test("typing while navigating replaces the cell value", async () => {
  const user = userEvent.setup();
  render(<DataGrid aria-label="Items" rows={rows} columns={columns} />);
  await user.click(screen.getAllByRole("gridcell")[0]);

  await user.keyboard("X");
  expect(screen.getByRole("textbox")).toHaveValue("X");
});

test("space toggles a checkbox cell", async () => {
  const user = userEvent.setup();
  const onCellChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      onCellChange={onCellChange}
    />,
  );
  await user.click(screen.getAllByRole("gridcell")[1]);
  await user.keyboard("{ArrowRight}");

  await user.keyboard(" ");
  expect(onCellChange).toHaveBeenCalledWith(
    expect.objectContaining({ field: "selected", value: true }),
  );
});

test("a single click toggles a checkbox cell", async () => {
  const user = userEvent.setup();
  const onCellChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      onCellChange={onCellChange}
    />,
  );
  const checkboxCell = screen.getAllByRole("gridcell")[2];

  await user.click(checkboxCell);

  expect(checkboxCell).toHaveFocus();
  expect(onCellChange).toHaveBeenCalledTimes(1);
  expect(onCellChange).toHaveBeenCalledWith(
    expect.objectContaining({ field: "selected", value: true }),
  );
});

test("a double click only toggles a checkbox cell once", async () => {
  const user = userEvent.setup();
  const onCellChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      onCellChange={onCellChange}
    />,
  );

  await user.dblClick(screen.getAllByRole("gridcell")[2]);

  expect(onCellChange).toHaveBeenCalledTimes(1);
});

test("the imperative handle focuses and edits a cell", () => {
  const ref = createRef<DataGridHandle>();
  render(
    <DataGrid ref={ref} aria-label="Items" rows={rows} columns={columns} />,
  );

  act(() => ref.current?.focusCell(2, "name"));
  expect(screen.getAllByRole("gridcell")[3]).toHaveFocus();

  act(() => ref.current?.editCell(2, "name"));
  expect(screen.getByRole("textbox", { name: "Name, row 2" })).toHaveFocus();
});

test("escape cancels editing", async () => {
  const user = userEvent.setup();
  render(<DataGrid aria-label="Items" rows={rows} columns={columns} />);
  const cell = screen.getAllByRole("gridcell")[0];
  await user.click(cell);
  fireEvent.keyDown(cell, { key: "Enter" });
  fireEvent.keyDown(screen.getByRole("textbox"), { key: "Escape" });

  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  expect(cell).toHaveFocus();
});
