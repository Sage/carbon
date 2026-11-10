import React, { createRef } from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  DataGrid,
  DataGridCellParams,
  DataGridColumn,
  DataGridHandle,
} from ".";

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
  expect(screen.getAllByRole("row")[1]).toHaveAttribute(
    "aria-selected",
    "false",
  );
  expect(screen.getAllByRole("row")[2]).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("gives an intentionally empty action header discernible text", () => {
  const actionColumns: DataGridColumn<Row>[] = [
    {
      field: "actions",
      headerName: "",
      headerAriaLabel: "Row actions",
      type: "action",
      renderCell: () => <button>Open actions</button>,
    },
  ];

  render(
    <DataGrid
      aria-label="Items"
      rows={rows.slice(0, 1)}
      columns={actionColumns}
    />,
  );

  expect(
    screen.getByRole("columnheader", { name: "Row actions" }),
  ).toBeVisible();
});

test("can be named and described by external content", () => {
  render(
    <>
      <h2 id="grid-heading">Invoice lines</h2>
      <p id="grid-help">Use arrow keys to move between cells.</p>
      <DataGrid
        aria-labelledby="grid-heading"
        aria-describedby="grid-help"
        rows={rows}
        columns={columns}
      />
    </>,
  );

  expect(screen.getByRole("grid", { name: "Invoice lines" })).toHaveAttribute(
    "aria-describedby",
    "grid-help",
  );
});

test("exposes error and read-only cell state accessibly", () => {
  const stateColumns: DataGridColumn<Row>[] = [
    {
      field: "name",
      headerName: "Name",
      error: "Enter a name",
      readOnly: true,
    },
  ];
  render(
    <DataGrid
      aria-label="Items"
      rows={rows.slice(0, 1)}
      columns={stateColumns}
    />,
  );

  const cell = screen.getByRole("gridcell");
  expect(cell).toHaveAttribute("aria-invalid", "true");
  expect(cell).toHaveAttribute("aria-readonly", "true");
  expect(cell).toHaveAccessibleDescription("Enter a name");
});

test("derives error and read-only states from the complete cell context", () => {
  const error = jest.fn(
    ({ rowId, field, value }: DataGridCellParams<Row>) =>
      rowId === 2 && field === "name" && value === "Two" && "Fix row two",
  );
  const readOnly = jest.fn(
    ({ row }: DataGridCellParams<Row>) => row.type === "A",
  );
  const stateColumns: DataGridColumn<Row>[] = [
    { field: "name", headerName: "Name", error, readOnly },
  ];

  render(<DataGrid aria-label="Items" rows={rows} columns={stateColumns} />);

  const cells = screen.getAllByRole("gridcell");
  expect(cells[0]).toHaveAttribute("aria-readonly", "true");
  expect(cells[0]).not.toHaveAttribute("aria-invalid");
  expect(cells[1]).toHaveAttribute("aria-invalid", "true");
  expect(cells[1]).toHaveAccessibleDescription("Fix row two");
  expect(error).toHaveBeenCalledWith(
    expect.objectContaining({ row: rows[1], rowId: 2, field: "name" }),
  );
});

test("uses a custom row id for cell changes and the imperative handle", async () => {
  const user = userEvent.setup();
  const ref = createRef<DataGridHandle>();
  const onCellChange = jest.fn();
  const customRows = [
    { key: "line-a", name: "One" },
    { key: "line-b", name: "Two" },
  ];
  const customColumns: DataGridColumn<(typeof customRows)[number]>[] = [
    { field: "name", headerName: "Name" },
  ];

  render(
    <DataGrid
      ref={ref}
      aria-label="Items"
      rows={customRows}
      columns={customColumns}
      getRowId={({ key }) => key}
      onCellChange={onCellChange}
    />,
  );

  act(() => ref.current?.editCell("line-b", "name"));
  const editor = screen.getByRole("textbox", { name: "Name, row 2" });
  await user.type(editor, " updated{Enter}");

  expect(onCellChange).toHaveBeenCalledWith(
    expect.objectContaining({
      rowId: "line-b",
      field: "name",
      value: "Two updated",
    }),
  );
});

