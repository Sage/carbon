import { Meta, StoryObj } from "@storybook/react";

import Picklist from "./picklist.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof Picklist> = {
  title: "Picklist",
  component: Picklist,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Picklist>;

export const Default: Story = {
  args: {
    children: [],
  },
};
