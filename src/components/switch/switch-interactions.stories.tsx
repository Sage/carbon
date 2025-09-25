import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Box from "../box";
import Switch from ".";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof Switch>;

export default {
  title: "Switch/Interactions",
  component: Switch,
  argTypes: {},
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

const SwitchFocus = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <>
      <Switch
        label="Default"
        name="switch-name"
        data-role="target"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        mb={2}
        ml={2}
      />
      <Switch
        label="Warning"
        name="switch-warning"
        data-role="target"
        warning="Warning"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        mb={2}
        ml={2}
      />
      <Switch
        label="Error"
        name="switch-error"
        data-role="target"
        error="Error"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        mb={2}
        ml={2}
      />
      <CarbonProvider validationRedesignOptIn>
        <Switch
          name="switch-error"
          data-role="target"
          warning="Warning"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          mb={2}
          ml={2}
        />
        <Switch
          name="switch-error"
          data-role="target"
          error="Error"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          mb={2}
          ml={2}
        />

        <Box padding={1} backgroundColor="#000000">
          <Switch
            label="Default"
            data-role="target"
            isDarkBackground
            mb={2}
            ml={1}
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <Switch
            data-role="target"
            isDarkBackground
            warning="Warning"
            mb={2}
            ml={1}
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <Switch
            data-role="target"
            isDarkBackground
            error="Error"
            mb={2}
            ml={1}
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
        </Box>
      </CarbonProvider>
    </>
  );
};

export const HoverAndFocus: Story = {
  render: (args) => <SwitchFocus {...args} />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const newSwitch = canvas.getAllByRole("switch");

    await userEvent.click(newSwitch[0]);
    await userEvent.hover(newSwitch[1]);
    await userEvent.hover(newSwitch[2]);
    await expect(newSwitch[0]).toBeChecked();
    await expect(newSwitch[1]).toBeChecked();
    await expect(newSwitch[2]).toBeChecked();
    await expect(newSwitch[3]).toBeChecked();
    await expect(newSwitch[4]).toBeChecked();
    await expect(newSwitch[5]).toBeChecked();
    await expect(newSwitch[6]).toBeChecked();
    await expect(newSwitch[7]).toBeChecked();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
HoverAndFocus.storyName = "Hover and Focus";
HoverAndFocus.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
  pseudo: {
    focus: '[data-role="target"] input',
  },
};
