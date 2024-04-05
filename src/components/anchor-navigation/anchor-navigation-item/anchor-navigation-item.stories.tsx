import { Meta, StoryObj } from "@storybook/react";
import AnchorNavigationItem from "./anchor-navigation-item.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof AnchorNavigationItem> = {
  title: "AnchorNavigationItem",
  component: AnchorNavigationItem,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof AnchorNavigationItem>;

export const Default: Story = {
  args: {
    children: [],
  },
};
