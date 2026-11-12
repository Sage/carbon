import React, { useMemo, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import { ActionPopover } from "../action-popover";
import ActionPopoverItem from "../action-popover/action-popover-item/action-popover-item.component";
import Button from "../button";
import Box from "../box";
import Icon from "../icon";
import Link from "../link";
import Message from "../message";
import {
  DataGrid,
  DataGridColumn,
  DataGridHandle,
  DataGridProps,
  DataGridRowChange,
} from ".";

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

const createInvoiceColumns = (
  createDuplicateId: () => number,
): DataGridColumn<InvoiceLine>[] => [
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
    renderCell: ({ api, row, rowId }) => (
      <ActionPopover
        aria-label={`Actions for ${row.description || "empty line"}`}
        buttonLabel={<Icon type="ellipsis_vertical" />}
        size="small"
      >
        <ActionPopoverItem
          onClick={() =>
            api.duplicateRow(rowId, { ...row, id: createDuplicateId() })
          }
        >
          Duplicate
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => api.deleteRow(rowId)}>
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
  rows: InvoiceLine[],
  stickyColumns: PlaygroundStickyColumns = "none",
) =>
  useMemo(
    () =>
      getPlaygroundColumns(
        createInvoiceColumns(() => getNextRowId(rows)),
        stickyColumns,
      ),
    [rows, stickyColumns],
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
    const storyColumns = useInvoiceColumns(rows, playgroundStickyColumns);

    return (
      <DataGrid
        {...dataGridProps}
        aria-label="Invoice lines playground"
        rows={rows}
        columns={storyColumns}
        onRowsChange={(nextRows) => setRows(nextRows)}
      />
    );
  },
};

export const EditableInvoiceLines: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => {
    const gridRef = useRef<DataGridHandle<InvoiceLine>>(null);
    const [rows, setRows] = useState(initialRows);
    const storyColumns = useInvoiceColumns(rows);

    return (
      <Box maxWidth="100%" minWidth={0} width="600px">
        <DataGrid
          ref={gridRef}
          aria-label="Invoice lines"
          rows={rows}
          columns={storyColumns}
          maxWidth="100%"
          enableTabNavigation
          onRowsChange={(nextRows) => setRows(nextRows)}
        />
        <Button
          buttonType="secondary"
          iconType="add"
          iconPosition="before"
          mt={2}
          onClick={() =>
            gridRef.current?.addRow({
              id: getNextRowId(rows),
              description: "",
              category: "Services",
              selected: false,
              actions: null,
            })
          }
        >
          Add line
        </Button>
      </Box>
    );
  },
};

EditableInvoiceLines.storyName = "Editable invoice lines";

export const ControlledRows: Story = {
  render: () => {
    const gridRef = useRef<DataGridHandle<InvoiceLine>>(null);
    const [rows, setRows] = useState(() => initialRows.slice(0, 3));
    const [lastChange, setLastChange] =
      useState<DataGridRowChange<InvoiceLine> | null>(null);
    const storyColumns = useInvoiceColumns(rows);

    return (
      <Box maxWidth="100%" minWidth={0} width="760px">
        <DataGrid
          ref={gridRef}
          aria-label="Controlled invoice lines"
          rows={rows}
          columns={storyColumns}
          maxWidth="100%"
          enableTabNavigation
          onRowsChange={(nextRows, change) => {
            setRows(nextRows);
            setLastChange(change);
          }}
        />
        <Button
          buttonType="secondary"
          iconType="add"
          iconPosition="before"
          mt={2}
          onClick={() =>
            gridRef.current?.addRow({
              id: getNextRowId(rows),
              description: "",
              category: "Services",
              selected: false,
              actions: null,
            })
          }
        >
          Add line
        </Button>
        <Box
          as="pre"
          backgroundColor="--colorsUtilityMajor025"
          mt={2}
          overflow="auto"
          p={2}
        >
          {JSON.stringify({ rows, lastChange }, null, 2)}
        </Box>
      </Box>
    );
  },
};

ControlledRows.storyName = "Controlled rows and change output";

export const ValidationAndErrorSummary: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => {
    const gridRef = useRef<DataGridHandle<InvoiceLine>>(null);
    const [rows, setRows] = useState(() =>
      initialRows.map((row) => ({
        ...row,
        description: row.id === 3 ? "" : row.description,
      })),
    );
    const storyColumns = useInvoiceColumns(rows);
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
          onRowsChange={(nextRows) => setRows(nextRows)}
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

interface RowActions<T> {
  onDelete: (row: T) => void;
  onDuplicate: (row: T) => void;
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
        size="small"
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
          onRowsChange={(nextRows) => setRows(nextRows)}
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
        onRowsChange={(nextRows) => setRows(nextRows)}
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
