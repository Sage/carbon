import React from "react";

import aegeanTheme from "../../style/themes/aegean";
import baseTheme from "../../style/themes/base";
import sageTheme from "../../style/themes/sage";
import Box from "../box";
import Button from "../button";
import CarbonProvider from ".";

export const Default = () => {
  return (
    <CarbonProvider>
      <Button buttonType="primary">Button</Button>
    </CarbonProvider>
  );
};

export const Theming = () => {
  return (
    <CarbonProvider theme={aegeanTheme}>
      <Button buttonType="primary">Button</Button>
    </CarbonProvider>
  );
};

export const Mixing = () => {
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
