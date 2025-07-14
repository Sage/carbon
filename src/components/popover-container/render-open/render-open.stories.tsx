import { Meta, StoryObj } from "@storybook/react-vite";
import { renderOpen } from "../popover-container.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof renderOpen> = {
  title: "Render Open",
  component: renderOpen,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof renderOpen>;

export const Default: Story = {
  args: {},
};
