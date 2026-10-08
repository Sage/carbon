import { Meta, StoryObj } from "@storybook/react-vite";

import { AnchorNavigationMenu } from "./anchor-navigation-menu.component";

/**
 * This file provides metadata for the documentation props table.
 * The `!dev` tag keeps it out of Storybook's component list.
 */

const meta: Meta<typeof AnchorNavigationMenu> = {
  title: "AnchorNavigationMenu",
  component: AnchorNavigationMenu,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof AnchorNavigationMenu>;

export const Default: Story = {
  args: {
    children: [],
  },
};
