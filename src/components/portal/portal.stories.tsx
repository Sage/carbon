import { Meta, StoryObj } from "@storybook/react-vite";
import Portal from "./portal";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof Portal> = {
  component: Portal,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Portal>;

export const Default: Story = {
  args: {},
};
