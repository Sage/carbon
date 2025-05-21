import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DipsBox from ".";

const meta: Meta<typeof DipsBox> = {
  title: "DipsBox/Test",
  component: DipsBox,
};
export default meta;

type Story = StoryObj<typeof DipsBox>;

export const Spacing: Story = {
  render: () => (
    <DipsBox m="3px" p="3px">
      Dip's Box Here
    </DipsBox>
  ),
  name: "Spacing",
};
