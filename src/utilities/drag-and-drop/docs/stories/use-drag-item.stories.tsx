import type { Meta, StoryObj } from "@storybook/react";

import UseDragItemDemo from "./use-drag-item-demo";

const meta = {
  title: "Utilities/Drag and Drop/useDragItem",
  component: UseDragItemDemo,
  tags: ["!autodocs", "!dev"],
} satisfies Meta<typeof UseDragItemDemo>;

export default meta;
type Story = StoryObj<typeof UseDragItemDemo>;

export const Default: Story = {};
