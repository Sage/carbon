import type { Meta, StoryObj } from "@storybook/react-vite";

import TableHeader from "./table-header.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */
const meta: Meta<typeof TableHeader> = {
  title: "Table Header",
  component: TableHeader,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof TableHeader>;

export const Default: Story = {
  args: {
    children: "Header",
  },
};
