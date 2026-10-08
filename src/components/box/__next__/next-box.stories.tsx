import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import NextBox from ".";

const meta: Meta<typeof NextBox> = {
  title: "NextBox",
  component: NextBox,
};

export default meta;
type Story = StoryObj<typeof NextBox>;

export const Spacing: Story = () => {
  return (
    <>
      <NextBox m="3px" p="3px">
        CSS string values
      </NextBox>

      <NextBox m={24} p={24}>
        Approved spacing token value (24px)
      </NextBox>

      <NextBox ml={80} pt={8}>
        Approved side-specific token values (80px and 8px)
      </NextBox>

      <NextBox p="3xs" pb="none">
        Spacing token aliases (3xs and none)
      </NextBox>

      <NextBox ml="calc(100% - 24px)" pt="33px">
        Granular CSS string values
      </NextBox>

      <NextBox ml="var(--spacing300)" pt="var(--spacing600)">
        CSS variable values
      </NextBox>

      <NextBox m={3} p={3}>
        Legacy numeric index (temporary compatibility; see migration guidance)
      </NextBox>
    </>
  );
};
Spacing.storyName = "Spacing";

export const Flexbox: Story = () => {
  return (
    <>
      <NextBox m="3px" p="3px" justifyContent="center" alignItems="center">
        AlignItems
      </NextBox>

      <NextBox
        m="3px"
        p="3px"
        justifyContent="space-between"
        alignItems="center"
      >
        JustifyContent
      </NextBox>

      <NextBox m="3px" p="3px" flexDirection="column" alignItems="center">
        FlexDirection
      </NextBox>

      <NextBox m="3px" p="3px" flexWrap="wrap" width="200px">
        FlexWrap
      </NextBox>

      <NextBox m="3px" p="3px" flexGrow="1">
        FlexGrow
      </NextBox>

      <NextBox m="3px" p="3px" flexShrink="1" width="200px">
        FlexShrink
      </NextBox>

      <NextBox m="3px" p="3px" flexBasis="100px">
        FlexBasis
      </NextBox>
    </>
  );
};
Flexbox.storyName = "Flexbox";

export const Layout: Story = () => {
  return (
    <>
      <NextBox m="3px" p="3px" width="300px" height="50px">
        Width and Height
      </NextBox>

      <NextBox m="3px" p="3px" maxWidth="400px" height="50px">
        Max Width
      </NextBox>

      <NextBox m="3px" p="3px" minWidth="200px" height="50px">
        Min Width
      </NextBox>
    </>
  );
};
Layout.storyName = "Layout";
