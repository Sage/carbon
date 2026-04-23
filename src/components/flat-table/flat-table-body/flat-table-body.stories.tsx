import { Meta, StoryObj } from "@storybook/react-vite";

import FlatTableBody from "./flat-table-body.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof FlatTableBody> = {
  title: "Flat Table Body",
  component: FlatTableBody,
  tags: ["!dev"],
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
