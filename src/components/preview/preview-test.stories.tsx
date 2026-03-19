import { Meta, StoryObj } from "@storybook/react-vite";
import Preview from "./preview.component";

const meta: Meta<typeof Preview> = {
  title: "Preview/Test",
  component: Preview,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Preview>;

export const Default: Story = {
  args: {
    children: "Text rendered as children component.",
    lines: 1,
    loading: true,
  },
};
