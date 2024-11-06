import { Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import FlatTableHeader from "./flat-table-header.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps(
  {
    spacing: true,
  },
  { py: 1, px: 3 },
);

const meta: Meta<typeof FlatTableHeader> = {
  title: "Flat Table Header",
  component: FlatTableHeader,
  tags: ["hideInSidebar"],
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof FlatTableHeader>;

export const Default: Story = {
  args: {
    children: [],
  },
};
