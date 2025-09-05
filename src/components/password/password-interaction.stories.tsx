import React from "react";

import { StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";

import Password from "./password.component";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof Password>;

export default {
  title: "Password/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const FocusTextbox: Story = {
  render: () => (
    <Password label="Password" value="Password" onChange={() => {}} mb={2} />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const showIcon = canvas.getByLabelText("Password");
    await userEvent.click(showIcon);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
FocusTextbox.storyName = "Focus Textbox";

export const FocusButton: Story = {
  render: () => (
    <Password label="Password" value="Password" onChange={() => {}} mb={2} />
  ),
  play: async () => {
    if (!allowInteractions()) {
      return;
    }
    await userEvent.tab();
    await userEvent.keyboard("{Tab}", { delay: 500 });
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
FocusButton.storyName = "Focus Button";

export const ShowPassword: Story = {
  render: () => (
    <Password label="Password" value="Password" onChange={() => {}} mb={2} />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const showIcon = canvas.getByRole("button", { name: "Show password" });
    await userEvent.click(showIcon);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
ShowPassword.storyName = "Show Password";
