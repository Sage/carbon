import React from "react";
import type { ComponentMeta, StoryFn } from "@storybook/react";

import CarbonProvider from ".";
import Button from "../button";
import { sageTheme, mintTheme, baseTheme, noTheme } from "../../style/themes";

export default {
  title: "Carbon Provider/Test",
  component: CarbonProvider,
  argTypes: {
    theme: {
      control: false,
    },
    validationRedesignOptIn: {
      control: false,
    },
    roundedCornersOptOut: {
      control: false,
    },
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
} as ComponentMeta<typeof CarbonProvider>;

export const AllThemes: StoryFn = () => {
  const themes = [sageTheme, mintTheme, baseTheme, noTheme];

  return (
    <>
      {themes.map((theme) => (
        <React.Fragment key={theme.name}>
          <h3>{theme.name}</h3>
          <CarbonProvider theme={theme}>
            <Button buttonType="primary">Button</Button>
          </CarbonProvider>
        </React.Fragment>
      ))}
    </>
  );
};
AllThemes.storyName = "all themes";
