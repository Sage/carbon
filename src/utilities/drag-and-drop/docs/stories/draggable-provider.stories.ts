import type { Meta, StoryObj } from "@storybook/react";

import { DraggableProvider } from "../..";

const meta = {
  title: "Utilities/Drag and Drop/DraggableProvider",
  component: DraggableProvider,
  tags: ["!autodocs", "!dev"],
} satisfies Meta<typeof DraggableProvider>;

export default meta;
type Story = StoryObj<typeof DraggableProvider>;

export const Default: Story = {};
