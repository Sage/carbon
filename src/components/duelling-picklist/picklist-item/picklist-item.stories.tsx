import { Meta, StoryObj } from "@storybook/react";

import PicklistItem from "./picklist-item.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof PicklistItem> = {
  title: "Picklist Item",
  component: PicklistItem,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof PicklistItem>;

export const Default: Story = {
  args: {
    children: [],
  },
};
