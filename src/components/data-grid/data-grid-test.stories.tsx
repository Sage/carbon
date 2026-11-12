import React, { useMemo, useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { ActionPopover } from "../action-popover";
import ActionPopoverItem from "../action-popover/action-popover-item/action-popover-item.component";
import Box from "../box";
import Icon from "../icon";
import { DataGrid, DataGridColumn } from ".";

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
  stickyColumns = false,
}: {
  maxWidth?: string;
  stickyColumns?: boolean;
}) => {
  const [rows, setRows] = useState(initialRows);
  const columns = useMemo<DataGridColumn<VisualRow>[]>(
    () => [
      {
        field: "description",
        headerName: "Description",
        width: 220,
        sticky: stickyColumns ? "left" : undefined,
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
        sticky: stickyColumns ? "right" : undefined,
        readOnly: ({ row }) => row.id === 3,
        renderCell: ({ row }) => (
          <ActionPopover
            aria-label={`Actions for row ${row.id}`}
            buttonLabel={<Icon type="ellipsis_vertical" />}
            size="small"
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
    [stickyColumns],
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

export const CellStatesAndNavigationFocus: Story = {
  render: () => <VisualGrid />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstCell = canvas.getAllByRole("gridcell")[0];
    await userEvent.click(firstCell);
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

export const StickyColumnsScrolledWithOpenActions: Story = {
  render: () => <VisualGrid maxWidth="400px" stickyColumns />,
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
