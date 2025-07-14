import { Meta, StoryObj } from "@storybook/react-vite";
import Dd from "./dd.component";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps(
  {
    spacing: true,
  },
  { mb: 2 },
);

const meta: Meta<typeof Dd> = {
  title: "Dd",
  component: Dd,
  tags: ["!dev"],
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Dd>;

export const Default: Story = {
  args: {
    children: [],
  },
};
