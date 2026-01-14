import { Meta, StoryObj } from "@storybook/react";
import ActionPopoverItem from "./action-popover-item.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof ActionPopoverItem> = {
  title: "ActionPopoverItem",
  component: ActionPopoverItem,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof ActionPopoverItem>;

export const Default: Story = {
  args: {},
};
