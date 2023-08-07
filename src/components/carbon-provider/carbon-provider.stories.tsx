import React from "react";
import type { StoryFn } from "@storybook/react";

import Button from "../button";
import CarbonProvider from ".";
import { sageTheme, mintTheme } from "../../style/themes";

export const SageTheme: StoryFn = () => (
  <CarbonProvider theme={sageTheme}>
    <Button buttonType="primary">Button</Button>
  </CarbonProvider>
);
SageTheme.storyName = "using latest sage theme";

export const MintTheme: StoryFn = () => (
  <CarbonProvider theme={mintTheme}>
    <Button buttonType="primary">Button</Button>
  </CarbonProvider>
);
MintTheme.storyName = "using mint theme";
