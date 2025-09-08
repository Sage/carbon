import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect, waitFor } from "@storybook/test";
import Dialog from ".";
import Button from "../button";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";

type Story = StoryObj<typeof Dialog>;

export default {
  title: "Dialog/Interactions",
  component: Dialog,
  parameters: {
    layout: "padded",
    chromatic: { disableSnapshot: true },
  },
  decorators: [],
};

export const FocusManagement: Story = {
  render: function FocusManagementRender() {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)} data-role="open-dialog-btn">
          Open Dialog
        </Button>
        <Dialog
          open={isOpen}
          title="Title"
          subtitle="Subtitle"
          onCancel={() => setIsOpen(false)}
          showCloseIcon
        >
          <p>Content</p>
        </Dialog>
      </>
    );
  },

  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const portal = within(canvasElement.ownerDocument.body);

    const openButton = canvas.getByRole("button", { name: /open dialog/i });

    openButton.focus();
    await waitFor(() => expect(openButton).toHaveFocus());

    await userEvent.click(openButton);

    const closeButton = await portal.findByRole("button", { name: /close/i });
    await waitFor(() => expect(closeButton).toBeVisible());

    await userEvent.tab();
    await new Promise((resolve) => setTimeout(resolve, 200));

    closeButton.focus();
  },
};

FocusManagement.storyName = "Focus Management";
FocusManagement.parameters = {
  themeProvider: {
    chromatic: { theme: "sage" },
  },
};
