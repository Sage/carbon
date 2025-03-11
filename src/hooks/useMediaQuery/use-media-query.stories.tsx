import { Meta, StoryObj } from "@storybook/react";
import useMediaQuery from "./useMediaQuery";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof useMediaQuery> = {
  tags: ["hideInSidebar"],
  parameters: {
    argTypes: {
      query: {
        type: { summary: "string" },
        description: "Any valid CSS media query.",
        required: true,
      },
    },
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof useMediaQuery>;

export const Default: Story = {
  args: "your-media-query-string",
};
