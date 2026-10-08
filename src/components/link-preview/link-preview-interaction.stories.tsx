import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect, userEvent } from "storybook/test";

import LinkPreview from ".";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

const meta: Meta<typeof LinkPreview> = {
  title: "Link Preview/Interactions",
  component: LinkPreview,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};
export default meta;
type Story = StoryObj<typeof LinkPreview>;

export const FocusAndHover: Story = {
  render: () => (
    <LinkPreview
      title="Title"
      url="https://carbon.sage.com"
      description="Description"
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const link = canvas.getByRole("link");

    await userEvent.tab();
    await expect(link).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
  parameters: {
    pseudo: {
      hover: "a",
    },
  },
};

export const CloseButtonFocus: Story = {
  render: () => (
    <LinkPreview
      title="Title"
      url="https://carbon.sage.com"
      description="Description"
      as="div"
      onClose={() => {}}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
