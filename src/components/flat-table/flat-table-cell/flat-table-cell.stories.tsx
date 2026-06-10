import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import FlatTableCell from "./flat-table-cell.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof FlatTableCell> = {
  title: "Flat Table Cell",
  component: FlatTableCell,
  tags: ["!dev"],
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof FlatTableCell>;

export const Default: Story = {
  args: {
    children: [],
  },
};
