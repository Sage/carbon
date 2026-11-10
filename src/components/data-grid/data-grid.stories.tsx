import React, { useMemo, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import { ActionPopover } from "../action-popover";
import ActionPopoverItem from "../action-popover/action-popover-item/action-popover-item.component";
import Button from "../button/__next__";
import Box from "../box";
import Icon from "../icon";
import Link from "../link";
import Message from "../message";
import {
  DataGrid,
  DataGridColumn,
  DataGridHandle,
  DataGridProps,
  DataGridColumnLayout,
} from ".";

import { createColumnReorderPlugin, createColumnResizePlugin } from "./plugins";

interface InvoiceLine {
  id: number;
  description: string;
  category: string;
  selected: boolean;
  actions: null;
}

type PlaygroundStickyColumns = "none" | "left" | "right" | "both";

type PlaygroundArgs = Partial<DataGridProps<InvoiceLine>> & {
  /** Story-only control used to demonstrate column-level sticky configuration. */
  playgroundStickyColumns: PlaygroundStickyColumns;
};

interface RowActions<T> {
  onDelete: (row: T) => void;
  onDuplicate: (row: T) => void;
}

const getNextRowId = <T extends { id: number }>(rows: T[]) =>
  Math.max(0, ...rows.map(({ id }) => id)) + 1;

const duplicateRow = <T extends { id: number }>(rows: T[], rowId: number) => {
  const rowIndex = rows.findIndex(({ id }) => id === rowId);
  if (rowIndex < 0) return rows;

  const duplicatedRow = {
    ...rows[rowIndex],
    id: getNextRowId(rows),
  };

  return [
    ...rows.slice(0, rowIndex + 1),
    duplicatedRow,
    ...rows.slice(rowIndex + 1),
  ];
};

const deleteRow = <T extends { id: number }>(rows: T[], rowId: number) =>
  rows.filter(({ id }) => id !== rowId);

const initialRows: InvoiceLine[] = [
  {
    id: 1,
    description: "Consulting",
    category: "Services",
    selected: false,
    actions: null,
  },
  {
    id: 2,
    description: "Software licence",
    category: "Software",
    selected: false,
    actions: null,
  },
  {
    id: 3,
    description: "Travel",
    category: "Expenses",
    selected: false,
    actions: null,
  },
  {
    id: 4,
    description: "",
    category: "Services",
    selected: false,
    actions: null,
  },
  {
    id: 5,
    description: "Readonly item",
    category: "Software",
    selected: false,
    actions: null,
  },
];

const createPlaygroundRows = (): InvoiceLine[] =>
  Array.from({ length: 30 }, (_, index) => {
    const source = initialRows[index % initialRows.length];

    return {
      ...source,
      id: index + 1,
      description:
        index === 3
          ? ""
          : `${source.description || "Invoice line"} ${index + 1}`,
    };
  });

const createInvoiceColumns = ({
  onDelete,
  onDuplicate,
}: RowActions<InvoiceLine>): DataGridColumn<InvoiceLine>[] => [
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    minWidth: 220,
    error: ({ value }) => !value && "Enter a description",
    readOnly: ({ row }) => row.id === 5,
  },
  {
    field: "category",
    headerName: "Category",
    type: "dropdown",
    flex: 1,
    minWidth: 220,
    weight: "medium",
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
  },
  {
    field: "actions",
    headerName: "",
    headerAriaLabel: "Actions",
    type: "action",
    width: 52,
    renderCell: ({ row }) => (
      <ActionPopover
        aria-label={`Actions for ${row.description || "empty line"}`}
        buttonLabel={<Icon type="ellipsis_vertical" />}
      >
        <ActionPopoverItem onClick={() => onDuplicate(row)}>
          Duplicate
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => onDelete(row)}>
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    ),
  },
];

const getPlaygroundColumns = (
  columns: DataGridColumn<InvoiceLine>[],
  stickyColumns: PlaygroundStickyColumns,
): DataGridColumn<InvoiceLine>[] =>
  columns.map((column, index) => ({
    ...column,
    sticky:
      index === 0 && (stickyColumns === "left" || stickyColumns === "both")
        ? "left"
        : index === columns.length - 1 &&
            (stickyColumns === "right" || stickyColumns === "both")
          ? "right"
          : undefined,
  })) as DataGridColumn<InvoiceLine>[];

const useInvoiceColumns = (
  setRows: React.Dispatch<React.SetStateAction<InvoiceLine[]>>,
  stickyColumns: PlaygroundStickyColumns = "none",
) =>
  useMemo(
    () =>
      getPlaygroundColumns(
        createInvoiceColumns({
          onDelete: ({ id }) =>
            setRows((currentRows) => deleteRow(currentRows, id)),
          onDuplicate: ({ id }) =>
            setRows((currentRows) => duplicateRow(currentRows, id)),
        }),
        stickyColumns,
      ),
    [setRows, stickyColumns],
  );

