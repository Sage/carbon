import { Meta, StoryObj } from "@storybook/react";

import FlatTableBodyDraggable from "./flat-table-body-draggable.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof FlatTableBodyDraggable> = {
  title: "Flat Table Body Draggable",
  component: FlatTableBodyDraggable,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof FlatTableBodyDraggable>;

export const Default: Story = {
  args: {
    children: [],
  },
};
