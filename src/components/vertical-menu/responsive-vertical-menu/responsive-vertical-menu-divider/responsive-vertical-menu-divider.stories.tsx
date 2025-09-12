import { Meta, StoryObj } from "@storybook/react";

import { ResponsiveVerticalMenuDivider } from "./responsive-vertical-menu-divider.component";
import generateStyledSystemProps from "../../../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof ResponsiveVerticalMenuDivider> = {
  title: "ResponsiveVerticalMenuDivider",
  component: ResponsiveVerticalMenuDivider,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof ResponsiveVerticalMenuDivider>;

export const Default: Story = {
  args: { ...styledSystemProps },
};
