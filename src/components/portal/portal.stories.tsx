import { Meta, StoryObj } from "@storybook/react";
import Portal from "./portal";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof Portal> = {
  title: "Portal",
  component: Portal,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Portal>;

export const Default: Story = {
  args: {},
};
