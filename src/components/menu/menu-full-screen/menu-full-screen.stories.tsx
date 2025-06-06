import { Meta, StoryObj } from "@storybook/react-vite";

import MenuFullscreen from "./menu-full-screen.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof MenuFullscreen> = {
  title: "Menu Full Screen",
  component: MenuFullscreen,
  tags: ["!dev"],
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
