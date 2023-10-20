import { Meta, StoryObj } from "@storybook/react";

import ScrollableBlock from "./scrollable-block.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof ScrollableBlock> = {
  title: "Scrollable Block",
  component: ScrollableBlock,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof ScrollableBlock>;

export const Default: Story = {
  args: {
    children: [],
  },
};
