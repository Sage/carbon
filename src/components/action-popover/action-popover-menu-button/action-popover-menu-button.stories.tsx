import { Meta, StoryObj } from "@storybook/react-vite";
import ActionPopoverMenuButton from "./action-popover-menu-button.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 * @deprecated Use ActionPopover's renderButton prop with Button or another custom trigger instead.
 */

const meta: Meta<typeof ActionPopoverMenuButton> = {
  title: "ActionPopoverMenuButton",
  component: ActionPopoverMenuButton,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof ActionPopoverMenuButton>;

export const Default: Story = {
  args: {},
};
