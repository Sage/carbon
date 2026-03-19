import React from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect, waitFor } from "storybook/test";

import Dialog from ".";
import Textbox from "../textbox";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

export default {
  title: "Dialog/Interactions",
  component: Dialog,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: { disableSnapshot: true },
  },
};

type Story = StoryObj<typeof Dialog>;

export const FocusTrap: Story = {
  render: () => (
    <Dialog open title="My dialog" onCancel={() => {}}>
      <Textbox onChange={() => {}} label="Textbox1" value="" />
      <Textbox onChange={() => {}} label="Textbox2" value="" />
      <Textbox onChange={() => {}} label="Textbox3" value="" />
    </Dialog>
  ),
  play: async () => {
    if (!allowInteractions()) {
      return;
    }

    const body = within(document.body);
    const closeButton = body.getByRole("button", { name: "Close" });
    const textbox3 = body.getByLabelText("Textbox3");

    await body.findByRole("dialog");

    await waitFor(() =>
      expect(body.getByRole("dialog").contains(document.activeElement)).toBe(
        true,
      ),
    );

    await userEvent.click(textbox3);
    await expect(textbox3).toHaveFocus();
    await userEvent.tab();
    await waitFor(() => expect(closeButton).toHaveFocus());
    await expect(closeButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    await waitFor(() => expect(textbox3).toHaveFocus());
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
FocusTrap.storyName = "Focus Trap";
