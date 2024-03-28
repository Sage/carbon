import { Meta, StoryObj } from "@storybook/react";
import Crumb from "./crumb.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof Crumb> = {
  title: "Crumb",
  component: Crumb,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Crumb>;

export const Default: Story = {
  args: {
    children: [],
  },
};
