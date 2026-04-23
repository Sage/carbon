import { Meta, StoryObj } from "@storybook/react-vite";
import ActionPopoverMenu from "./action-popover-menu.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof ActionPopoverMenu> = {
  title: "ActionPopoverMenu",
  component: ActionPopoverMenu,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof ActionPopoverMenu>;

export const Default: Story = {
  args: {
    children: [],
  },
};
