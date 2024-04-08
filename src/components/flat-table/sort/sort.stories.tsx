import { Meta, StoryObj } from "@storybook/react";
import Sort from "./sort.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof Sort> = {
  title: "Sort",
  component: Sort,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Sort>;

export const Default: Story = {
  args: {
    children: "",
  },
};
