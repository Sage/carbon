import { Meta, StoryObj } from "@storybook/react";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta = {
  tags: ["hideInSidebar"],
  argTypes: {
    query: {
      type: { name: "string", required: true },
      description: "Any valid CSS media query.",
    },
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;

export const Default: StoryObj = {
  args: {
    children: [],
  },
};
