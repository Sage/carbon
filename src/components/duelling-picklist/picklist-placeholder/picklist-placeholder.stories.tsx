import { Meta, StoryObj } from "@storybook/react";
import PicklistPlaceholder from "./picklist-placeholder.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof PicklistPlaceholder> = {
  title: "Picklist Placeholder",
  component: PicklistPlaceholder,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof PicklistPlaceholder>;

export const Default: Story = {
  args: {
    text: "",
  },
};
