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

const OpenAndCloseDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        data-role="dialog-trigger"
        onClick={() => setOpen(true)}
        ref={triggerRef}
      >
        Open Dialog
      </Button>

      <Dialog
        open={open}
        onCancel={() => setOpen(false)}
        title="Title"
        subtitle="Subtitle"
        showCloseIcon
      >
        <Form
          stickyFooter
          leftSideButtons={
            <Button
              data-role="close-dialog-button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
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

          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
        </Form>
      </Dialog>
    </>
  );
};

const FocusManagementDemo: React.FC = () => {
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
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
        </Form>
      </Dialog>
    </>
  );
};

const DialogRestoreFocusDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        data-role="trigger-button"
      >
        Open Dialog
      </Button>

      <Dialog
        open={open}
        onCancel={() => setOpen(false)}
        title="Restore Focus Dialog"
        showCloseIcon
        restoreFocusOnClose
      >
        <p>This dialog will restore focus on close.</p>
        <Button data-role="close-inside" onClick={() => setOpen(false)}>
          Close Dialog
        </Button>
      </Dialog>
    </>
  );
};

export const OpenAndCloseDialog: Story = {
  render: () => <OpenAndCloseDemo />,

  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const portal = within(canvasElement.ownerDocument.body);

    const openButton = canvas.getByTestId("dialog-trigger");
    await userEvent.click(openButton);
    await userInteractionPause(300);

    const dialog = portal.getByRole("dialog");
    expect(dialog).toBeVisible();

    const closeButton = portal.getByTestId("close-dialog-button");
    await userEvent.click(closeButton);
    await userInteractionPause(300);

    expect(portal.queryByRole("dialog")).not.toBeInTheDocument();
    expect(openButton).toHaveFocus();
  },
};

export const FocusManagement: Story = {
  render: () => <FocusManagementDemo />,

  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const portal = within(canvasElement.ownerDocument.body);

    const openButton = canvas.getByTestId("open-dialog-btn");
    await userEvent.click(openButton);
    await userInteractionPause(300);

    const dialog = portal.getByRole("dialog");
    const closeButton = within(dialog).getByRole("button", { name: /close/i });

    for (let i = 0; i < 12; i++) {
      if (canvasElement.ownerDocument.activeElement === closeButton) break;
      await userEvent.tab();
      await userInteractionPause(10);
    }
    expect(closeButton).toHaveFocus();

    const firstInput = within(dialog).getByLabelText(/first name/i);
    await userEvent.tab();
    await userInteractionPause(10);
    for (
      let i = 0;
      i < 12 && canvasElement.ownerDocument.activeElement !== firstInput;
      i++
    ) {
      await userEvent.tab();
      await userInteractionPause(5);
    }
    expect(firstInput).toHaveFocus();

    const cancelBtn = within(dialog).getByRole("button", { name: /^cancel$/i });
    const saveBtn = within(dialog).getByRole("button", { name: /^save$/i });

    for (let i = 0; i < 50; i++) {
      if (canvasElement.ownerDocument.activeElement === cancelBtn) break;
      await userEvent.tab();
      await userInteractionPause(5);
    }
    expect(cancelBtn).toHaveFocus();

    await userEvent.tab();
    await userInteractionPause(10);
    expect(saveBtn).toHaveFocus();

    await userEvent.tab();
    await userInteractionPause(10);
    expect(closeButton).toHaveFocus();

    await userEvent.tab({ shift: true });
    await userInteractionPause(10);
    expect(saveBtn).toHaveFocus();

    await userEvent.tab({ shift: true });
    await userInteractionPause(10);
    expect(cancelBtn).toHaveFocus();

    await userEvent.click(cancelBtn);
    await userInteractionPause(300);

    expect(portal.queryByRole("dialog")).not.toBeInTheDocument();
  },
};

export const DialogRestoreFocus: Story = {
  render: () => <DialogRestoreFocusDemo />,

  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const portal = within(canvasElement.ownerDocument.body);

    const triggerButton = canvas.getByTestId("trigger-button");
    await userEvent.click(triggerButton);
    await userInteractionPause(300);

    portal.getByRole("dialog");

    const closeInsideButton = portal.getByTestId("close-inside");
    await userEvent.click(closeInsideButton);
    await userInteractionPause(300);

    expect(portal.queryByRole("dialog")).not.toBeInTheDocument();
    expect(triggerButton).toHaveFocus();
  },
};
