import React from "react";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataGrid, DataGridColumn, DataGridPlugin, DataGridPluginApi } from ".";
import { createColumnReorderPlugin, createColumnResizePlugin } from "./plugins";

interface Row {
  id: number;
  name: string;
  amount: string;
  note: string;
}
const rows = [{ id: 1, name: "One", amount: "12", note: "Hello" }];
const columns: DataGridColumn<Row>[] = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
    minWidth: 80,
    maxWidth: 200,
  },
  { field: "amount", headerName: "Amount", width: 100 },
  { field: "note", headerName: "Note", width: 120 },
];
const plugins = [
  createColumnReorderPlugin<Row>(),
  createColumnResizePlugin<Row>(),
];

function captureApi() {
  let api: DataGridPluginApi<Row>;
  const plugin: DataGridPlugin<Row> = {
    id: "test-observer",
    apiVersion: 1,
    Controller: ({ api: instance }) => {
      React.useEffect(() => {
        api = instance;
      }, [instance]);
      return null;
    },
  };
  return { plugin, getApi: () => api };
}

const headings = () =>
  screen
    .getAllByRole("columnheader")
    .map(
      (header) => within(header).getByText(/^(Name|Amount|Note)$/).textContent,
    );

test("optional plugins resize and reorder headers and body cells together", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      plugins={plugins}
      onColumnLayoutChange={onChange}
    />,
  );
  act(() =>
    screen.getByRole("separator", { name: "Resize Name column" }).focus(),
  );
  await user.keyboard("{ArrowRight}");
  expect(onChange).toHaveBeenLastCalledWith({
    order: ["name", "amount", "note"],
    widths: { name: 160 },
  });
  screen.getAllByRole("row").forEach((row) => {
    expect(row).toHaveStyle("grid-template-columns: 160px 100px 120px");
  });
  await user.click(screen.getByRole("button", { name: /Move Name column/ }));
  await user.keyboard("{ArrowRight}");
  expect(headings()).toEqual(["Amount", "Name", "Note"]);
  expect(
    screen.getAllByRole("gridcell").map((cell) => cell.textContent),
  ).toEqual(["12", "One", "Hello"]);
  fireEvent.doubleClick(
    screen.getByRole("separator", { name: "Resize Name column" }),
  );
  expect(
    screen.getByRole("separator", { name: "Resize Name column" }),
  ).toHaveAttribute("aria-valuenow", "150");
  expect(columns[0].width).toBe(150);
});

test("controlled commands request changes and subscriptions only observe applied snapshots", () => {
  const observer = captureApi();
  const onChange = jest.fn();
  const layout = { order: ["name", "amount", "note"], widths: {} };
  const { rerender, unmount } = render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      plugins={[observer.plugin]}
      columnLayout={layout}
      onColumnLayoutChange={onChange}
    />,
  );
  const api = observer.getApi();
  const initial = api.getSnapshot();
  const listener = jest.fn();
  const unsubscribe = api.subscribe(listener);
  act(() => api.columns.setWidth("name", 999));
  expect(onChange).toHaveBeenCalledWith({ ...layout, widths: { name: 200 } });
  expect(api.getSnapshot()).toBe(initial);
  expect(listener).not.toHaveBeenCalled();
  rerender(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      plugins={[observer.plugin]}
      columnLayout={{ ...layout, widths: { name: 200 } }}
      onColumnLayoutChange={onChange}
    />,
  );
  expect(observer.getApi()).toBe(api);
  expect(api.getSnapshot().columns[0].widthPx).toBe(200);
  expect(listener).toHaveBeenCalledTimes(1);
  unsubscribe();
  unmount();
});

test("layout commands validate IDs, bounds and pinned regions and compose in one event", () => {
  const observer = captureApi();
  const onChange = jest.fn();
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={[{ ...columns[0], sticky: "left" }, ...columns.slice(1)]}
      plugins={[observer.plugin]}
      onColumnLayoutChange={onChange}
    />,
  );
  const api = observer.getApi();
  act(() => {
    api.columns.move("name", { columnId: "amount", placement: "after" });
    api.columns.move("missing", { columnId: "amount", placement: "after" });
    api.columns.setWidth("missing", 120);
    api.columns.setWidth("name", NaN);
  });
  expect(onChange).not.toHaveBeenCalled();
  act(() => {
    api.columns.setWidth("name", 20);
    api.columns.setWidth("amount", 180);
    api.columns.move("note", { columnId: "amount", placement: "before" });
  });
  expect(api.getSnapshot().columnLayout).toEqual({
    order: ["name", "note", "amount"],
    widths: { name: 80, amount: 180 },
  });
});

test("active cells and edited values follow their column when externally reordered", async () => {
  const user = userEvent.setup();
  const onCellChange = jest.fn();
  const observer = captureApi();
  const gridProps = {
    "aria-label": "Items",
    rows,
    columns,
    plugins: [observer.plugin],
    onCellChange,
  };
  const { rerender } = render(<DataGrid {...gridProps} />);
  await user.click(screen.getAllByRole("gridcell")[0]);
  act(() =>
    observer
      .getApi()
      .columns.move("name", { columnId: "amount", placement: "after" }),
  );
  expect(screen.getAllByRole("gridcell")[1]).toHaveAttribute("tabindex", "0");
  await user.dblClick(screen.getAllByRole("gridcell")[1]);
  const editor = screen.getByRole("textbox");
  await user.clear(editor);
  await user.type(editor, "Updated");
  rerender(
    <DataGrid
      {...gridProps}
      columnLayout={{ order: ["note", "amount", "name"], widths: {} }}
    />,
  );
  expect(screen.getByRole("textbox")).toHaveValue("Updated");
  await user.keyboard("{Enter}");
  expect(onCellChange).toHaveBeenCalledWith(
    expect.objectContaining({ field: "name", value: "Updated", rowId: 1 }),
  );
});

