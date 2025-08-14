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
      <Checkbox mb={4} label="Small" size="small" required />
      <Checkbox mb={4} label="Large" size="large" required />
      <Checkbox
        mb={4}
        label="Info Small"
        size="small"
        info="Info"
        tooltipPosition="right"
      />
      <Checkbox
        mb={4}
        label="Info Large"
        size="large"
        info="Info"
        tooltipPosition="right"
      />
      <Checkbox
        mb={4}
        label="Warning Small"
        size="small"
        warning="Warning"
        tooltipPosition="right"
      />
      <Checkbox
        mb={4}
        label="Warning Large"
        size="large"
        warning="Warning"
        tooltipPosition="right"
      />
      <Checkbox
        mb={4}
        label="Error Small"
        size="small"
        error="Error"
        tooltipPosition="right"
      />
      <Checkbox
        mb={4}
        label="Error Large"
        size="large"
        error="Error"
        tooltipPosition="right"
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
    await userEvent.hover(checkbox[4]);
    await userEvent.hover(checkbox[5]);
    await userEvent.hover(checkbox[6]);
    await userEvent.hover(checkbox[7]);
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
    hover: 'input[type="checkbox"]',
  },
};

export const clickAndKeyInteraction: Story = {
  render: () => (
    <>
      <Checkbox mb={2} label="Small" size="small" />
      <Checkbox mb={2} label="Large" size="large" />
      <Checkbox mb={2} label="Default" disabled />
      <Checkbox mb={2} label="Small" size="small" />
      <Checkbox mb={2} label="Large" size="large" />
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
    await userEvent.click(checkbox[1]);
    await userInteractionPause(500);
    await userEvent.keyboard("{Tab}");
    await userInteractionPause(500);
    await userEvent.type(checkbox[3], "{Space}");
    await userInteractionPause(500);
    await userEvent.keyboard("{Tab}");
    await userInteractionPause(500);
    await userEvent.type(checkbox[4], "{Space}");
    await expect(checkbox[0]).toBeChecked();
    await expect(checkbox[1]).toBeChecked();
    await expect(checkbox[3]).toBeChecked();
    await expect(checkbox[4]).toBeChecked();
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
