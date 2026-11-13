import React, { createRef } from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ActionPopover } from "../action-popover";
import ActionPopoverItem from "../action-popover/action-popover-item/action-popover-item.component";
import {
  DataGrid,
  DataGridCellParams,
  DataGridColumn,
  DataGridHandle,
} from ".";

jest.mock("@tanstack/react-virtual", () => ({
  useVirtualizer: jest.fn(
    ({
      count = 0,
      enabled,
      getItemKey,
    }: {
      count?: number;
      enabled?: boolean;
      getItemKey?: (index: number) => unknown;
    }) => {
      const isGridVirtualizer = typeof enabled === "boolean";

      if (enabled) getItemKey?.(0);

      return {
        getVirtualItems: () => {
          if (isGridVirtualizer) {
            return enabled ? [{ index: 0, start: 80, end: 120 }] : [];
          }

          return Array.from({ length: count }, (_, index) => ({
            end: (index + 1) * 40,
            index,
            key: index,
            lane: 0,
            size: 40,
            start: index * 40,
          }));
        },
        getTotalSize: () => (isGridVirtualizer ? 200 : count * 40),
        measureElement: jest.fn(),
        scrollToIndex: jest.fn(),
      };
    },
  ),
}));

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
  expect(cell).toHaveStyleRule(
    "background-color",
    "var(--input-typical-bg-read-only)",
  );
  expect(cell).toHaveStyleRule("color", "var(--input-typical-txt-read-only)");
  expect(cell).toHaveStyleRule(
    "border-block-end",
    "var(--global-borderwidth-xs) solid var(--input-typical-border-default)",
  );
  expect(cell).toHaveStyleRule("cursor", "default");
});

test("keeps the error description on the focused cell editor", async () => {
  const user = userEvent.setup();
  const stateColumns: DataGridColumn<Row>[] = [
    {
      field: "name",
      headerName: "Name",
      error: "Enter a name",
    },
  ];
  render(
    <DataGrid
      aria-label="Items"
      rows={rows.slice(0, 1)}
      columns={stateColumns}
    />,
  );

  await user.dblClick(screen.getByRole("gridcell"));

  const editor = screen.getByRole("textbox", { name: "Name, row 1" });
  expect(editor).toHaveAttribute("aria-invalid", "true");
  expect(editor).toHaveAccessibleDescription("Enter a name");
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
  const onRowsChange = jest.fn();
  const customRows = [
    { key: "line-a", name: "One" },
    { key: "line-b", name: "Two" },
  ];
  const ref = createRef<DataGridHandle<(typeof customRows)[number]>>();
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
      onRowsChange={onRowsChange}
    />,
  );

  act(() => ref.current?.editCell("line-b", "name"));
  const editor = screen.getByRole("textbox", { name: "Name, row 2" });
  await user.type(editor, " updated{Enter}");

  expect(onRowsChange).toHaveBeenCalledWith(
    expect.any(Array),
    expect.objectContaining({
      type: "cell-edit",
      rowId: "line-b",
      field: "name",
      value: "Two updated",
    }),
  );
});

test("emits the complete immutable row collection when a cell changes", async () => {
  const user = userEvent.setup();
  const onRowsChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      onRowsChange={onRowsChange}
    />,
  );

  await user.click(screen.getAllByRole("gridcell")[0]);
  await user.keyboard("{Enter}");
  await user.type(screen.getByRole("textbox"), " updated{Enter}");

  const [nextRows, change] = onRowsChange.mock.calls[0];
  expect(nextRows).toEqual([{ ...rows[0], name: "One updated" }, rows[1]]);
  expect(nextRows).not.toBe(rows);
  expect(nextRows[1]).toBe(rows[1]);
  expect(change).toEqual({
    type: "cell-edit",
    rowId: 1,
    field: "name",
    previousValue: "One",
    value: "One updated",
    previousRow: rows[0],
    row: { ...rows[0], name: "One updated" },
  });
});

