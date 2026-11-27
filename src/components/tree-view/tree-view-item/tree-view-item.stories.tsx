import { Meta, StoryObj } from "@storybook/react-vite";
import { TreeViewItem } from "./tree-view-item.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof TreeViewItem> = {
  title: "TreeViewItem",
  component: TreeViewItem,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof TreeViewItem>;

export const Default: Story = {
  args: {},
};
