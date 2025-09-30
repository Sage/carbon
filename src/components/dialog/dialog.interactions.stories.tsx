import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import Dialog from ".";
import Button from "../button";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import Textbox from "../textbox";
import Form from "../form";

type Story = StoryObj<typeof Dialog>;

export default {
  title: "Dialog/Interactions",
  component: Dialog,
  parameters: { layout: "padded" },
  decorators: [],
} as const;

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
          <Form
            stickyFooter
            leftSideButtons={
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            }
            saveButton={
              <Button buttonType="primary" type="submit">
                Save
              </Button>
            }
          >
            <Textbox label="Name" value="" onChange={() => {}} />
          </Form>
        </Dialog>
      </>
    );
  },

  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const portal = within(canvasElement.ownerDocument.body);

    const openButton = canvas.getByRole("button", { name: /open dialog/i });
    await userEvent.click(openButton);

    const dialog = await portal.findByRole("dialog");
    const closeButton = within(dialog).getByRole("button", { name: /close/i });
    const firstInput = within(dialog).getByLabelText(/name/i);

    await expect(dialog).toBeVisible();

    await userEvent.tab();
    await userEvent.tab();

    await expect(firstInput).toHaveFocus();

    await userEvent.tab();
    await userEvent.tab();

    await expect(closeButton).toHaveFocus();
  },
};

FocusManagement.storyName = "Focus Management";
FocusManagement.parameters = {
  chromatic: { disableSnapshot: false },
};
