import type { Meta, StoryObj } from "@storybook/react-vite";

import TableBody from "./table-body.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */
const meta: Meta<typeof TableBody> = {
  title: "Table Body",
  component: TableBody,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof TableBody>;

export const Default: Story = {
  args: {
    children: [],
  },
};
