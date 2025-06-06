import { Meta, StoryObj } from "@storybook/react-vite";
import SimpleColor from "./simple-color.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof SimpleColor> = {
  title: "Simple Color",
  component: SimpleColor,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof SimpleColor>;

export const Default: Story = {
  args: {},
};