test("keeps navigation attached to the stable row id after rows reorder", async () => {
  const user = userEvent.setup();
  const { rerender } = render(
    <DataGrid aria-label="Items" rows={rows} columns={columns} />,
  );

  await user.click(screen.getAllByRole("gridcell")[0]);
  rerender(
    <DataGrid aria-label="Items" rows={[rows[1], rows[0]]} columns={columns} />,
  );

  const reorderedCells = screen.getAllByRole("gridcell");
  expect(reorderedCells[3]).toHaveAttribute("tabindex", "0");
  expect(reorderedCells[0]).toHaveAttribute("tabindex", "-1");
});

test("returns navigation to the first cell when the active row is removed", async () => {
  const user = userEvent.setup();
  const { rerender } = render(
    <DataGrid aria-label="Items" rows={rows} columns={columns} />,
  );

  await user.click(screen.getAllByRole("gridcell")[3]);
  rerender(
    <DataGrid aria-label="Items" rows={rows.slice(0, 1)} columns={columns} />,
  );

  expect(screen.getAllByRole("gridcell")[0]).toHaveAttribute("tabindex", "0");
});

test("keeps an editor attached to the stable row id after rows reorder", async () => {
  const user = userEvent.setup();
  const onRowsChange = jest.fn();
  const { rerender } = render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      onRowsChange={onRowsChange}
    />,
  );

  await user.click(screen.getAllByRole("gridcell")[0]);
  await user.keyboard("{Enter}");
  rerender(
    <DataGrid
      aria-label="Items"
      rows={[rows[1], rows[0]]}
      columns={columns}
      onRowsChange={onRowsChange}
    />,
  );

  const editor = screen.getByRole("textbox", { name: "Name, row 2" });
  expect(editor).toHaveValue("One");
  await user.type(editor, " updated{Enter}");
  expect(onRowsChange).toHaveBeenCalledWith(
    [rows[1], { ...rows[0], name: "One updated" }],
    expect.objectContaining({ rowId: 1, value: "One updated" }),
  );
});

test("exposes row transactions to custom action cells", async () => {
  const user = userEvent.setup();
  const onRowsChange = jest.fn();
  const actionColumns: DataGridColumn<Row>[] = [
    { field: "name", headerName: "Name" },
    {
      field: "actions",
      headerName: "",
      headerAriaLabel: "Actions",
      type: "action",
      renderCell: ({ api, rowId }) => (
        <button onClick={() => api.deleteRow(rowId)}>Delete row</button>
      ),
    },
  ];
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={actionColumns}
      onRowsChange={onRowsChange}
    />,
  );

  await user.click(screen.getAllByRole("button", { name: "Delete row" })[0]);

  expect(onRowsChange).toHaveBeenCalledWith([rows[1]], {
    type: "row-delete",
    rowId: 1,
    row: rows[0],
    index: 0,
  });
});

