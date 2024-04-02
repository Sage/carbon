import { Meta, StoryObj } from "@storybook/react";

import MenuFullscreen from "./menu-full-screen.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof MenuFullscreen> = {
  title: "Menu Full Screen",
  component: MenuFullscreen,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof MenuFullscreen>;

export const Default: Story = {
  args: {
    children: [],
  },
};