test("keeps scrolling cells transparent and raises focused action cells", () => {
  const stackingColumns: DataGridColumn<Row>[] = [
    {
      field: "name",
      headerName: "Name",
      sticky: "left",
      readOnly: true,
    },
    { field: "type", headerName: "Type" },
    {
      field: "actions",
      headerName: "Actions",
      type: "action",
      sticky: "right",
      renderCell: () => <button>Actions</button>,
    },
  ];
  render(
    <DataGrid
      aria-label="Items"
      rows={rows.slice(0, 1)}
      columns={stackingColumns}
    />,
  );

  const [stickyCell, scrollingCell, actionCell] =
    screen.getAllByRole("gridcell");
  const [headerGroup] = screen.getAllByRole("rowgroup");
  const [stickyHeader, scrollingHeader] = screen.getAllByRole("columnheader");
  expect(headerGroup).toHaveStyleRule("position", "relative");
  expect(headerGroup).toHaveStyleRule("inset-block-start", "auto");
  expect(headerGroup).toHaveStyleRule("z-index", "auto");
  expect(stickyHeader).toHaveStyleRule("position", "sticky");
  expect(scrollingHeader).toHaveStyleRule("position", "relative");
  expect(stickyCell).toHaveStyleRule(
    "background-color",
    "var(--data-grid-sticky-cell-bg,var(--table-row-bg-default))",
  );
  expect(stickyCell).toHaveStyleRule(
    "background-image",
    "linear-gradient(var(--input-typical-bg-read-only),var(--input-typical-bg-read-only))",
  );
  expect(scrollingCell).toHaveStyleRule("background-color", "transparent");
  expect(scrollingCell).toHaveStyleRule(
    "box-shadow",
    "inset 0 0 0 var(--global-borderwidth-s) var(--focus-borderalt)",
    { modifier: ":focus" },
  );
  expect(scrollingCell).toHaveStyleRule("z-index", "1", {
    modifier: ":focus",
  });
  expect(actionCell).toHaveStyleRule("z-index", "3", {
    modifier: ":focus-within",
  });
});

test("applies regular and medium content weights to resting cells", () => {
  const weightedColumns: DataGridColumn<Row>[] = [
    { field: "name", headerName: "Name", weight: "regular" },
    { field: "type", headerName: "Type", weight: "medium" },
  ];
  render(
    <DataGrid
      aria-label="Items"
      rows={rows.slice(0, 1)}
      columns={weightedColumns}
    />,
  );

  const [regularCell, mediumCell] = screen.getAllByRole("gridcell");
  expect(regularCell).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-regular-m)",
  );
  expect(mediumCell).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-medium-m)",
  );
});

