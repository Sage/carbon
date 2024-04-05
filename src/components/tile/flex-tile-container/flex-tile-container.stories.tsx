import { Meta, StoryObj } from "@storybook/react";
import FlexTileContainer from "./flex-tile-container.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof FlexTileContainer> = {
  title: "Flex Tile Container",
  component: FlexTileContainer,
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof FlexTileContainer>;

export const Default: Story = {
  args: {
    children: [],
  },
};
