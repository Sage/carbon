import { Meta, StoryObj } from "@storybook/react-vite";

import Picklist from "./picklist.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof Picklist> = {
  title: "Picklist",
  component: Picklist,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Picklist>;

export const Default: Story = {
  args: {
    children: [],
  },
};
