import { Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import GridContainer from "./grid-container.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof GridContainer> = {
  title: "Grid Container",
  component: GridContainer,
  tags: ["hideInSidebar"],
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof GridContainer>;

export const Default: Story = {
  args: {
    children: [],
  },
};
