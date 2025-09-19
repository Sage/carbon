import React, { useRef, useState } from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import Dialog from ".";
import Button from "../button";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import Typography from "../typography";
import Textbox from "../textbox";
import Form from "../form";

type Story = StoryObj<typeof Dialog>;

export default {
  title: "Dialog/Interactions",
  component: Dialog,
  parameters: { layout: "padded" },
  decorators: [],
};

export const FocusManagement: Story = {
  render: function FocusManagementRender() {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
      <>
        <Button
          ref={buttonRef}
          onClick={() => setIsOpen(true)}
          data-role="open-dialog-btn"
        >
          Open Dialog
        </Button>

        <Dialog
          open={isOpen}
          title="Title"
          subtitle="Subtitle"
          onCancel={() => setIsOpen(false)}
          showCloseIcon
          focusFirstElement={buttonRef}
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
            <Typography>
              This is an example of a dialog with a Form as content
            </Typography>

            <Textbox label="First Name" value="" onChange={() => {}} />
            <Textbox label="Middle Name" value="" onChange={() => {}} />
            <Textbox label="Surname" value="" onChange={() => {}} />
            <Textbox label="Birth Place" value="" onChange={() => {}} />
            <Textbox label="Favourite Colour" value="" onChange={() => {}} />
            <Textbox label="Address" value="" onChange={() => {}} />
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
    await userInteractionPause(300);

    const dialog = portal.getByRole("dialog");

    await userEvent.tab();
    await userInteractionPause(50);
    await userEvent.tab();
    await userInteractionPause(50);

    const firstInput = within(dialog).getByLabelText(/first name/i);
    await userEvent.type(firstInput, "Jane Doe", { delay: 30 });
    await userInteractionPause(100);

    await userEvent.tab();
    await userInteractionPause(50);
    await userEvent.tab();
    await userInteractionPause(50);

    const closeIcon = within(dialog).getByRole("button", { name: /close/i });
    await userEvent.click(closeIcon);
    await userInteractionPause(150);

    expect(openButton).toHaveFocus();
  },
};
