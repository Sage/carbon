import React, { Profiler, useMemo, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { ActionPopover, ActionPopoverProps } from "../action-popover";
import ActionPopoverItem from "../action-popover/action-popover-item/action-popover-item.component";
import Box from "../box";
import Button from "../button/__next__";
import Icon from "../icon";
import Pager from "../pager";
import { DataGrid, DataGridCellParams, DataGridColumn } from ".";

const renderSmallActionPopoverButton: NonNullable<
  ActionPopoverProps["renderButton"]
> = ({ "data-element": dataElement, ariaAttributes }) => (
  <Button
    data-element={dataElement}
    size="small"
    variant="default"
    variantType="subtle"
    {...ariaAttributes}
  >
    <Icon type="ellipsis_vertical" />
  </Button>
);

interface VisualRow {
  id: number;
  description: string;
  category: string;
  selected: boolean;
  actions: null;
}

const initialRows: VisualRow[] = [
  {
    id: 1,
    description: "Consulting services",
    category: "Services",
    selected: false,
    actions: null,
  },
  {
    id: 2,
    description: "",
    category: "",
    selected: false,
    actions: null,
  },
  {
    id: 3,
    description: "Read-only line",
    category: "Expenses",
    selected: false,
    actions: null,
  },
  {
    id: 4,
    description: "Selected line",
    category: "Services",
    selected: true,
    actions: null,
  },
];

const VisualGrid = ({
  maxWidth = "600px",
  pinnedColumns = false,
}: {
  maxWidth?: string;
  pinnedColumns?: boolean;
}) => {
  const [rows, setRows] = useState(initialRows);
  const columns = useMemo<DataGridColumn<VisualRow>[]>(
    () => [
      {
        field: "description",
        headerName: "Description",
        width: 220,
        pinned: pinnedColumns ? "left" : undefined,
        error: ({ value }) => !value && "Enter a description",
        readOnly: ({ row }) => row.id === 3,
      },
      {
        field: "category",
        headerName: "Category",
        type: "dropdown",
        width: 180,
        weight: "medium",
        error: ({ row }) => row.id === 2 && "Select a category",
        readOnly: ({ row }) => row.id === 3,
        options: [
          { label: "Services", value: "Services" },
          { label: "Software", value: "Software" },
          { label: "Expenses", value: "Expenses" },
        ],
      },
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
        pinned: pinnedColumns ? "right" : undefined,
        readOnly: ({ row }) => row.id === 3,
        renderCell: ({ row }) => (
          <ActionPopover
            aria-label={`Actions for row ${row.id}`}
            renderButton={renderSmallActionPopoverButton}
            size="medium"
          >
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
    [pinnedColumns],
  );

  return (
    <Box width={maxWidth} maxWidth="100%">
      <DataGrid
        aria-label="Visual regression invoice lines"
        rows={rows}
        columns={columns}
        maxWidth="100%"
        stickyHeader
        onRowsChange={(nextRows) => setRows(nextRows)}
      />
    </Box>
  );
};

interface MultiplePinnedRow {
  id: number;
  code: string;
  description: string;
  category: string;
  project: string;
  quantity: string;
  total: string;
  actions: null;
}

const multiplePinnedRows: MultiplePinnedRow[] = [
  {
    id: 1,
    code: "LAB-001",
    description: "Labour",
    category: "Services",
    project: "Bathroom refurbishment",
    quantity: "1",
    total: "3,000.00",
    actions: null,
  },
  {
    id: 2,
    code: "BATH-001",
    description: "Freestanding bath",
    category: "Materials",
    project: "Bathroom refurbishment",
    quantity: "2",
    total: "1,000.00",
    actions: null,
  },
  {
    id: 3,
    code: "TILE-001",
    description: "Ceramic tiles",
    category: "Materials",
    project: "Bathroom refurbishment",
    quantity: "52",
    total: "1,040.00",
    actions: null,
  },
];

const multiplePinnedColumns: DataGridColumn<MultiplePinnedRow>[] = [
  {
    field: "code",
    headerName: "Item code",
    width: 120,
    pinned: "left",
  },
  {
    field: "description",
    headerName: "Description",
    width: 180,
    pinned: "left",
  },
  { field: "category", headerName: "Category", width: 160 },
  { field: "project", headerName: "Project", width: 220 },
  { field: "quantity", headerName: "Quantity", width: 110, align: "right" },
  {
    field: "total",
    headerName: "Net (£)",
    width: 130,
    align: "right",
    pinned: "right",
    weight: "medium",
  },
  {
    field: "actions",
    headerName: "",
    headerAriaLabel: "Actions",
    type: "action",
    width: 52,
    pinned: "right",
    renderCell: ({ row }) => (
      <ActionPopover
        aria-label={`Actions for ${row.code}`}
        renderButton={renderSmallActionPopoverButton}
        size="medium"
      >
        <ActionPopoverItem>Duplicate</ActionPopoverItem>
        <ActionPopoverItem>Delete</ActionPopoverItem>
      </ActionPopover>
    ),
  },
];

const meta = {
  title: "Data Grid/Test",
  component: DataGrid,
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    docs: { disable: true },
    themeProvider: { chromatic: { theme: "sage" } },
  },
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof DataGrid>;

const PaginatedGrid = () => {
  const [rows, setRows] = useState(initialRows);
  const [page, setPage] = useState(1);
  const pageSize = 2;
  const pageRows = rows.slice((page - 1) * pageSize, page * pageSize);
  return (
    <>
      <DataGrid
        aria-label="Paginated lines"
        rows={pageRows}
        columns={[
          { field: "description", headerName: "Description", width: 300 },
        ]}
        onRowsChange={(nextRows) =>
          setRows((current) =>
            current.map(
              (row) => nextRows.find(({ id }) => id === row.id) ?? row,
            ),
          )
        }
      />
      <Pager
        currentPage={page}
        pageSize={pageSize}
        totalRecords={rows.length}
        onPagination={setPage}
      />
    </>
  );
};

export const PaginationComposition: Story = {
  render: () => <PaginatedGrid />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByRole("gridcell")[0]);
    const editor = canvas.getByRole("textbox", { name: "Description, row 1" });
    await userEvent.clear(editor);
    await userEvent.type(editor, "Updated service{Enter}");
    await userEvent.click(
      canvas.getByRole("button", { name: /Go to next page/ }),
    );
    await expect(canvas.getByText("Read-only line")).toBeVisible();
    await expect(canvas.queryByText("Updated service")).not.toBeInTheDocument();
    await userEvent.click(
      canvas.getByRole("button", { name: /Go to previous page/ }),
    );
    await expect(canvas.getByText("Updated service")).toBeVisible();
  },
};

const createRenderMeasurements = () => ({
  cellRenders: 0,
  rows: new Set<number>(),
  commits: 0,
  totalDuration: 0,
  maxDuration: 0,
});

const RenderBenchmark = ({ virtualized }: { virtualized: boolean }) => {
  const [rows, setRows] = useState(() =>
    Array.from({ length: virtualized ? 1000 : 100 }, (_, index) => ({
      id: index + 1,
      description: `Line ${index + 1}`,
      quantity: "1",
      amount: "100.00",
    })),
  );
  const measurements = useRef(createRenderMeasurements());
  const [report, setReport] = useState("");
  const columns = useMemo<DataGridColumn<(typeof rows)[number]>[]>(
    () => [
      { field: "description", headerName: "Description", width: 240 },
      ...(["quantity", "amount"] as const).map((field) => ({
        field,
        headerName: field,
        width: 140,
        renderCell: ({
          row,
          value,
        }: DataGridCellParams<(typeof rows)[number]>) => {
          measurements.current.cellRenders += 1;
          measurements.current.rows.add(row.id);
          return String(value);
        },
      })),
    ],
    [],
  );
  return (
    <>
      <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => {
          measurements.current = createRenderMeasurements();
        }}
      >
        Reset measurements
      </button>
      <button
        type="button"
        onMouseDown={(event) => event.preventDefault()}
        onClick={() => {
          const { current } = measurements;
          setReport(
            JSON.stringify({
              cellRenders: current.cellRenders,
              rowsRendered: current.rows.size,
              unrelatedRowsRendered: [...current.rows].filter((id) => id !== 1)
                .length,
              commits: current.commits,
              totalDuration: current.totalDuration,
              maxDuration: current.maxDuration,
            }),
          );
        }}
      >
        Read measurements
      </button>
      <output aria-label="Render measurements">{report}</output>
      <Profiler
        id="data-grid-typing"
        onRender={(_id, _phase, actualDuration) => {
          measurements.current.commits += 1;
          measurements.current.totalDuration += actualDuration;
          measurements.current.maxDuration = Math.max(
            measurements.current.maxDuration,
            actualDuration,
          );
        }}
      >
        <DataGrid
          aria-label="Render benchmark"
          rows={rows}
          columns={columns}
          onRowsChange={setRows}
          disableVirtualization={!virtualized}
          maxHeight={virtualized ? 240 : undefined}
        />
      </Profiler>
    </>
  );
};

