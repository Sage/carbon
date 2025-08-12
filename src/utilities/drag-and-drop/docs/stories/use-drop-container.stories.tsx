import type { Meta, StoryObj } from "@storybook/react";

import UseDropContainerDemo from "./use-drop-container-demo";

const meta = {
  title: "Utilities/Drag and Drop/useDropContainer",
  component: UseDropContainerDemo,
  tags: ["!autodocs", "!dev"],
} satisfies Meta<typeof UseDropContainerDemo>;

export default meta;
type Story = StoryObj<typeof UseDropContainerDemo>;

export const Default: Story = {};
