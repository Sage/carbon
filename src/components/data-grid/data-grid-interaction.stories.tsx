import React, { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import { ActionPopover } from "../action-popover";
import ActionPopoverItem from "../action-popover/action-popover-item/action-popover-item.component";
import Icon from "../icon";
import { DataGrid, DataGridColumn } from ".";

interface InteractionRow {
  id: number;
  description: string;
  category: string;
  selected: boolean;
  actions: null;
}

const initialRows: InteractionRow[] = [
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
];

const InteractionGrid = () => {
  const [rows, setRows] = useState(initialRows);
  const columns = useMemo<DataGridColumn<InteractionRow>[]>(
    () => [
      { field: "description", headerName: "Description", width: 220 },
      {
        field: "category",
        headerName: "Category",
        type: "dropdown",
        width: 160,
        options: [
          { label: "Services", value: "Services" },
          { label: "Software", value: "Software" },
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
            aria-label={`Actions for ${row.description}`}
            buttonLabel={<Icon type="ellipsis_vertical" />}
            size="small"
          >
            <ActionPopoverItem
              onClick={() =>
                api.duplicateRow(rowId, {
                  ...row,
                  id: Math.max(...rows.map(({ id }) => id)) + 1,
                })
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
    ],
    [rows],
  );

  return (
    <DataGrid
      aria-label="Invoice lines"
      rows={rows}
      columns={columns}
      enableTabNavigation
      onRowsChange={setRows}
    />
  );
};

const meta = {
  title: "Data Grid/Interactions",
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

export const EditTextAndNavigate: Story = {
  render: () => <InteractionGrid />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const cells = canvas.getAllByRole("gridcell");

    await userEvent.click(cells[0]);
    await userEvent.keyboard("{Enter}");
    await userEvent.type(canvas.getByRole("textbox"), " services{Tab}");

    await expect(cells[0]).toHaveTextContent("Consulting services");
    await expect(cells[1]).toHaveFocus();
  },
};

export const ToggleCheckbox: Story = {
  render: () => <InteractionGrid />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const checkbox = canvas.getAllByRole("checkbox")[0];
    const checkboxCell = checkbox.closest('[role="gridcell"]');

    if (!checkboxCell) throw new Error("Checkbox cell not found");

    await userEvent.click(checkboxCell);
    await expect(checkbox).toBeChecked();

    await userEvent.keyboard(" ");
    await expect(checkbox).not.toBeChecked();
  },
};

export const OpenAndCloseActionPopover: Story = {
  render: () => <InteractionGrid />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const body = within(document.body);
    const actionCell = canvas.getAllByRole("gridcell")[3];

    await userEvent.click(actionCell);
    await userEvent.keyboard("{Enter}");
    await expect(
      await body.findByRole("button", { name: "Duplicate" }),
    ).toHaveFocus();

    await userEvent.keyboard("{Escape}");
    await expect(body.queryByRole("list")).not.toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Actions for Consulting" }),
    ).toHaveFocus();
  },
};