const meta = {
  title: "Data Grid",
  component: DataGrid,
  args: {
    enableTabNavigation: true,
    stickyHeader: false,
    maxHeight: "320px",
    maxWidth: "100%",
    disableVirtualization: false,
    rowOverscan: 5,
  },
  argTypes: {
    maxHeight: { control: "text" },
    maxWidth: { control: "text" },
    enableTabNavigation: { control: "boolean" },
    stickyHeader: { control: "boolean" },
    disableVirtualization: { control: "boolean" },
    rowOverscan: {
      control: { type: "number", min: 0, step: 1 },
    },
  },
  parameters: {
    info: { disable: true },
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof DataGrid>;

export const Playground: StoryObj<PlaygroundArgs> = {
  args: {
    playgroundStickyColumns: "none",
  },
  argTypes: {
    playgroundStickyColumns: {
      name: "sticky columns",
      options: ["none", "left", "right", "both"],
      control: { type: "radio" },
      table: { category: "Playground" },
    },
  },
  render: (args) => {
    const [rows, setRows] = useState(createPlaygroundRows);
    const { playgroundStickyColumns, ...dataGridProps } = args;
    const storyColumns = useInvoiceColumns(setRows, playgroundStickyColumns);

    return (
      <DataGrid
        {...dataGridProps}
        aria-label="Invoice lines playground"
        rows={rows}
        columns={storyColumns}
        onCellChange={({ rowId, field, value }) => {
          setRows((current) =>
            current.map((row) =>
              row.id === rowId ? { ...row, [field]: value } : row,
            ),
          );
        }}
      />
    );
  },
};

export const EditableInvoiceLines: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => {
    const [rows, setRows] = useState(initialRows);
    const storyColumns = useInvoiceColumns(setRows);

    return (
      <Box maxWidth="100%" minWidth={0} width="600px">
        <DataGrid
          aria-label="Invoice lines"
          rows={rows}
          columns={storyColumns}
          maxWidth="100%"
          enableTabNavigation
          onCellChange={({ rowId, field, value }) => {
            setRows((current) =>
              current.map((row) =>
                row.id === rowId ? { ...row, [field]: value } : row,
              ),
            );
          }}
        />
        <Button
          buttonType="secondary"
          iconType="add"
          iconPosition="before"
          mt={2}
          onClick={() => {
            setRows((current) => {
              return [
                ...current,
                {
                  id: getNextRowId(current),
                  description: "",
                  category: "Services",
                  selected: false,
                  actions: null,
                },
              ];
            });
          }}
        >
          Add line
        </Button>
      </Box>
    );
  },
};

EditableInvoiceLines.storyName = "Editable invoice lines";

export const ValidationAndErrorSummary: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => {
    const gridRef = useRef<DataGridHandle>(null);
    const [rows, setRows] = useState(() =>
      initialRows.map((row) => ({
        ...row,
        description: row.id === 3 ? "" : row.description,
      })),
    );
    const storyColumns = useInvoiceColumns(setRows);
    const invalidRows = rows.filter((row) => !row.description);

    return (
      <Box maxWidth="760px">
        {invalidRows.length > 0 && (
          <Box mb={3} minWidth="min(400px, 100%)" width="fit-content">
            <Message
              id="invoice-errors"
              title="There is a problem"
              variant="error"
              width="100%"
            >
              <Box
                alignItems="flex-start"
                display="flex"
                flexDirection="column"
                gap={1}
              >
                {invalidRows.map((row) => (
                  <Link
                    key={row.id}
                    onClick={() =>
                      gridRef.current?.editCell(row.id, "description")
                    }
                  >
                    Enter a description on row {row.id}
                  </Link>
                ))}
              </Box>
            </Message>
          </Box>
        )}
        <DataGrid
          ref={gridRef}
          aria-label="Invoice lines with validation"
          aria-describedby={
            invalidRows.length > 0 ? "invoice-errors" : undefined
          }
          rows={rows}
          columns={storyColumns}
          maxWidth="100%"
          onCellChange={({ rowId, field, value }) => {
            setRows((current) =>
              current.map((row) =>
                row.id === rowId ? { ...row, [field]: value } : row,
              ),
            );
          }}
        />
      </Box>
    );
  },
};

ValidationAndErrorSummary.storyName = "Validation and error summary";

interface LargeInvoiceLine {
  id: number;
  line: string;
  description: string;
  sku: string;
  category: string;
  department: string;
  project: string;
  quantity: string;
  unitPrice: string;
  discount: string;
  taxRate: string;
  selected: boolean;
  total: string;
  actions: null;
}

interface LargeRowActions extends RowActions<LargeInvoiceLine> {
  onInsertAbove: (row: LargeInvoiceLine) => void;
}

