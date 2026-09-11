import type { Meta, StoryObj } from "@storybook/react-vite";

import TableFoot from "./table-foot.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */
const meta: Meta<typeof TableFoot> = {
  title: "Table Foot",
  component: TableFoot,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof TableFoot>;

export const Default: Story = {
  args: {
    children: [],
  },
};
