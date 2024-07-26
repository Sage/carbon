import { Meta, StoryObj } from "@storybook/react";
import DraggableItem from "./draggable-item.component";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps(
  {
    padding: true,
  },
  { py: "8px" },
);

const meta: Meta<typeof DraggableItem> = {
  title: "Draggable Item",
  component: DraggableItem,
  tags: ["hideInSidebar"],
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof DraggableItem>;

export const Default: Story = {
  args: {
    children: [],
  },
};
