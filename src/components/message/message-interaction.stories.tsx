import React, { useEffect, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";

import Message from ".";
import Button from "../button";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";

const meta: Meta<typeof Message> = {
  title: "Message/Interactions",
  component: Message,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof Message>;

const FocusAndTabOrderComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messageRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message
        open={isOpen}
        onDismiss={() => setIsOpen(false)}
        ref={messageRef}
      >
        Some custom message
      </Message>
    </>
  );
};

export const FocusAndTabOrder: Story = {
  render: () => <FocusAndTabOrderComponent />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Open Message" }));

    const messageElement = canvasElement.querySelector(
      'div[data-component="Message"]',
    );

    if (!messageElement) {
      throw new Error("Message element not found");
    }

    await expect(messageElement).toHaveFocus();

    await userEvent.tab();

    await expect(canvas.getByRole("button", { name: "Close" })).toHaveFocus();
  },
};

FocusAndTabOrder.storyName = "focus and tab order";
