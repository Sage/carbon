import { ArgTypes, Meta, StoryObj } from "@storybook/react-vite";
import { MarginProps } from "styled-system";

import { ResponsiveVerticalMenuDivider } from "./responsive-vertical-menu-divider.component";
import generateStyledSystemProps from "../../../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
}) as Partial<ArgTypes<MarginProps>>;

const meta: Meta<typeof ResponsiveVerticalMenuDivider> = {
  title: "ResponsiveVerticalMenuDivider",
  component: ResponsiveVerticalMenuDivider,
  tags: ["!dev"],
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
