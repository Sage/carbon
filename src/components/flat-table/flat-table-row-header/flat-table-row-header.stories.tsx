import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import FlatTableRowHeader from "./flat-table-row-header.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps(
  {
    spacing: true,
  },
  { py: "10px", px: 3 },
);

const meta: Meta<typeof FlatTableRowHeader> = {
  title: "Flat Table Row Header",
  component: FlatTableRowHeader,
  tags: ["!dev"],
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof FlatTableRowHeader>;

export const Default: Story = {
  args: {
    children: [],
  },
};