test("restores focus after duplicate and delete row operations", async () => {
  const user = userEvent.setup();
  const onRowsChange = jest.fn();
  const gridRef = createRef<DataGridHandle<Row>>();
  const actionColumns: DataGridColumn<Row>[] = [
    { field: "name", headerName: "Name" },
    {
      field: "actions",
      headerName: "Actions",
      type: "action",
      renderCell: ({ api, row, rowId }) => (
        <>
          <button onClick={() => api.duplicateRow(rowId, { ...row, id: 3 })}>
            Duplicate {rowId}
          </button>
          <button onClick={() => api.deleteRow(rowId)}>Delete {rowId}</button>
        </>
      ),
    },
  ];
  const renderGrid = (currentRows: Row[]) => (
    <>
      <button
        onClick={() =>
          gridRef.current?.addRow({
            id: 4,
            name: "Four",
            type: "A",
            selected: false,
          })
        }
      >
        Add row
      </button>
      <button
        onClick={() =>
          gridRef.current?.insertRow(
            {
              id: 5,
              name: "Five",
              type: "A",
              selected: false,
            },
            { afterRowId: 1 },
          )
        }
      >
        Insert row
      </button>
      <DataGrid
        ref={gridRef}
        aria-label="Items"
        rows={currentRows}
        columns={actionColumns}
        onRowsChange={onRowsChange}
      />
    </>
  );
  const view = render(renderGrid(rows));

  await user.click(screen.getByRole("button", { name: "Duplicate 1" }));
  const duplicatedRows = onRowsChange.mock.calls[0][0] as Row[];
  view.rerender(renderGrid(duplicatedRows));

  await waitFor(() => expect(screen.getAllByRole("gridcell")[2]).toHaveFocus());

  await user.click(screen.getByRole("button", { name: "Delete 3" }));
  const rowsAfterDelete = onRowsChange.mock.calls[1][0] as Row[];
  view.rerender(renderGrid(rowsAfterDelete));

  await waitFor(() => expect(screen.getAllByRole("gridcell")[2]).toHaveFocus());

  await user.click(screen.getByRole("button", { name: "Add row" }));
  const rowsAfterAdd = onRowsChange.mock.calls[2][0] as Row[];
  view.rerender(renderGrid(rowsAfterDelete.map((row) => ({ ...row }))));
  expect(screen.getByRole("button", { name: "Add row" })).toHaveFocus();
  view.rerender(renderGrid(rowsAfterAdd));

  await waitFor(() => expect(screen.getAllByRole("gridcell")[4]).toHaveFocus());

  await user.click(screen.getByRole("button", { name: "Insert row" }));
  const rowsAfterInsert = onRowsChange.mock.calls[3][0] as Row[];
  view.rerender(renderGrid(rowsAfterInsert));

  await waitFor(() => expect(screen.getAllByRole("gridcell")[2]).toHaveFocus());
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
  expect(actionCell).toHaveStyleRule("z-index", "5", {
    modifier:
      ':has([data-element="action-popover-button"][aria-expanded="true"])',
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

test("supports right-aligned headers and content", () => {
  const alignedColumns: DataGridColumn<Row>[] = [
    { field: "name", headerName: "Name", align: "right" },
  ];
  render(
    <DataGrid
      aria-label="Items"
      rows={rows.slice(0, 1)}
      columns={alignedColumns}
      maxWidth={500}
      maxHeight="20rem"
    />,
  );

  expect(screen.getByRole("columnheader")).toHaveStyleRule(
    "justify-content",
    "flex-end",
  );
  expect(screen.getByText("One")).toHaveStyleRule(
    "justify-content",
    "flex-end",
  );
  expect(screen.getByRole("grid")).toHaveStyleRule("max-width", "500px");
  expect(screen.getByRole("grid")).toHaveStyleRule("max-height", "20rem");
});

test("raises a sticky cell while it is being edited", async () => {
  const user = userEvent.setup();
  const stickyColumns: DataGridColumn<Row>[] = [
    { field: "name", headerName: "Name", sticky: "left" },
  ];
  render(
    <DataGrid
      aria-label="Items"
      rows={rows.slice(0, 1)}
      columns={stickyColumns}
    />,
  );

  const cell = screen.getByRole("gridcell");
  await user.dblClick(cell);

  expect(cell).toHaveStyleRule("z-index", "3", {
    modifier: ":focus-within",
  });
});

test("virtualizes constrained grids and renders both spacer rows", () => {
  const manyRows = Array.from({ length: 21 }, (_, index) => ({
    id: index,
    name: `Row ${index}`,
    type: "A",
    selected: false,
  }));
  render(
    <DataGrid
      aria-label="Items"
      rows={manyRows}
      columns={columns}
      maxHeight={120}
    />,
  );

  expect(screen.getAllByRole("presentation")).toHaveLength(2);
  expect(screen.getAllByRole("presentation")[0]).toHaveStyleRule(
    "height",
    "40px",
  );
  expect(screen.getAllByRole("presentation")[1]).toHaveStyleRule(
    "height",
    "80px",
  );
  expect(screen.getAllByRole("gridcell")).toHaveLength(columns.length);
});

test("uses regular weight while editing a medium-weight cell", async () => {
  const user = userEvent.setup();
  const weightedColumns: DataGridColumn<Row>[] = [
    { field: "name", headerName: "Name", weight: "medium" },
  ];
  render(
    <DataGrid
      aria-label="Items"
      rows={rows.slice(0, 1)}
      columns={weightedColumns}
    />,
  );

  const cell = screen.getByRole("gridcell");
  await user.click(cell);
  await user.keyboard("{Enter}");

  expect(cell).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-regular-m)",
  );
  expect(cell).toHaveStyleRule("cursor", "text");
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

test("leaves keyboard handling with nested controls in non-action cells", async () => {
  const user = userEvent.setup();
  const interactiveColumns: DataGridColumn<Row>[] = [
    {
      field: "name",
      headerName: "Name",
      renderCell: () => <button type="button">Nested control</button>,
    },
    { field: "type", headerName: "Type" },
  ];
  render(
    <DataGrid
      aria-label="Items"
      rows={rows.slice(0, 1)}
      columns={interactiveColumns}
    />,
  );
  const nestedControl = screen.getByRole("button", {
    name: "Nested control",
  });

  act(() => nestedControl.focus());
  await user.keyboard("{ArrowRight}");

  expect(nestedControl).toHaveFocus();
  expect(screen.getAllByRole("gridcell")[1]).not.toHaveFocus();
});

test("leaves keyboard handling with secondary controls in action cells", async () => {
  const user = userEvent.setup();
  const interactiveColumns: DataGridColumn<Row>[] = [
    { field: "name", headerName: "Name" },
    {
      field: "actions",
      headerName: "Actions",
      type: "action",
      renderCell: () => (
        <>
          <ActionPopover aria-label="More actions" size="small">
            <ActionPopoverItem>Duplicate</ActionPopoverItem>
          </ActionPopover>
          <button type="button">Secondary action</button>
        </>
      ),
    },
  ];
  render(
    <DataGrid
      aria-label="Items"
      rows={rows.slice(0, 1)}
      columns={interactiveColumns}
    />,
  );
  const secondaryAction = screen.getByRole("button", {
    name: "Secondary action",
  });

  act(() => secondaryAction.focus());
  await user.keyboard("{ArrowLeft}");

  expect(secondaryAction).toHaveFocus();
  expect(screen.getAllByRole("gridcell")[0]).not.toHaveFocus();
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

test("reveals the non-sticky header when navigating to the first row", async () => {
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

  await user.click(screen.getAllByRole("gridcell")[3]);
  await user.keyboard("{ArrowUp}");

  expect(screen.getAllByRole("gridcell")[0]).toHaveFocus();
  expect(wrapper.scrollTop).toBe(0);
});

test("enters edit mode, commits a value, and returns focus to the cell", async () => {
  const user = userEvent.setup();
  const onRowsChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      onRowsChange={onRowsChange}
    />,
  );
  const cell = screen.getAllByRole("gridcell")[0];

  await user.click(cell);
  await user.keyboard("{Enter}");
  const input = screen.getByRole("textbox", { name: "Name, row 1" });
  await user.clear(input);
  await user.type(input, "Changed{Enter}");

  expect(onRowsChange).toHaveBeenCalledWith(
    expect.any(Array),
    expect.objectContaining({
      type: "cell-edit",
      rowId: 1,
      field: "name",
      value: "Changed",
    }),
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
  Object.defineProperty(grid, "clientHeight", {
    configurable: true,
    value: 120,
  });
  grid.scrollTop = 40;

  // Use a later row here so this remains focused on Space opening the editor.
  // Navigating to the first row intentionally reveals a non-sticky header.
  await user.click(screen.getAllByRole("gridcell")[4]);
  await user.keyboard(" ");

  expect(screen.getByRole("combobox", { name: "Type, row 2" })).toHaveFocus();
  expect(grid.scrollTop).toBe(40);
});

test("tab commits once and moves to the next cell when enabled", async () => {
  const user = userEvent.setup();
  const onRowsChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      enableTabNavigation
      onRowsChange={onRowsChange}
    />,
  );
  const cells = screen.getAllByRole("gridcell");

  await user.click(cells[0]);
  await user.keyboard("{Enter}");
  await user.type(screen.getByRole("textbox"), " updated");
  await user.keyboard("{Tab}");

  expect(onRowsChange).toHaveBeenCalledTimes(1);
  expect(onRowsChange).toHaveBeenCalledWith(
    expect.any(Array),
    expect.objectContaining({
      type: "cell-edit",
      field: "name",
      value: "One updated",
    }),
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
  const onRowsChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      onRowsChange={onRowsChange}
    />,
  );
  const dropdownCell = screen.getAllByRole("gridcell")[1];

  await user.click(dropdownCell);
  await user.keyboard("{Enter}");
  await screen.findByRole("option", { name: "B" });
  await user.keyboard("{ArrowDown}{Enter}");

  expect(onRowsChange).toHaveBeenCalledWith(
    expect.any(Array),
    expect.objectContaining({
      type: "dropdown-select",
      rowId: 1,
      field: "type",
      value: "B",
    }),
  );
  expect(dropdownCell).toHaveFocus();
});

test("filters and commits options with a FilterableSelect editor", async () => {
  const user = userEvent.setup();
  const onRowsChange = jest.fn();
  const filterableColumns: DataGridColumn<Row>[] = [
    {
      field: "type",
      filterable: true,
      headerName: "Type",
      options: [
        { label: "Service", value: "service" },
        { label: "Product", value: "product" },
      ],
      type: "dropdown",
    },
  ];

  render(
    <DataGrid
      aria-label="Items"
      columns={filterableColumns}
      onRowsChange={onRowsChange}
      rows={rows.slice(0, 1)}
    />,
  );

  const cell = screen.getByRole("gridcell");
  await user.dblClick(cell);
  const editor = screen.getByRole("combobox", { name: "Type, row 1" });
  await user.clear(editor);
  await user.type(editor, "Prod");
  await user.click(await screen.findByRole("option", { name: "Product" }));

  expect(onRowsChange).toHaveBeenCalledWith(
    expect.any(Array),
    expect.objectContaining({
      field: "type",
      rowId: 1,
      type: "dropdown-select",
      value: "product",
    }),
  );
  expect(cell).toHaveFocus();
});

test("preserves non-string dropdown values when committing a selection", async () => {
  const user = userEvent.setup();
  const onRowsChange = jest.fn();
  const numericRows = [{ id: 1, rate: 0 }];
  const numericColumns: DataGridColumn<(typeof numericRows)[number]>[] = [
    {
      field: "rate",
      headerName: "Rate",
      options: [
        { id: "zero-rate", label: "Zero", value: 0 },
        { label: "Twenty", value: 20 },
      ],
      type: "dropdown",
    },
  ];

  render(
    <DataGrid
      aria-label="Rates"
      columns={numericColumns}
      onRowsChange={onRowsChange}
      rows={numericRows}
    />,
  );

  await user.dblClick(screen.getByRole("gridcell"));
  await user.click(await screen.findByRole("option", { name: "Twenty" }));

  expect(onRowsChange).toHaveBeenCalledWith(
    [{ id: 1, rate: 20 }],
    expect.objectContaining({ value: 20 }),
  );
});

test("restores cell focus when a Carbon dropdown blurs to the document", async () => {
  const user = userEvent.setup();
  render(<DataGrid aria-label="Items" rows={rows} columns={columns} />);
  const dropdownCell = screen.getAllByRole("gridcell")[1];

  await user.click(dropdownCell);
  await user.keyboard("{Enter}");

  const dropdown = screen.getByRole("combobox", { name: "Type, row 1" });
  await act(async () => dropdown.blur());

  await waitFor(() => expect(dropdownCell).toHaveFocus());
});

test("commits a dropdown before moving to the next cell", async () => {
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

  await user.click(cells[1]);
  await user.keyboard("{Enter}");
  await user.click(await screen.findByRole("option", { name: "B" }));
  await user.keyboard("{Tab}");

  expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  expect(cells[2]).toHaveFocus();
});

test("closes an unchanged dropdown and moves when Tab leaves the open editor", async () => {
  const user = userEvent.setup();
  const onRowsChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      enableTabNavigation
      onRowsChange={onRowsChange}
    />,
  );
  const cells = screen.getAllByRole("gridcell");

  await user.click(cells[1]);
  await user.keyboard("{Enter}");
  expect(screen.getByRole("combobox", { name: "Type, row 1" })).toHaveFocus();

  await user.keyboard("{Tab}");

  expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  expect(cells[2]).toHaveFocus();
  expect(onRowsChange).not.toHaveBeenCalled();
});

test.each([false, true])(
  "cancels dropdown editing with one Escape press (filterable=%s)",
  async (filterable) => {
    const user = userEvent.setup();
    const onRowsChange = jest.fn();
    const dropdownColumns: DataGridColumn<Row>[] = [
      {
        field: "type",
        filterable,
        headerName: "Type",
        options: [
          { label: "A", value: "A" },
          { label: "B", value: "B" },
        ],
        type: "dropdown",
      },
    ];

    render(
      <DataGrid
        aria-label="Items"
        columns={dropdownColumns}
        onRowsChange={onRowsChange}
        rows={rows.slice(0, 1)}
      />,
    );

    const cell = screen.getByRole("gridcell");
    await user.click(cell);
    await user.keyboard("{Enter}");
    expect(await screen.findByRole("option", { name: "B" })).toBeVisible();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(cell).toHaveFocus();
    expect(onRowsChange).not.toHaveBeenCalled();
  },
);

test("keeps grid navigation inside an open action popover", async () => {
  const user = userEvent.setup();
  const actionColumns: DataGridColumn<Row>[] = [
    { field: "name", headerName: "Name" },
    {
      field: "actions",
      headerName: "",
      headerAriaLabel: "Actions",
      type: "action",
      renderCell: () => (
        <ActionPopover aria-label="Row actions" size="small">
          <ActionPopoverItem>Duplicate</ActionPopoverItem>
          <ActionPopoverItem>Delete</ActionPopoverItem>
        </ActionPopover>
      ),
    },
  ];
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={actionColumns}
      enableTabNavigation
    />,
  );
  const [nameCell, actionCell, nextRowNameCell, nextRowActionCell] =
    screen.getAllByRole("gridcell");

  await user.click(actionCell);
  await user.keyboard("{Enter}");
  const duplicate = await screen.findByRole("button", { name: "Duplicate" });
  duplicate.focus();
  await user.keyboard("{ArrowLeft}");

  expect(duplicate).toHaveFocus();
  expect(screen.getByRole("list")).toBeVisible();

  await user.keyboard("{Escape}");
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
  expect(
    screen.getAllByRole("button", { name: "Row actions" })[0],
  ).toHaveFocus();

  await user.keyboard("{ArrowDown}");
  expect(nextRowActionCell).toHaveFocus();
  expect(screen.queryByRole("list")).not.toBeInTheDocument();

  await user.keyboard("{ArrowUp}");
  expect(actionCell).toHaveFocus();

  await user.keyboard("{ArrowLeft}");
  expect(nameCell).toHaveFocus();

  await user.keyboard("{ArrowRight}{Enter}");
  expect(
    await screen.findByRole("button", { name: "Duplicate" }),
  ).toHaveFocus();
  await user.keyboard("{Tab}");

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
  expect(nextRowNameCell).toHaveFocus();
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
  const onRowsChange = jest.fn();
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
      onRowsChange={onRowsChange}
    />,
  );

  await user.click(screen.getByRole("gridcell"));
  await user.keyboard(" ");

  expect(onRowsChange).not.toHaveBeenCalled();
  expect(screen.getByRole("checkbox")).not.toBeChecked();
  expect(screen.getByRole("checkbox")).toBeDisabled();
});

test("read-only dropdown cells render as non-editable text", async () => {
  const user = userEvent.setup();
  const readOnlyColumns: DataGridColumn<Row>[] = [
    {
      field: "type",
      headerName: "Type",
      type: "dropdown",
      options: [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
      ],
      readOnly: true,
    },
  ];

  render(
    <DataGrid
      aria-label="Items"
      rows={rows.slice(0, 1)}
      columns={readOnlyColumns}
    />,
  );

  const cell = screen.getByRole("gridcell");
  expect(cell).toHaveTextContent("A");

  await user.click(cell);
  await user.keyboard("{Enter}");

  expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
});

test("renders and edits empty text and dropdown values", async () => {
  const user = userEvent.setup();
  const emptyRows = [{ id: 1, name: undefined, type: undefined }];
  const emptyColumns: DataGridColumn<(typeof emptyRows)[number]>[] = [
    { field: "name", headerName: "Name" },
    {
      field: "type",
      headerName: "Type",
      type: "dropdown",
      options: [
        { label: "Choose", value: "" },
        { label: "A", value: "A" },
      ],
    },
  ];
  render(
    <DataGrid
      aria-label="Empty items"
      rows={emptyRows}
      columns={emptyColumns}
    />,
  );
  const cells = screen.getAllByRole("gridcell");

  expect(cells[0]).toHaveTextContent("");
  expect(cells[1]).toHaveTextContent("");

  await user.dblClick(cells[0]);
  expect(screen.getByRole("textbox")).toHaveValue("");
  await user.keyboard("{Escape}");

  await user.dblClick(cells[1]);
  expect(screen.getByRole("combobox")).toHaveValue("Choose");
});

test("read-only action cells retain their contextual actions", async () => {
  const user = userEvent.setup();
  const onOpen = jest.fn();
  const readOnlyColumns: DataGridColumn<Row>[] = [
    {
      field: "actions",
      headerName: "Actions",
      type: "action",
      readOnly: true,
      renderCell: () => <button onClick={onOpen}>Open actions</button>,
    },
  ];

  render(
    <DataGrid
      aria-label="Items"
      rows={rows.slice(0, 1)}
      columns={readOnlyColumns}
    />,
  );

  const cell = screen.getByRole("gridcell");
  expect(cell).toHaveAttribute("aria-readonly", "true");

  await user.click(screen.getByRole("button", { name: "Open actions" }));

  expect(onOpen).toHaveBeenCalledTimes(1);
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
  const onRowsChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      onRowsChange={onRowsChange}
    />,
  );
  await user.click(screen.getAllByRole("gridcell")[1]);
  await user.keyboard("{ArrowRight}");

  await user.keyboard(" ");
  expect(onRowsChange).toHaveBeenCalledWith(
    expect.any(Array),
    expect.objectContaining({
      type: "checkbox-toggle",
      field: "selected",
      value: true,
    }),
  );
});

test("a single click toggles a checkbox cell", async () => {
  const user = userEvent.setup();
  const onRowsChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      onRowsChange={onRowsChange}
    />,
  );
  const checkboxCell = screen.getAllByRole("gridcell")[2];

  await user.click(checkboxCell);

  expect(checkboxCell).toHaveFocus();
  expect(onRowsChange).toHaveBeenCalledTimes(1);
  expect(onRowsChange).toHaveBeenCalledWith(
    expect.any(Array),
    expect.objectContaining({
      type: "checkbox-toggle",
      field: "selected",
      value: true,
    }),
  );
});

