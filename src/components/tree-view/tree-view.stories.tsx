import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import TreeView from "./tree-view.component";
import Box from "../box";
import { TreeViewItemProps } from "./tree-view-item";

const meta: Meta<typeof TreeView> = {
  title: "TreeView",
  component: TreeView,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TreeView>;

export const DefaultStory: Story = () => {
  const items: TreeViewItemProps[] = [
    {
      id: "item-1",
      label: "Item 1",
      children: [
        {
          id: "item-1.1",
          label: "Item 1.1",
          children: [
            {
              id: "item-1.1.1",
              label: "Item 1.1.1",
              href: "#",
            },
            {
              id: "item-1.1.2",
              label: "Item 1.1.2",
            },
          ],
        },
        { id: "item-1.2", label: "Item 1.2" },
        {
          id: "item-1.3",
          label: "Item 1.3",
          href: "#",
        },
      ],
    },
    {
      id: "item-2",
      label: "Item 2",
    },
  ];

  return (
    <Box p="4px">
      <TreeView id="root" items={items} />
    </Box>
  );
};
DefaultStory.storyName = "Default";
