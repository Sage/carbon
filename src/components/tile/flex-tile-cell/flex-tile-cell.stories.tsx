import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import FlexTileCell from "./flex-tile-cell.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps(
  {
    margin: true,
    padding: true,
    flexBox: true,
    spacing: true,
    grid: true,
    layout: true,
    position: true,
  },
  { flexGrow: 1, flexShrink: 0, flexBasis: "160px" },
);

const meta: Meta<typeof FlexTileCell> = {
  title: "Flex Tile Cell",
  component: FlexTileCell,
  tags: ["!dev"],
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof FlexTileCell>;

export const Default: Story = {
  args: {
    children: [],
  },
};
