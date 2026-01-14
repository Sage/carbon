import { ArgTypes, Meta, StoryObj } from "@storybook/react";

import ResponsiveVerticalMenuItem, {
  ResponsiveVerticalMenuItemProps,
} from "./responsive-vertical-menu-item.component";
import generateStyledSystemProps from "../../../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
  padding: true,
}) as Partial<ArgTypes<ResponsiveVerticalMenuItemProps>>;

const meta: Meta<typeof ResponsiveVerticalMenuItem> = {
  title: "ResponsiveVerticalMenuItem",
  component: ResponsiveVerticalMenuItem,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof ResponsiveVerticalMenuItem>;

export const Default: Story = {
  args: {
    children: [],
  },
};
