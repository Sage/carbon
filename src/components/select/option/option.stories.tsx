import { Meta, StoryObj } from "@storybook/react";
import Option from "./option.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof Option> = {
  title: "Select/Option",
  component: Option,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Option>;

export const Default: Story = {
  args: {
    children: [],
  },
};
