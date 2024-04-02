import { Meta, StoryObj } from "@storybook/react";
import SelectTextbox from "./select-textbox.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof SelectTextbox> = {
  title: "Select Textbox",
  component: SelectTextbox,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof SelectTextbox>;

export const Default: Story = {
  args: {
    children: [],
  },
};
