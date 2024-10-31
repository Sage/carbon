import { Meta, StoryObj } from "@storybook/react";
import Dt from "./dt.component";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps(
  {
    spacing: true,
  },
  { mb: 2, pr: 3 },
);

const meta: Meta<typeof Dt> = {
  title: "Dt",
  component: Dt,
  tags: ["hideInSidebar"],
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Dt>;

export const Default: Story = {
  args: {
    children: [],
  },
};
