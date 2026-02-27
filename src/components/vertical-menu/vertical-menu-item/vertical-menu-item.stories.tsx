import { Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import VerticalMenuItem from "./vertical-menu-item.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  padding: true,
  margin: true,
});

const meta: Meta<typeof VerticalMenuItem> = {
  title: "Vertical Menu Item",
  component: VerticalMenuItem,
  tags: ["hideInSidebar"],
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof VerticalMenuItem>;

export const Default: Story = {
  args: {
    children: [],
  },
};
