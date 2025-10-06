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
        Margin and Padding String
      </DipsBox>

      <DipsBox m={3} p={3}>
        Margin and Padding Number
      </DipsBox>

      <DipsBox ml={3} pt={3}>
        Margin Left and Padding Top Number
      </DipsBox>

      <DipsBox ml="9px" pt="33px">
        Margin Left and Padding Top String
      </DipsBox>

      <DipsBox ml="XS" pt="L">
        Margin Left and Padding Top String
      </DipsBox>
    </>
  );
};
Spacing.storyName = "Spacing";
