import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import NextBox from ".";

const meta: Meta<typeof NextBox> = {
  title: "NextBox",
  component: NextBox,
};

export default meta;
type Story = StoryObj<typeof NextBox>;

export const TestSpacing: Story = () => {
  return (
    <NextBox m="3" p="3">
      Dip's Box Here
    </NextBox>
  );
};
TestSpacing.storyName = "TestSpacing";