test("reconciles removed and new definitions without retaining stale widths", () => {
  const observer = captureApi();
  const { rerender } = render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      plugins={[observer.plugin]}
      defaultColumnLayout={{
        order: ["note", "missing", "name", "note"],
        widths: { missing: 180, note: 200 },
      }}
    />,
  );
  expect(headings()).toEqual(["Note", "Name", "Amount"]);
  rerender(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns.slice(0, 2)}
      plugins={[observer.plugin]}
    />,
  );
  expect(observer.getApi().getSnapshot().columnLayout).toEqual({
    order: ["name", "amount"],
    widths: {},
  });
});

test("two grids keep independent column layouts when sharing plugin descriptors", async () => {
  const user = userEvent.setup();
  render(
    <>
      <DataGrid
        aria-label="First"
        rows={rows}
        columns={columns}
        plugins={plugins}
      />
      <DataGrid
        aria-label="Second"
        rows={rows}
        columns={columns}
        plugins={plugins}
      />
    </>,
  );
  const first = within(screen.getByRole("grid", { name: "First" }));
  const second = within(screen.getByRole("grid", { name: "Second" }));
  await user.click(first.getByRole("button", { name: /Move Name column/ }));
  await user.keyboard("{ArrowRight}");
  expect(first.getAllByRole("gridcell")[0]).toHaveTextContent("12");
  expect(second.getAllByRole("gridcell")[0]).toHaveTextContent("One");
});

test("only renders drag handles when another eligible column exists in the region", () => {
  const pinnedColumns: DataGridColumn<Row>[] = [
    { ...columns[0], sticky: "left" },
    ...columns.slice(1),
  ];
  const { rerender } = render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={pinnedColumns}
      plugins={plugins}
    />,
  );
  expect(
    screen.queryByRole("button", { name: /Move Name column/ }),
  ).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /Move Amount column/ }),
  ).toBeVisible();
  expect(
    screen.getByRole("button", { name: /Move Note column/ }),
  ).toBeVisible();

  rerender(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={pinnedColumns.slice(0, 2)}
      plugins={plugins}
    />,
  );
  expect(
    screen.queryByRole("button", { name: /Move .* column/ }),
  ).not.toBeInTheDocument();

  rerender(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={pinnedColumns}
      plugins={plugins}
    />,
  );
  expect(
    screen.getByRole("button", { name: /Move Amount column/ }),
  ).toBeVisible();
});

test("canMove can keep all pinned columns fixed, including regions with multiple columns", () => {
  render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={[
        { ...columns[0], sticky: "left" },
        { ...columns[1], sticky: "left" },
        columns[2],
      ]}
      plugins={[
        createColumnReorderPlugin<Row>({
          canMove: ({ definition }) => !definition.sticky,
        }),
      ]}
    />,
  );
  expect(
    screen.queryByRole("button", { name: /Move .* column/ }),
  ).not.toBeInTheDocument();
});

test("exposes mounted cells by column identity and removes detached cell references", () => {
  const observer = captureApi();
  const { rerender, unmount } = render(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns}
      plugins={[observer.plugin]}
    />,
  );
  const api = observer.getApi();
  const nameCell = screen.getByRole("gridcell", { name: "One" });
  expect(api.elements.getColumnCells("name")).toEqual([nameCell]);
  expect(api.elements.getColumnCells("missing")).toEqual([]);
  act(() =>
    api.columns.move("name", { columnId: "amount", placement: "after" }),
  );
  expect(api.elements.getColumnCells("name")).toEqual([nameCell]);
  rerender(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={columns.slice(1)}
      plugins={[observer.plugin]}
    />,
  );
  expect(api.elements.getColumnCells("name")).toEqual([]);
  expect(api.elements.getColumnCells("amount")).toHaveLength(1);
  unmount();
  expect(api.elements.getColumnCells("amount")).toEqual([]);
});

test("plugins preserve revised viewport, naming, alignment and sticky-header props", () => {
  const alignedColumns: DataGridColumn<Row>[] = [
    { ...columns[0], align: "right" },
    { ...columns[1], headerName: "", headerAriaLabel: "Amount" },
    columns[2],
  ];
  const { rerender } = render(
    <>
      <h2 id="grid-title">Invoice lines</h2>
      <p id="grid-help">Edit invoice amounts</p>
      <DataGrid
        aria-labelledby="grid-title"
        aria-describedby="grid-help"
        rows={rows}
        columns={alignedColumns}
        plugins={plugins}
        maxHeight={320}
        maxWidth={640}
        stickyHeader
      />
    </>,
  );
  const grid = screen.getByRole("grid", { name: "Invoice lines" });
  expect(grid).toHaveAccessibleDescription("Edit invoice amounts");
  expect(grid).toHaveStyle({ maxHeight: "320px", maxWidth: "640px" });
  expect(screen.getAllByRole("columnheader")[0]).toHaveStyle(
    "justify-content: flex-end",
  );
  expect(
    screen.getByRole("separator", { name: "Resize Amount column" }),
  ).toBeVisible();
  expect(screen.getAllByRole("rowgroup")[0]).toHaveStyle("position: sticky");
  rerender(
    <DataGrid
      aria-label="Items"
      rows={rows}
      columns={alignedColumns}
      plugins={plugins}
      stickyHeader={false}
    />,
  );
  expect(screen.getAllByRole("rowgroup")[0]).toHaveStyle("position: relative");
});
