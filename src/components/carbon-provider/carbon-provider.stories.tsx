import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Button from "../button";
import CarbonProvider from ".";
import { sageTheme, mintTheme } from "../../style/themes";

const meta: Meta<typeof CarbonProvider> = {
  title: "Carbon Provider",
  component: CarbonProvider,
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;
type Story = StoryObj<typeof CarbonProvider>;

export const SageTheme: Story = () => {
  return (
    <CarbonProvider theme={sageTheme}>
      <Button buttonType="primary">Button</Button>
    </CarbonProvider>
  );
};
SageTheme.storyName = "Using Latest Sage Theme";

export const MintTheme: Story = () => {
  return (
    <CarbonProvider theme={mintTheme}>
      <Button buttonType="primary">Button</Button>
    </CarbonProvider>
  );
};
MintTheme.storyName = "Using Mint Theme";
