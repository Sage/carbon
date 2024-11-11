import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import CarbonProvider from ".";
import Button from "../button";
import { sageTheme, baseTheme, noTheme } from "../../style/themes";

const meta: Meta<typeof CarbonProvider> = {
  title: "Carbon Provider/Test",
  component: CarbonProvider,
  argTypes: {
    theme: {
      control: false,
    },
    validationRedesignOptIn: {
      control: false,
    },
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof CarbonProvider>;

export const AllThemes: Story = {
  render: () => {
    const themes = [sageTheme, baseTheme, noTheme];

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
  },
  name: "all themes",
};