export const TypingRenderBenchmark: Story = {
  render: () => <RenderBenchmark virtualized={false} />,
  parameters: { chromatic: { disableSnapshot: true } },
};

export const VirtualizedTypingRenderBenchmark: Story = {
  render: () => <RenderBenchmark virtualized />,
  parameters: { chromatic: { disableSnapshot: true } },
};

export const CellStatesAndNavigationFocus: Story = {
  render: () => <VisualGrid />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstCell = canvas.getAllByRole("gridcell")[0];
    firstCell.focus();
    await expect(firstCell).toHaveFocus();
  },
};

export const HoverState: Story = {
  render: () => <VisualGrid />,
  parameters: {
    pseudo: {
      hover: '[data-element="data-grid-cell-1-category"]',
    },
  },
};

export const ActiveEditingFocus: Story = {
  render: () => <VisualGrid />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.dblClick(canvas.getAllByRole("gridcell")[0]);
    await expect(
      canvas.getByRole("textbox", { name: "Description, row 1" }),
    ).toHaveFocus();
  },
};

export const OpenDropdown: Story = {
  render: () => <VisualGrid />,
  parameters: {
    chromatic: { delay: 300, disableSnapshot: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    await userEvent.click(canvas.getAllByRole("gridcell")[1]);
    await expect(await body.findByRole("listbox")).toBeVisible();
  },
};

export const PinnedColumnsScrolledWithOpenActions: Story = {
  render: () => <VisualGrid maxWidth="400px" pinnedColumns />,
  parameters: {
    chromatic: { delay: 300, disableSnapshot: false },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const grid = canvas.getByRole("grid");
    grid.scrollLeft = 120;
    await userEvent.click(
      canvas.getByRole("button", { name: "Actions for row 2" }),
    );
    await expect(grid).toHaveProperty("scrollLeft", 120);
  },
};

export const MultiplePinnedColumns: Story = {
  render: () => (
    <Box maxWidth="100%" width="760px">
      <DataGrid
        aria-label="Invoice lines with multiple pinned columns"
        rows={multiplePinnedRows}
        columns={multiplePinnedColumns}
        maxWidth="100%"
      />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    const grid = within(canvasElement).getByRole("grid");
    grid.scrollLeft = 180;
    await expect(grid).toHaveProperty("scrollLeft", 180);
  },
};
