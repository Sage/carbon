import React from "react";
import type { StoryFn } from "@storybook/react";

import Button from "../button";
import CarbonProvider from ".";
import { sageTheme } from "../../style/themes";

const SageTheme: StoryFn = () => (
  <CarbonProvider theme={sageTheme}>
    <Button buttonType="primary">Button</Button>
  </CarbonProvider>
);
SageTheme.storyName = "using latest sage theme";

export default SageTheme;
