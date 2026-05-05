import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import Switch from "./switch.component";

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
        label="Large"
        name="switch-large"
        data-role="target"
        checked={isChecked}
        size="large"
        onChange={(e) => setIsChecked(e.target.checked)}
        mb={2}
        ml={2}
      />
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
