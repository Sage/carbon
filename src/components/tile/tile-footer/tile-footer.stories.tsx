import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import TileFooter from "./tile-footer.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const styledSystemProps = generateStyledSystemProps({
  padding: true,
});

const meta: Meta<typeof TileFooter> = {
  title: "Tile Footer",
  component: TileFooter,
  tags: ["!dev"],
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof TileFooter>;

export const Default: Story = {
  args: {
    children: [],
  },
};
