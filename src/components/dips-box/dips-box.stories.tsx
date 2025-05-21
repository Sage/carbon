import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import DipsBox from ".";

const meta: Meta<typeof DipsBox> = {
  title: "DipsBox",
  component: DipsBox,
};

export default meta;
type Story = StoryObj<typeof DipsBox>;

export const Spacing: Story = () => {
  return (
    <>
      <DipsBox m="3px" p="3px">
        Dip's Box Here
      </DipsBox>

      <DipsBox m={3} p={3}>
        Dip's Box Here
      </DipsBox>
    </>
  );
};
Spacing.storyName = "Spacing";