const categories = ["Services", "Software", "Expenses"];
const departments = ["Finance", "Marketing", "Operations", "Sales"];
const projects = [
  "Website refresh",
  "Year end",
  "Office move",
  "Customer portal",
];
const descriptions = [
  "Consulting services",
  "Annual software licence",
  "Train travel",
  "Design workshop",
  "Cloud hosting",
  "Equipment rental",
];

const createLargeRows = (count: number): LargeInvoiceLine[] =>
  Array.from({ length: count }, (_, index) => {
    const quantity = (index % 8) + 1;
    const unitPrice = 25 + (index % 12) * 17.5;
    const discount = index % 6 === 0 ? 10 : 0;
    const total = quantity * unitPrice * (1 - discount / 100);

    return {
      id: index + 1,
      line: String(index + 1),
      description: descriptions[index % descriptions.length],
      sku: `SKU-${String(index + 1).padStart(4, "0")}`,
      category: categories[index % categories.length],
      department: departments[index % departments.length],
      project: projects[index % projects.length],
      quantity: index === 13 ? "" : String(quantity),
      unitPrice: unitPrice.toFixed(2),
      discount: String(discount),
      taxRate: index % 5 === 0 ? "0" : "20",
      selected: false,
      total: total.toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP",
      }),
      actions: null,
    };
  });

const renumberLargeRows = (rows: LargeInvoiceLine[]) =>
  rows.map((row, index) => ({ ...row, line: String(index + 1) }));

const insertLargeRowAbove = (
  rows: LargeInvoiceLine[],
  rowId: number,
): LargeInvoiceLine[] => {
  const rowIndex = rows.findIndex(({ id }) => id === rowId);
  if (rowIndex < 0) return rows;

  const sourceRow = rows[rowIndex];
  const insertedRow: LargeInvoiceLine = {
    ...sourceRow,
    id: getNextRowId(rows),
    line: "",
    description: "",
    quantity: "",
    selected: false,
    total: "£0.00",
  };

  return renumberLargeRows([
    ...rows.slice(0, rowIndex),
    insertedRow,
    ...rows.slice(rowIndex),
  ]);
};

const createLargeColumns = ({
  onDelete,
  onDuplicate,
  onInsertAbove,
}: LargeRowActions): DataGridColumn<LargeInvoiceLine>[] => [
  {
    field: "line",
    headerName: "Line",
    width: 72,
    sticky: "left",
    weight: "medium",
    readOnly: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 240,
    error: ({ value }) => !value && "Enter a description",
    readOnly: ({ row }) => row.id % 20 === 0,
  },
  { field: "sku", headerName: "SKU", width: 130 },
  {
    field: "category",
    headerName: "Category",
    type: "dropdown",
    width: 160,
    options: categories.map((value) => ({ label: value, value })),
  },
  { field: "department", headerName: "Department", width: 160 },
  { field: "project", headerName: "Project", width: 190 },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 110,
    align: "right",
    error: ({ value }) => !value && "Enter a quantity",
  },
  {
    field: "unitPrice",
    headerName: "Unit price",
    width: 130,
    align: "right",
  },
  {
    field: "discount",
    headerName: "Discount %",
    width: 120,
    align: "right",
  },
  {
    field: "taxRate",
    headerName: "Tax rate",
    type: "dropdown",
    width: 130,
    align: "right",
    options: ["0", "5", "20"].map((value) => ({
      label: `${value}%`,
      value,
    })),
  },
  {
    field: "selected",
    headerName: "Selected",
    type: "checkbox",
    width: 100,
  },
  {
    field: "total",
    headerName: "Line total",
    width: 130,
    align: "right",
    weight: "medium",
    readOnly: true,
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
        aria-label={`Actions for line ${row.line}`}
        buttonLabel={<Icon type="ellipsis_vertical" />}
      >
        <ActionPopoverItem onClick={() => onInsertAbove(row)}>
          Insert above
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => onDuplicate(row)}>
          Duplicate
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => onDelete(row)}>
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    ),
  },
];

const useLargeColumns = (
  setRows: React.Dispatch<React.SetStateAction<LargeInvoiceLine[]>>,
) =>
  useMemo(
    () =>
      createLargeColumns({
        onDelete: ({ id }) =>
          setRows((currentRows) =>
            renumberLargeRows(deleteRow(currentRows, id)),
          ),
        onDuplicate: ({ id }) =>
          setRows((currentRows) =>
            renumberLargeRows(duplicateRow(currentRows, id)),
          ),
        onInsertAbove: ({ id }) =>
          setRows((currentRows) => insertLargeRowAbove(currentRows, id)),
      }),
    [setRows],
  );

