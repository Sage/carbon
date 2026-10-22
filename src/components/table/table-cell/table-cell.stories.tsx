import type { Meta, StoryObj } from "@storybook/react-vite";

import TableCell from "./table-cell.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */
const meta: Meta<typeof TableCell> = {
  title: "Table Cell",
  component: TableCell,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof TableCell>;

export const Default: Story = {
  args: {
    children: "Cell",
  },
};
