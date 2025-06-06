import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import ButtonToggleGroup from ".";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof ButtonToggleGroup> = {
  title: "Button Toggle/Button Toggle Group",
  component: ButtonToggleGroup,
  argTypes: {
    ...styledSystemProps,
  },
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonToggleGroup>;

export const Default: Story = {
  args: {},
};
