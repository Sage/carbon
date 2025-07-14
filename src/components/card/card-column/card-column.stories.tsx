import { Meta, StoryObj } from "@storybook/react-vite";
import CardColumn from ".";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof CardColumn> = {
  title: "CardColumn",
  component: CardColumn,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof CardColumn>;

export const Default: Story = {
  args: {
    children: [],
  },
};
