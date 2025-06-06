import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import Button from "../button";
import CarbonProvider from ".";
import { sageTheme } from "../../style/themes";

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
