import { Meta, StoryObj } from "@storybook/react-vite";
import Option from "./option.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof Option> = {
  title: "Select/Option",
  component: Option,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Option>;

export const Default: Story = {
  args: {
    children: [],
  },
};
