import { Meta, StoryObj } from "@storybook/react-vite";
import DraggableItem from "./draggable-item.component";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
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
  tags: ["!dev"],
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