test("keeps the nested checkbox visual non-interactive", () => {
  const onRowsChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      onRowsChange={onRowsChange}
    />,
  );

  fireEvent.change(screen.getAllByRole("checkbox")[0], {
    target: { checked: true },
  });

  expect(onRowsChange).not.toHaveBeenCalled();
});

test("a double click only toggles a checkbox cell once", async () => {
  const user = userEvent.setup();
  const onRowsChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      onRowsChange={onRowsChange}
    />,
  );

  await user.dblClick(screen.getAllByRole("gridcell")[2]);

  expect(onRowsChange).toHaveBeenCalledTimes(1);
});

test("the imperative handle focuses and edits a cell", () => {
  const ref = createRef<DataGridHandle<Row>>();
  render(
    <DataGrid ref={ref} aria-label="Items" rows={rows} columns={columns} />,
  );

  act(() => ref.current?.focusCell(2, "name"));
  expect(screen.getAllByRole("gridcell")[3]).toHaveFocus();

  act(() => ref.current?.editCell(2, "name"));
  expect(screen.getByRole("textbox", { name: "Name, row 2" })).toHaveFocus();
});

test("the imperative handle ignores unknown rows and fields", () => {
  const ref = createRef<DataGridHandle<Row>>();
  render(
    <DataGrid ref={ref} aria-label="Items" rows={rows} columns={columns} />,
  );

  expect(() => {
    act(() => {
      ref.current?.focusCell("missing", "name");
      ref.current?.editCell(1, "missing");
    });
  }).not.toThrow();
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
});

test("escape cancels editing", async () => {
  const user = userEvent.setup();
  const onRowsChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      onRowsChange={onRowsChange}
    />,
  );
  const cell = screen.getAllByRole("gridcell")[0];
  await user.click(cell);
  fireEvent.keyDown(cell, { key: "Enter" });
  await user.type(screen.getByRole("textbox"), " changed");
  fireEvent.keyDown(screen.getByRole("textbox"), { key: "Escape" });

  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  expect(cell).toHaveFocus();
  expect(onRowsChange).not.toHaveBeenCalled();
});
