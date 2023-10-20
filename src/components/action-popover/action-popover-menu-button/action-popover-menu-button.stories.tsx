import { Meta, StoryObj } from "@storybook/react";
import ActionPopoverMenuButton from "./action-popover-menu-button.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof ActionPopoverMenuButton> = {
  title: "ActionPopoverMenuButton",
  component: ActionPopoverMenuButton,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof ActionPopoverMenuButton>;

export const Default: Story = {
  args: {},
};
