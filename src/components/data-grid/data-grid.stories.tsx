import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import { ActionPopover } from "../action-popover";
import ActionPopoverItem from "../action-popover/action-popover-item/action-popover-item.component";
import { DataGrid, DataGridColumn } from ".";

interface InvoiceLine {
  id: number;
  description: string;
  category: string;
  taxable: boolean;
  actions: null;
}

const initialRows: InvoiceLine[] = [
  {
    id: 1,
    description: "Consulting",
    category: "Services",
    taxable: true,
    actions: null,
  },
  {
    id: 2,
    description: "Software licence",
    category: "Software",
    taxable: true,
    actions: null,
  },
  {
    id: 3,
    description: "Travel",
    category: "Expenses",
    taxable: false,
    actions: null,
  },
  {
    id: 4,
    description: "",
    category: "Services",
    taxable: false,
    actions: null,
  },
  {
    id: 5,
    description: "Readonly item",
    category: "Software",
    taxable: true,
    actions: null,
  },
];

const columns: DataGridColumn<InvoiceLine>[] = [
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    minWidth: 220,
    sticky: "left",
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
  { field: "taxable", headerName: "Taxable", type: "checkbox", width: 100 },
  {
    field: "actions",
    headerName: "",
    type: "action",
    width: 52,
    sticky: "right",
    renderCell: ({ row }) => (
      <ActionPopover
        aria-label={`Actions for ${row.description || "empty line"}`}
      >
        <ActionPopoverItem onClick={() => undefined}>
          Duplicate
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => undefined}>Delete</ActionPopoverItem>
      </ActionPopover>
    ),
  },
];

const meta = {
  title: "Data Grid/Prototype",
  component: DataGrid,
  parameters: { chromatic: { disableSnapshot: true } },
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof DataGrid>;

export const EditableInvoiceLines: Story = {
  render: () => {
    const [rows, setRows] = useState(initialRows);

    return (
      <DataGrid
        aria-label="Invoice lines"
        rows={rows}
        columns={columns}
        width="586px"
        enableTabNavigation
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

EditableInvoiceLines.storyName = "Editable invoice lines";

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
  billable: boolean;
  total: string;
  actions: null;
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
      billable: index % 4 !== 0,
      total: total.toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP",
      }),
      actions: null,
    };
  });

const largeColumns: DataGridColumn<LargeInvoiceLine>[] = [
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
    sticky: "left",
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
    error: ({ value }) => !value && "Enter a quantity",
  },
  { field: "unitPrice", headerName: "Unit price", width: 130 },
  { field: "discount", headerName: "Discount %", width: 120 },
  {
    field: "taxRate",
    headerName: "Tax rate",
    type: "dropdown",
    width: 130,
    options: ["0", "5", "20"].map((value) => ({
      label: `${value}%`,
      value,
    })),
  },
  {
    field: "billable",
    headerName: "Billable",
    type: "checkbox",
    width: 100,
  },
  {
    field: "total",
    headerName: "Line total",
    width: 130,
    sticky: "right",
    weight: "medium",
    readOnly: true,
  },
  {
    field: "actions",
    headerName: "",
    type: "action",
    width: 52,
    sticky: "right",
    renderCell: ({ row }) => (
      <ActionPopover aria-label={`Actions for line ${row.line}`}>
        <ActionPopoverItem onClick={() => undefined}>
          Insert above
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => undefined}>
          Duplicate
        </ActionPopoverItem>
        <ActionPopoverItem onClick={() => undefined}>Delete</ActionPopoverItem>
      </ActionPopover>
    ),
  },
];

export const LargeScrollableGrid: Story = {
  render: () => {
    const [rows, setRows] = useState(() => createLargeRows(1000));

    return (
      <DataGrid
        aria-label="Large invoice lines"
        rows={rows}
        columns={largeColumns}
        height="520px"
        width="100%"
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