export const StickyColumns: Story = {
  render: () => {
    const [rows, setRows] = useState(() => createLargeRows(12));
    const storyColumns = useLargeColumns(setRows);

    return (
      <Box maxWidth="100%" minWidth={0} width="900px">
        <DataGrid
          aria-label="Invoice lines with sticky columns"
          rows={rows}
          columns={storyColumns}
          maxHeight="360px"
          maxWidth="100%"
          stickyHeader
          enableTabNavigation
          onCellChange={({ rowId, field, value }) => {
            setRows((current) =>
              current.map((row) =>
                row.id === rowId ? { ...row, [field]: value } : row,
              ),
            );
          }}
        />
      </Box>
    );
  },
  parameters: {
    chromatic: { disableSnapshot: false },
    docs: {
      description: {
        story:
          "The line number and action columns stay pinned while the editable columns scroll beneath them. The header remains visible during vertical scrolling.",
      },
    },
  },
};

StickyColumns.storyName = "Sticky columns";

export const LargeScrollableGrid: Story = {
  render: () => {
    const [rows, setRows] = useState(() => createLargeRows(1000));
    const storyColumns = useLargeColumns(setRows);

    return (
      <DataGrid
        aria-label="Large invoice lines"
        rows={rows}
        columns={storyColumns}
        maxHeight="520px"
        maxWidth="100%"
        stickyHeader
        enableTabNavigation
        rowOverscan={6}
        onCellChange={({ rowId, field, value }) => {
          setRows((current) =>
            current.map((row) =>
              row.id === rowId ? { ...row, [field]: value } : row,
            ),
          );
        }}
      />
    );
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "A virtualized 1,000-row, 13-column example for demonstrating vertical and horizontal scrolling, sticky headers and edge columns, keyboard navigation, editing, validation and mixed cell types.",
      },
    },
  },
};

LargeScrollableGrid.storyName = "Large scrollable grid";

// Example plugins have a separate entry point, matching an external package boundary.
const columnTools = [
  createColumnReorderPlugin<LargeInvoiceLine>({
    canMove: ({ definition }) =>
      definition.type !== "action" && !definition.sticky,
  }),
  createColumnResizePlugin<LargeInvoiceLine>({
    canResize: ({ definition }) => definition.type !== "action",
  }),
];

export const ColumnPlugins: Story = {
  render: () => {
    const [rows, setRows] = useState(() => createLargeRows(1000));
    const storyColumns = useLargeColumns(setRows);
    const [columnLayout, setColumnLayout] = useState<DataGridColumnLayout>({
      order: [],
      widths: {},
    });
    return (
      <>
        <p>
          Pinned columns stay fixed. Drag a header handle to reorder the
          scrolling columns, or focus the handle and use Left/Right. Drag a
          column edge to resize, or focus the edge and use Left/Right.
          Double-click an edge to reset its width; Escape cancels a resize.
        </p>
        <Button
          type="button"
          onClick={() => setColumnLayout({ order: [], widths: {} })}
        >
          Reset column layout
        </Button>
        <DataGrid
          aria-label="Invoice lines with column plugins"
          rows={rows}
          columns={storyColumns}
          plugins={columnTools}
          columnLayout={columnLayout}
          onColumnLayoutChange={setColumnLayout}
          maxHeight="520px"
          maxWidth="100%"
          stickyHeader
          enableTabNavigation
          onCellChange={({ rowId, field, value }) =>
            setRows((current) =>
              current.map((row) =>
                row.id === rowId ? { ...row, [field]: value } : row,
              ),
            )
          }
        />
      </>
    );
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: `Experimental plugin spike. Import the example factories from
\`carbon-react/lib/components/data-grid/plugins\`; the core entry point does not import them.

A plugin declares \`id\`, \`apiVersion: 1\`, an optional \`Controller\` component and named slots.
\`headerActions\` is additive; \`headerResizeHandle\` has one owner; \`overlay\` renders outside
of the grid's ARIA row structure. Components receive a reactive \`snapshot\` and stable \`api\`.
Use \`api.subscribe(listener)\` for applied-state side effects and return its unsubscribe function
from an effect. Subscriptions exclude transient pointer drafts. Subscribe before reading the current
snapshot when synchronizing an external integration.

\`columnLayout\` plus \`onColumnLayoutChange\` enables controlled state. Commands request changes;
the parent supplies the accepted layout. Omit \`columnLayout\` for internal state, optionally seeded
with \`defaultColumnLayout\`. Column fields must be unique and stable. Definitions stay immutable;
width overrides and order live in the layout. Reordering stays within pinned regions. Resetting a
width restores its definition, including flex. Create plugin descriptors outside render or memoize
them to preserve mounted plugin state.

This spike supports resize on release and keyboard alternatives. Drag auto-scroll, RTL gestures,
column groups and live resizing are follow-up work.`,
      },
    },
  },
};
