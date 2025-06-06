import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import TileSelectGroup from "./tile-select-group.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof TileSelectGroup> = {
  title: "Tile Select Group",
  component: TileSelectGroup,
  tags: ["!dev"],
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof TileSelectGroup>;

export const Default: Story = {
  args: {
    children: [],
  },
};
