import { Meta, StoryObj } from "@storybook/react-vite";
import MenuSegmentTitle from "./menu-segment-title.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof MenuSegmentTitle> = {
  title: "Menu Segment Title",
  component: MenuSegmentTitle,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof MenuSegmentTitle>;

export const Default: Story = {
  args: {},
};
