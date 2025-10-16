import React from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

import PopoverContainer from "./popover-container.component";
import Box from "../box";

type Story = StoryObj<typeof PopoverContainer>;

export default {
  title: "Popover Container/Interactions",
  parameters: {
    info: { disable: true },
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

export const KeyboardInteraction: Story = {
  render: () => (
    <>
      <Box height={120} display="flex">
        <PopoverContainer
          title="Default"
          position="center"
          data-role="target"
          disableAnimation
        >
          Content1
        </PopoverContainer>
      </Box>
      <Box height={120} display="flex">
        <PopoverContainer title="Offset" position="center" offset={10} open>
          Content
        </PopoverContainer>
      </Box>
      <Box height={120} display="flex">
        <PopoverContainer
          title="Border Radius"
          position="center"
          borderRadius="borderRadius000 borderRadius000 borderRadius400 borderRadius400"
          open
        >
          Content
        </PopoverContainer>
      </Box>
    </>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const popoverButton = canvas.getAllByRole("button");

    await userEvent.click(popoverButton[0]);
    await expect(
      await within(document.body).findByText("Content1"),
    ).toBeVisible();
    await userEvent.click(popoverButton[0]);
    await userEvent.keyboard("{Enter}");
    await expect(
      await within(document.body).findByText("Content1"),
    ).toBeVisible();
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await userEvent.type(popoverButton[0], "{space}");
    await expect(
      await within(document.body).findByText("Content1"),
    ).toBeVisible();
    await userEvent.tab();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
KeyboardInteraction.storyName = "Keyboard Interactions";

export const CoverButtonFocusTrap: Story = {
  render: () => (
    <PopoverContainer
      title="Cover Button"
      position="center"
      shouldCoverButton
      disableAnimation
    >
      Content
    </PopoverContainer>
  ),
  play: async () => {
    if (!allowInteractions()) {
      return;
    }
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await userEvent.tab();
    await userEvent.tab();
    await expect(
      await within(document.body).findByText("Content"),
    ).toBeVisible();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
CoverButtonFocusTrap.storyName = "Cover Button Focus";
