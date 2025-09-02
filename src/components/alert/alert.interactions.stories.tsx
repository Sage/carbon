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
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setIsOpen(true)}>Open Alert</Button>
          <Alert
            onCancel={() => setIsOpen(false)}
            title="Title"
            disableEscKey={false}
            height=""
            subtitle="Subtitle"
            showCloseIcon
            size="extra-small"
            open={isOpen}
          >
            This is an example of an alert
          </Alert>
        </>
      );
    };
    return <Wrapper />;
  },
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /open alert/i });

    await userEvent.click(toggleButton);
    await userInteractionPause(300);

    const portal = within(canvasElement.ownerDocument.body);
    const dialog = await portal.findByRole("alertdialog", { name: /title/i });
    expect(dialog).toBeInTheDocument();
  },
};

export const FocusManagement: Story = {
  render: () => {
    const Wrapper = () => {
      const [isOpen, setIsOpen] = useState(false);
      const openerRef = useRef<HTMLButtonElement | null>(null);

      const onCancel = () => {
        setIsOpen(false);
        openerRef.current?.focus();
      };

      return (
        <>
          <Button ref={openerRef} onClick={() => setIsOpen(true)}>
            Open Alert
          </Button>
          <Alert
            onCancel={onCancel}
            title="Title"
            disableEscKey={false}
            height=""
            subtitle="Subtitle"
            showCloseIcon
            size="extra-small"
            open={isOpen}
          >
            This is an example of an alert
          </Alert>
        </>
      );
    };
    return <Wrapper />;
  },

  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole("button", { name: /open alert/i });

    await userEvent.click(toggleButton);
    await userInteractionPause(300);

    const portal = within(canvasElement.ownerDocument.body);
    const dialog = await portal.findByRole("alertdialog", { name: /title/i });
    expect(dialog).toBeInTheDocument();

    const dialogWithin = within(dialog);
    const closeIconButton = dialogWithin.getByRole("button", {
      name: /close/i,
    });
    expect(closeIconButton).toBeInTheDocument();
  },
};
