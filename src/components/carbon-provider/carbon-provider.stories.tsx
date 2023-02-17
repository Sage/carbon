import React from "react";
import { ComponentStory } from "@storybook/react";

import aegeanTheme from "../../style/themes/aegean";
import baseTheme from "../../style/themes/base";
import sageTheme from "../../style/themes/sage";
import Box from "../box";
import Button from "../button";
import CarbonProvider from ".";

export const Default: ComponentStory<typeof CarbonProvider> = () => {
  return (
    <CarbonProvider>
      <Button buttonType="primary">Button</Button>
    </CarbonProvider>
  );
};

export const Theming: ComponentStory<typeof CarbonProvider> = () => {
  return (
    <CarbonProvider theme={aegeanTheme}>
      <Button buttonType="primary">Button</Button>
    </CarbonProvider>
  );
};

export const Mixing: ComponentStory<typeof CarbonProvider> = () => {
  return (
    <Box>
      <CarbonProvider>
        <Button buttonType="primary">Button</Button>
      </CarbonProvider>
      <CarbonProvider theme={aegeanTheme}>
        <Button buttonType="primary">Button</Button>
        <CarbonProvider theme={baseTheme}>
          <Button buttonType="primary">Button</Button>
        </CarbonProvider>
      </CarbonProvider>
      <CarbonProvider theme={sageTheme}>
        <Button buttonType="primary">Button</Button>
      </CarbonProvider>
    </Box>
  );
};
