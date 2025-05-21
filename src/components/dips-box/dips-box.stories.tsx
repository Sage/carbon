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

export const Flexbox: Story = () => {
  return (
    <>
      <DipsBox m="3px" p="3px" justifyContent="center" alignItems="center">
        AlignItems
      </DipsBox>

      <DipsBox
        m="3px"
        p="3px"
        justifyContent="space-between"
        alignItems="center"
      >
        JustifyContent
      </DipsBox>

      <DipsBox m="3px" p="3px" flexDirection="column" alignItems="center">
        FlexDirection
      </DipsBox>

      <DipsBox m="3px" p="3px" flexWrap="wrap" width="200px">
        FlexWrap
      </DipsBox>

      <DipsBox m="3px" p="3px" flexGrow="1">
        FlexGrow
      </DipsBox>

      <DipsBox m="3px" p="3px" flexShrink="1" width="200px">
        FlexShrink
      </DipsBox>

      <DipsBox m="3px" p="3px" flexBasis="100px">
        FlexBasis
      </DipsBox>
    </>
  );
};
Flexbox.storyName = "Flexbox";

export const Layout: Story = () => {
  return (
    <>
      <DipsBox m="3px" p="3px" width="300px" height="50px">
        Width and Height
      </DipsBox>

      <DipsBox m="3px" p="3px" maxWidth="400px" height="50px">
        Max Width
      </DipsBox>

      <DipsBox m="3px" p="3px" minWidth="200px" height="50px">
        Min Width
      </DipsBox>
    </>
  );
};
Layout.storyName = "Layout";
