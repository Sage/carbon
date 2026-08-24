import type { Meta, StoryObj } from "@storybook/react-vite";

import TableRow from "./table-row.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */
const meta: Meta<typeof TableRow> = {
  title: "Table Row",
  component: TableRow,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof TableRow>;

export const Default: Story = {
  args: {
    children: [],
    id: "table-row",
  },
};
