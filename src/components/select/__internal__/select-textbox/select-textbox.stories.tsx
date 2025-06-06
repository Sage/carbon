import { Meta, StoryObj } from "@storybook/react-vite";
import SelectTextbox from "./select-textbox.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof SelectTextbox> = {
  title: "Select Textbox",
  component: SelectTextbox,
  tags: ["!dev"],
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
