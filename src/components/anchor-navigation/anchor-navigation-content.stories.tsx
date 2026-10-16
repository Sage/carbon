import { Meta, StoryObj } from "@storybook/react-vite";

import { AnchorNavigationContent } from "./anchor-navigation-menu.component";

/**
 * This file provides metadata for the documentation props table.
 * The `!dev` tag keeps it out of Storybook's component list.
 */

const meta: Meta<typeof AnchorNavigationContent> = {
  title: "AnchorNavigationContent",
  component: AnchorNavigationContent,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof AnchorNavigationContent>;

export const Default: Story = {
  args: {
    children: [],
  },
};