test("focuses a cell on click without entering edit mode", async () => {
  const user = userEvent.setup();
  render(<DataGrid aria-label="Items" rows={rows} columns={columns} />);
  const cells = screen.getAllByRole("gridcell");

  await user.click(cells[1]);

  expect(cells[1]).toHaveFocus();
  expect(cells[1]).toHaveAttribute("tabindex", "0");
  expect(cells[0]).toHaveAttribute("tabindex", "-1");
  expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
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
  render(
    <DataGrid
      aria-label="Items"
      rows={fourRows}
      columns={columns}
      stickyHeader
    />,
  );
  const wrapper = screen.getByRole("grid");
  const [headerGroup] = screen.getAllByRole("rowgroup");
  expect(headerGroup).toHaveStyleRule("position", "sticky");
  expect(headerGroup).toHaveStyleRule("inset-block-start", "0");
  expect(headerGroup).toHaveStyleRule("z-index", "4");
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

test("does not reserve header space while vertically navigating by default", async () => {
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
  expect(wrapper.scrollTop).toBe(80);
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

test("enter focuses the dropdown editor", async () => {
  const user = userEvent.setup();
  render(<DataGrid aria-label="Items" rows={rows} columns={columns} />);
  const dropdownCell = screen.getAllByRole("gridcell")[1];

  await user.click(dropdownCell);
  await user.keyboard("{Enter}");

  expect(screen.getByRole("combobox", { name: "Type, row 1" })).toHaveFocus();
});

test("space focuses the dropdown editor without scrolling the grid", async () => {
  const user = userEvent.setup();
  render(<DataGrid aria-label="Items" rows={rows} columns={columns} />);
  const grid = screen.getByRole("grid");
  grid.scrollTop = 40;

  await user.click(screen.getAllByRole("gridcell")[1]);
  await user.keyboard(" ");

  expect(screen.getByRole("combobox", { name: "Type, row 1" })).toHaveFocus();
  expect(grid.scrollTop).toBe(40);
});

test("tab commits once and moves to the next cell when enabled", async () => {
  const user = userEvent.setup();
  const onCellChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      enableTabNavigation
      onCellChange={onCellChange}
    />,
  );
  const cells = screen.getAllByRole("gridcell");

  await user.click(cells[0]);
  await user.keyboard("{Enter}");
  await user.type(screen.getByRole("textbox"), " updated");
  await user.keyboard("{Tab}");

  expect(onCellChange).toHaveBeenCalledTimes(1);
  expect(onCellChange).toHaveBeenCalledWith(
    expect.objectContaining({ field: "name", value: "One updated" }),
  );
  expect(cells[1]).toHaveFocus();
});

test("Tab and Shift+Tab navigate linearly across row boundaries", async () => {
  const user = userEvent.setup();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      enableTabNavigation
    />,
  );
  const cells = screen.getAllByRole("gridcell");

  await user.click(cells[2]);
  await user.keyboard("{Tab}");
  expect(cells[3]).toHaveFocus();

  await user.keyboard("{Shift>}{Tab}{/Shift}");
  expect(cells[2]).toHaveFocus();
});

test("commits a dropdown selection and restores focus", async () => {
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
  const dropdownCell = screen.getAllByRole("gridcell")[1];

  await user.click(dropdownCell);
  await user.keyboard("{Enter}");
  await user.selectOptions(screen.getByRole("combobox"), "B");
  await user.keyboard("{Enter}");

  expect(onCellChange).toHaveBeenCalledWith(
    expect.objectContaining({ rowId: 1, field: "type", value: "B" }),
  );
  expect(dropdownCell).toHaveFocus();
});

test("read-only cells do not enter edit mode", async () => {
  const user = userEvent.setup();
  const readOnlyColumns: DataGridColumn<Row>[] = [
    { field: "name", headerName: "Name", readOnly: true },
  ];
  render(
    <DataGrid
      aria-label="Items"
      rows={rows.slice(0, 1)}
      columns={readOnlyColumns}
    />,
  );

  await user.click(screen.getByRole("gridcell"));
  await user.keyboard("{Enter}");

  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  expect(screen.getByRole("gridcell")).toHaveFocus();
});

test("read-only checkbox cells do not toggle", async () => {
  const user = userEvent.setup();
  const onCellChange = jest.fn();
  const readOnlyColumns: DataGridColumn<Row>[] = [
    {
      field: "selected",
      headerName: "Selected",
      type: "checkbox",
      readOnly: true,
    },
  ];
  render(
    <DataGrid
      aria-label="Items"
      rows={rows.slice(0, 1)}
      columns={readOnlyColumns}
      onCellChange={onCellChange}
    />,
  );

  await user.click(screen.getByRole("gridcell"));
  await user.keyboard(" ");

  expect(onCellChange).not.toHaveBeenCalled();
  expect(screen.getByRole("checkbox")).not.toBeChecked();
});

test("enter focuses and opens action cell content", async () => {
  const user = userEvent.setup();
  const onOpen = jest.fn();
  const actionColumns: DataGridColumn<Row>[] = [
    {
      field: "actions",
      headerName: "Actions",
      type: "action",
      renderCell: () => <button onClick={onOpen}>Open actions</button>,
    },
  ];
  render(
    <DataGrid
      aria-label="Items"
      rows={rows.slice(0, 1)}
      columns={actionColumns}
    />,
  );

  await user.click(screen.getByRole("gridcell"));
  await user.keyboard("{Enter}");

  expect(screen.getByRole("button", { name: "Open actions" })).toHaveFocus();
  expect(onOpen).toHaveBeenCalledTimes(1);
});

test("typing while navigating preserves the cell value and appends text", async () => {
  const user = userEvent.setup();
  render(<DataGrid aria-label="Items" rows={rows} columns={columns} />);
  await user.click(screen.getAllByRole("gridcell")[0]);

  await user.keyboard("X");
  expect(screen.getByRole("textbox")).toHaveValue("OneX");
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
  fireEvent.keyDown(cell, { key: "Enter" });
  await user.type(screen.getByRole("textbox"), " changed");
  fireEvent.keyDown(screen.getByRole("textbox"), { key: "Escape" });

  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  expect(cell).toHaveFocus();
  expect(onCellChange).not.toHaveBeenCalled();
});
