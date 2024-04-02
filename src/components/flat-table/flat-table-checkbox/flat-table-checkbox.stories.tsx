import { Meta, StoryObj } from "@storybook/react";
import FlatTableCheckbox from "./flat-table-checkbox.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof FlatTableCheckbox> = {
  title: "Flat Table Checkbox",
  component: FlatTableCheckbox,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof FlatTableCheckbox>;

export const Default: Story = {
  args: {},
};
