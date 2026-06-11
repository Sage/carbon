import { Meta, StoryObj } from "@storybook/react-vite";
import AnchorNavigationItem from "./anchor-navigation-item.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof AnchorNavigationItem> = {
  title: "AnchorNavigationItem",
  component: AnchorNavigationItem,
  tags: ["!dev"],
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
