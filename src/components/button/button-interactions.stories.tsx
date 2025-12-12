import React from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import Button from "./button.component";
import Box from "../box";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

export default {
  title: "Button/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

type Story = StoryObj<typeof Button>;

export const FocusAndHoverStates: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={1}>
      <Button variantType="primary">Primary</Button>
      <Button variantType="secondary">Secondary</Button>
      <Button variantType="tertiary">Tertiary</Button>
      <Button variantType="subtle">Subtle</Button>
      <Button variantType="primary" variant="destructive">
        Primary Destructive
      </Button>
      <Button variantType="secondary" variant="destructive">
        Secondary Destructive
      </Button>

      <Button variant="gradient">AI Secondary</Button>

      <Button variantType="secondary" size="xs">
        Secondary
      </Button>
      <Button variantType="tertiary" size="xs">
        Tertiary
      </Button>
      <Button variantType="subtle" size="xs">
        Subtle
      </Button>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button");

    for (let i = 0; i < buttons.length; i++) {
      await userEvent.hover(buttons[i]);
      await userEvent.click(buttons[i]);
      await expect(buttons[i]).toHaveFocus();
      if (i < buttons.length - 1) await userEvent.tab();
    }
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
FocusAndHoverStates.storyName = "Focus and Hover States";
FocusAndHoverStates.parameters = {
  pseudo: {
    hover: "[]",
    focus: "[]",
  },
};
