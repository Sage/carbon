import React, { useMemo, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverProps,
} from "../action-popover";
import ActionPopoverItem from "../action-popover/action-popover-item/action-popover-item.component";
import Button from "../button/__next__";
import Box from "../box";
import Icon from "../icon";
import Link from "../link";
import Message from "../message";
import {
  DataGrid,
  DataGridCellError,
  DataGridColumn,
  DataGridHandle,
  DataGridProps,
  DataGridRowChange,
} from ".";

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

interface InvoiceLine {
  id: number;
  description: string;
  category: string;
  selected: boolean;
  actions: null;
}

interface PlaygroundInvoiceLine {
  id: number;
  vatRate: string;
  vatAmount: string;
  description: string;
  quantity: string;
  rate: string;
  net: string;
  actions: null;
}

type PlaygroundPinnedColumns = "none" | "left" | "right" | "both";

type PlaygroundArgs = Partial<DataGridProps<PlaygroundInvoiceLine>> & {
  /** Story-only control used to demonstrate column pinning. */
  playgroundPinnedColumns: PlaygroundPinnedColumns;
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
    description: "Software licence",
    category: "Software",
    selected: false,
    actions: null,
  },
];

const playgroundRows: Omit<PlaygroundInvoiceLine, "id">[] = [
  {
    vatRate: "Standard 20.00%",
    vatAmount: "600.00",
    description: "Labour",
    quantity: "1",
    rate: "3,000.00",
    net: "3,000.00",
    actions: null,
  },
  {
    vatRate: "Standard 20.00%",
    vatAmount: "200.00",
    description: "Bath",
    quantity: "2",
    rate: "500.00",
    net: "1,000.00",
    actions: null,
  },
  {
    vatRate: "Standard 20.00%",
    vatAmount: "50.00",
    description: "Shower enclosure",
    quantity: "1",
    rate: "250.00",
    net: "250.00",
    actions: null,
  },
  {
    vatRate: "Standard 20.00%",
    vatAmount: "208.00",
    description: "Tiles",
    quantity: "52",
    rate: "20.00",
    net: "1,040.00",
    actions: null,
  },
  {
    vatRate: "Standard 20.00%",
    vatAmount: "150.00",
    description: "Flooring",
    quantity: "30",
    rate: "25.00",
    net: "750.00",
    actions: null,
  },
];

const createPlaygroundRows = (): PlaygroundInvoiceLine[] =>
  Array.from({ length: 30 }, (_, index) => ({
    ...playgroundRows[index % playgroundRows.length],
    id: index + 1,
  }));

const getDescriptionErrors = (
  rows: { id: number; description: string }[],
): DataGridCellError[] =>
  rows
    .filter((row) => !row.description)
    .map((row) => ({
      rowId: row.id,
      field: "description",
      message: "Enter a description",
    }));

const getPlaygroundErrors = (
  rows: PlaygroundInvoiceLine[],
): DataGridCellError[] => {
  const fields = [
    { field: "vatRate", message: "Choose a VAT rate" },
    { field: "description", message: "Enter a description" },
    { field: "quantity", message: "Enter a quantity" },
    { field: "rate", message: "Enter a rate" },
  ] as const;
  return rows.flatMap((row) =>
    fields.flatMap(({ field, message }) =>
      row[field].trim() ? [] : [{ rowId: row.id, field, message }],
    ),
  );
};

const vatPercentages: Record<string, number> = {
  "Standard 20.00%": 0.2,
  "Lower Rate 5.00%": 0.05,
  "Zero Rated 0.00%": 0,
  "Exempt 0.00%": 0,
  "No VAT": 0,
};

const parseAmount = (value: string) => Number(value.replaceAll(",", ""));

const formatAmount = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const calculatePlaygroundRows = (
  rows: PlaygroundInvoiceLine[],
): PlaygroundInvoiceLine[] =>
  rows.map((row) => {
    const quantity = parseAmount(row.quantity);
    const rate = parseAmount(row.rate);
    const hasValidAmounts =
      row.quantity.trim() !== "" &&
      row.rate.trim() !== "" &&
      Number.isFinite(quantity) &&
      Number.isFinite(rate);

    if (!hasValidAmounts) {
      return { ...row, vatAmount: "", net: "" };
    }

    const net = quantity * rate;
    const vatAmount = net * (vatPercentages[row.vatRate] ?? 0);

    return {
      ...row,
      vatAmount: formatAmount(vatAmount),
      net: formatAmount(net),
    };
  });

