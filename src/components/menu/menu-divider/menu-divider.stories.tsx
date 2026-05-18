import { Meta, StoryObj } from "@storybook/react-vite";

import MenuDivider from "./menu-divider.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof MenuDivider> = {
  title: "Menu Divider",
  component: MenuDivider,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof MenuDivider>;

export const Default: Story = {
  args: {},
};
