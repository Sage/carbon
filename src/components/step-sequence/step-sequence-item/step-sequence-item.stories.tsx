import { Meta, StoryObj } from "@storybook/react-vite";
import StepSequenceItem from "./step-sequence-item.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof StepSequenceItem> = {
  title: "Step Sequence Item",
  component: StepSequenceItem,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof StepSequenceItem>;

export const Default: Story = {
  args: {},
};
