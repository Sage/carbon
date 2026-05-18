import { Meta, StoryObj } from "@storybook/react-vite";

import FlatTableHead from "./flat-table-head.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof FlatTableHead> = {
  title: "Flat Table Head",
  component: FlatTableHead,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof FlatTableHead>;

export const Default: Story = {
  args: {
    children: [],
  },
};
