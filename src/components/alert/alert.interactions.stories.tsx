import React, { useState, useRef } from "react";
import { StoryObj, StoryFn } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import Alert from ".";
import Box from "../box";
import Button from "../button";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";

type Story = StoryObj<typeof Alert>;

export default {
  title: "Alert/Interactions",
  component: Alert,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [
    (StoryToRender: StoryFn) => (
      <DefaultDecorator>
        <Box mb="150px">
          <StoryToRender />
        </Box>
      </DefaultDecorator>
    ),
  ],
} as const;

export const ClickToOpen: Story = {
  render: () => {
    const Wrapper = () => {
      const [open, setOpen] = useState(false);
      const onCancel = () => setOpen(false);
      return (
        <>
          <Button onClick={() => setOpen(true)} aria-label="Open Alert">
            Open Alert
          </Button>
          <Alert
            open={open}
            onCancel={onCancel}
            aria-labelledby="open-alert-title"
            closeButtonDataProps={{ "data-element": "close" }}
          >
            <h2 id="open-alert-title">Title</h2>
            <p>This is an example of an alert</p>
          </Alert>
        </>
      );
    };
    return <Wrapper />;
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /open alert/i }));
    await userInteractionPause(200);
    const portal = within(canvasElement.ownerDocument.body);
    expect(
      await portal.findByRole("alertdialog", { name: /title/i }),
    ).toBeInTheDocument();
  },
};

export const FocusManagement: Story = {
  render: () => {
    const Wrapper = () => {
      const [open, setOpen] = useState(false);
      const openerRef = useRef<HTMLButtonElement | null>(null);
      const onCancel = () => {
        setOpen(false);
        openerRef.current?.focus();
      };
      return (
        <>
          <Button ref={openerRef} onClick={() => setOpen(true)}>
            Launch Alert
          </Button>
          <Alert
            open={open}
            onCancel={onCancel}
            aria-labelledby="focus-title"
            closeButtonDataProps={{ "data-element": "close" }}
          >
            <h2 id="focus-title">Title</h2>
            <p>This is an example of an alert</p>
            <Button data-element="close">Close</Button>
          </Alert>
        </>
      );
    };
    return <Wrapper />;
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole("button", { name: /launch alert/i }),
    );
    await userInteractionPause(200);
    const portal = within(canvasElement.ownerDocument.body);
    const dialog = await portal.findByRole("alertdialog", { name: /title/i });
    expect(dialog).toBeInTheDocument();
    await userEvent.tab();
    await userInteractionPause(50);
    await userEvent.tab();
    await userInteractionPause(50);
    expect(
      portal.getByRole("alertdialog", { name: /focus check/i }),
    ).toBeInTheDocument();
  },
};
