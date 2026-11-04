import type { Meta, StoryObj } from "@storybook/react-vite";

import TableHead from "./table-head.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */
const meta: Meta<typeof TableHead> = {
  title: "Table Head",
  component: TableHead,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof TableHead>;

export const Default: Story = {
  args: {
    children: [],
  },
};
