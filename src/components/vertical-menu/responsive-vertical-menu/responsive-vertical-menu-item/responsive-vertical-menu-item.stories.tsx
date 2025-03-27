import { Meta, StoryObj } from "@storybook/react";
import { ResponsiveVerticalMenuItem } from "./responsive-vertical-menu-item";

const meta: Meta<typeof ResponsiveVerticalMenuItem> = {
  title: "ResponsiveVerticalMenuItem",
  component: ResponsiveVerticalMenuItem,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof ResponsiveVerticalMenuItem>;

export const Default: Story = {
  args: {
    children: [],
  },
};
