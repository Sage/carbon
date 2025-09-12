import React from "react";

import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import { Checkbox } from ".";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";

type Story = StoryObj<typeof Checkbox>;

export default {
  title: "Checkbox/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const hoverCheckbox: Story = {
  render: () => (
    <>
      <Checkbox mb={4} label="Small" required data-testid="target" />
      <Checkbox
        mb={4}
        label="Info"
        info="Info"
        tooltipPosition="right"
        data-testid="target"
      />
      <Checkbox
        mb={4}
        label="Warning"
        warning="Warning"
        tooltipPosition="right"
        data-testid="target"
      />
      <Checkbox
        mb={4}
        label="Error"
        error="Error"
        tooltipPosition="right"
        data-testid="target"
      />
    </>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const checkbox = canvas.getAllByRole("checkbox");
    await userEvent.hover(checkbox[0]);
    await userEvent.hover(checkbox[1]);
    await userEvent.hover(checkbox[2]);
    await userEvent.hover(checkbox[3]);
    await userInteractionPause(1000);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
hoverCheckbox.storyName = "Hover";
hoverCheckbox.parameters = {
  pseudo: {
    hover: '[data-testid="target"]',
  },
};

export const clickAndKeyInteraction: Story = {
  render: () => (
    <>
      <Checkbox mb={2} label="Small" />
      <Checkbox mb={2} label="Default" disabled />
      <Checkbox mb={2} label="Small" />
    </>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const checkbox = canvas.getAllByRole("checkbox");
    await userEvent.click(checkbox[0]);
    await userInteractionPause(500);
    await userEvent.keyboard("{Tab}");
    await userInteractionPause(500);
    await userEvent.type(checkbox[2], "{Space}");
    await userInteractionPause(500);
    await expect(checkbox[0]).toBeChecked();
    await expect(checkbox[2]).toBeChecked();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
clickAndKeyInteraction.storyName = "onClick/Keyboard Interaction";