const createPlaygroundColumns = (
  createDuplicateId: () => number,
): DataGridColumn<PlaygroundInvoiceLine>[] => [
  {
    field: "vatRate",
    headerName: "VAT rate",
    type: "dropdown",
    weight: "regular",
    minWidth: 220,
    flex: 1,
    options: [
      { label: "Standard 20.00%", value: "Standard 20.00%" },
      { label: "Lower Rate 5.00%", value: "Lower Rate 5.00%" },
      { label: "Zero Rated 0.00%", value: "Zero Rated 0.00%" },
      { label: "Exempt 0.00%", value: "Exempt 0.00%" },
      { label: "No VAT", value: "No VAT" },
    ],
  },
  {
    field: "vatAmount",
    headerName: "VAT (£)",
    align: "right",
    readOnly: true,
    minWidth: 150,
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    minWidth: 240,
    flex: 2,
  },
  {
    field: "quantity",
    headerName: "Quantity / Hours",
    align: "right",
    minWidth: 190,
    flex: 1,
  },
  {
    field: "rate",
    headerName: "Rate (£)",
    align: "right",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "net",
    headerName: "Net (£)",
    align: "right",
    readOnly: true,
    weight: "medium",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "actions",
    headerName: "",
    headerAriaLabel: "Actions",
    type: "action",
    pinned: "right",
    width: 52,
    renderCell: ({ api, row, rowId }) => (
      <ActionPopover
        aria-label={`Actions for ${row.description}`}
        renderButton={renderSmallActionPopoverButton}
        size="medium"
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

const createInvoiceColumns = (
  createDuplicateId: () => number,
): DataGridColumn<InvoiceLine>[] => [
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    minWidth: 220,
  },
  {
    field: "category",
    headerName: "Category",
    type: "dropdown",
    flex: 1,
    minWidth: 220,
    weight: "regular",
    options: [
      { label: "Services", value: "Services" },
      { label: "Software", value: "Software" },
      { label: "Expenses", value: "Expenses" },
    ],
  },
  {
    field: "selected",
    headerName: "Included",
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
        renderButton={renderSmallActionPopoverButton}
        size="medium"
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

const getPlaygroundColumns = <T extends object>(
  columns: DataGridColumn<T>[],
  pinnedColumns: PlaygroundPinnedColumns,
): DataGridColumn<T>[] =>
  columns.map((column, index) => ({
    ...column,
    pinned:
      column.pinned === "right"
        ? "right"
        : index === 0 && (pinnedColumns === "left" || pinnedColumns === "both")
          ? "left"
          : index === columns.length - 1 &&
              (pinnedColumns === "right" || pinnedColumns === "both")
            ? "right"
            : undefined,
  })) as DataGridColumn<T>[];

const usePlaygroundColumns = (
  rows: PlaygroundInvoiceLine[],
  pinnedColumns: PlaygroundPinnedColumns,
) =>
  useMemo(
    () =>
      getPlaygroundColumns(
        createPlaygroundColumns(() => getNextRowId(rows)),
        pinnedColumns,
      ),
    [rows, pinnedColumns],
  );

const useInvoiceColumns = (
  rows: InvoiceLine[],
  pinnedColumns: PlaygroundPinnedColumns = "none",
) =>
  useMemo(
    () =>
      getPlaygroundColumns(
        createInvoiceColumns(() => getNextRowId(rows)),
        pinnedColumns,
      ),
    [rows, pinnedColumns],
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
    playgroundPinnedColumns: "right",
  },
  argTypes: {
    playgroundPinnedColumns: {
      name: "pinned columns",
      options: ["right", "both"],
      control: { type: "radio" },
      table: { category: "Playground" },
    },
  },
  render: (args) => {
    const [rows, setRows] = useState(createPlaygroundRows);
    const { playgroundPinnedColumns, ...dataGridProps } = args;
    const storyColumns = usePlaygroundColumns(rows, playgroundPinnedColumns);

    return (
      <DataGrid
        {...dataGridProps}
        aria-label="Invoice lines playground"
        rows={rows}
        errors={getPlaygroundErrors(rows)}
        columns={storyColumns}
        onBeforeRowChange={({ proposedRows }) =>
          calculatePlaygroundRows(proposedRows)
        }
        onRowsChange={(nextRows) => setRows(nextRows)}
      />
    );
  },
};

export const EditableInvoiceLines: Story = {
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
          errors={getDescriptionErrors(rows)}
          columns={storyColumns}
          maxWidth="100%"
          enableTabNavigation
          onRowsChange={(nextRows) => setRows(nextRows)}
        />
        <Button
          variantType="secondary"
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
          errors={getDescriptionErrors(rows)}
          columns={storyColumns}
          maxWidth="100%"
          enableTabNavigation
          onBeforeRowChange={({ previousRows, proposedRows, change }) => {
            if (change.type === "row-delete" && previousRows.length === 1) {
              return false;
            }
            return proposedRows.map((row) => ({
              ...row,
              description: row.description.trim(),
            }));
          }}
          onRowsChange={(nextRows, change) => {
            setRows(nextRows);
            setLastChange(change);
          }}
        />
        <Button
          variantType="secondary"
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
  render: () => {
    const gridRef = useRef<DataGridHandle<InvoiceLine>>(null);
    const [rows, setRows] = useState(() =>
      initialRows.map((row) => ({
        ...row,
        description: row.id === 3 ? "" : row.description,
      })),
    );
    const storyColumns = useInvoiceColumns(rows);
    const errors = getDescriptionErrors(rows);

    return (
      <Box id="invoice-validation-grid" maxWidth="760px">
        {errors.length > 0 && (
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
                {errors.map((error) => (
                  <Link
                    href="#invoice-validation-grid"
                    key={error.rowId}
                    onClick={(event) => {
                      event.preventDefault();
                      gridRef.current?.editCell(error.rowId, error.field);
                    }}
                  >
                    {error.message} on row {error.rowId}
                  </Link>
                ))}
              </Box>
            </Message>
          </Box>
        )}
        <DataGrid
          ref={gridRef}
          aria-label="Invoice lines with validation"
          rows={rows}
          errors={errors}
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
  onMoveDown: (row: LargeInvoiceLine) => void;
  onMoveUp: (row: LargeInvoiceLine) => void;
  rowCount: number;
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

const moveLargeRow = (
  rows: LargeInvoiceLine[],
  rowId: number,
  offset: -1 | 1,
): LargeInvoiceLine[] => {
  const rowIndex = rows.findIndex(({ id }) => id === rowId);
  const destinationIndex = rowIndex + offset;

  if (rowIndex < 0 || destinationIndex < 0 || destinationIndex >= rows.length) {
    return rows;
  }

  const reorderedRows = [...rows];
  const [movedRow] = reorderedRows.splice(rowIndex, 1);
  reorderedRows.splice(destinationIndex, 0, movedRow);

  return renumberLargeRows(reorderedRows);
};

const createLargeColumns = ({
  onDelete,
  onDuplicate,
  onInsertAbove,
  onMoveDown,
  onMoveUp,
  rowCount,
}: LargeRowActions): DataGridColumn<LargeInvoiceLine>[] => [
  {
    field: "line",
    headerName: "Line",
    width: 72,
    pinned: "left",
    weight: "medium",
    readOnly: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 240,
  },
  { field: "sku", headerName: "SKU", width: 130 },
  {
    field: "category",
    headerName: "Category",
    type: "dropdown",
    weight: "regular",
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
    weight: "regular",
    width: 130,
    options: ["0", "5", "20"].map((value) => ({
      label: `${value}%`,
      value,
    })),
  },
  {
    field: "selected",
    headerName: "Included",
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
    pinned: "right",
    renderCell: ({ row }) => (
      <ActionPopover
        aria-label={`Actions for line ${row.line}`}
        renderButton={renderSmallActionPopoverButton}
        size="medium"
      >
        <ActionPopoverItem icon="add" onClick={() => onInsertAbove(row)}>
          Insert row above
        </ActionPopoverItem>
        <ActionPopoverItem icon="copy" onClick={() => onDuplicate(row)}>
          Duplicate row
        </ActionPopoverItem>
        <ActionPopoverItem
          disabled={row.line === "1"}
          icon="arrow_up"
          onClick={() => onMoveUp(row)}
        >
          Move Up
        </ActionPopoverItem>
        <ActionPopoverItem
          disabled={row.line === String(rowCount)}
          icon="arrow_down"
          onClick={() => onMoveDown(row)}
        >
          Move Down
        </ActionPopoverItem>
        <ActionPopoverDivider />
        <ActionPopoverItem icon="delete" onClick={() => onDelete(row)}>
          Delete
        </ActionPopoverItem>
      </ActionPopover>
    ),
  },
];

const useLargeColumns = (
  rows: LargeInvoiceLine[],
  setRows: React.Dispatch<React.SetStateAction<LargeInvoiceLine[]>>,
) => {
  const rowCount = rows.length;

  return useMemo(
    () =>
      createLargeColumns({
        rowCount,
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
        onMoveDown: ({ id }) =>
          setRows((currentRows) => moveLargeRow(currentRows, id, 1)),
        onMoveUp: ({ id }) =>
          setRows((currentRows) => moveLargeRow(currentRows, id, -1)),
      }),
    [rowCount, setRows],
  );
};

const getLargeErrors = (rows: LargeInvoiceLine[]): DataGridCellError[] => [
  ...getDescriptionErrors(rows),
  ...rows
    .filter((row) => !row.quantity)
    .map((row) => ({
      rowId: row.id,
      field: "quantity",
      message: "Enter a quantity",
    })),
];

export const PinnedColumns: Story = {
  render: () => {
    const [rows, setRows] = useState(() => createLargeRows(12));
    const storyColumns = useLargeColumns(rows, setRows);

    return (
      <Box maxWidth="100%" minWidth={0} width="900px">
        <DataGrid
          aria-label="Invoice lines with pinned columns"
          rows={rows}
          errors={getLargeErrors(rows)}
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
    docs: {
      description: {
        story:
          "The line number and action columns stay pinned while the editable columns scroll beneath them. The header remains visible during vertical scrolling.",
      },
    },
  },
};

PinnedColumns.storyName = "Pinned columns";

export const LargeScrollableGrid: Story = {
  render: () => {
    const [rows, setRows] = useState(() => createLargeRows(1000));
    const storyColumns = useLargeColumns(rows, setRows);

    return (
      <DataGrid
        aria-label="Large invoice lines"
        rows={rows}
        errors={getLargeErrors(rows)}
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
          "A virtualized 1,000-row, 13-column example for demonstrating vertical and horizontal scrolling, sticky headers and pinned edge columns, keyboard navigation, editing, validation and mixed cell types.",
      },
    },
  },
};

LargeScrollableGrid.storyName = "Large scrollable grid";
