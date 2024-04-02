import { Meta, StoryObj } from "@storybook/react";

import FlatTableBody from "./flat-table-body.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof FlatTableBody> = {
  title: "Flat Table Body",
  component: FlatTableBody,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof FlatTableBody>;

export const Default: Story = {
  args: {
    children: [],
  },
};
