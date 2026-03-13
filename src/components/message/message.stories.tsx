import React, { useEffect, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import Message from ".";
import Button from "../button";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Message> = {
  title: "Message",
  component: Message,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  argTypes: {
    ...styledSystemProps,
    title: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Message>;

export const Default: Story = {
  render: (args) => <Message {...args}>Some custom message</Message>,
};

export const WithCloseButton: Story = {
  render: (args) => (
    <Message onDismiss={() => {}} {...args}>
      Some custom message
    </Message>
  ),
};

export const ProgrammaticFocus: Story = () => {
  const [isOpen, setIsOpen] = useState(true);
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
        ref={messageRef}
        onDismiss={() => setIsOpen(false)}
        variant="error"
      >
        Some custom message
      </Message>
    </>
  );
};
ProgrammaticFocus.storyName = "Programmatic Focus";

export const WithTitle: Story = {
  render: (args) => <Message {...args}>Some custom message</Message>,
  args: {
    title: "Title",
  },
};

export const Variant: Story = {
  render: (args) => (
    <>
      <Message onDismiss={() => {}} variant="success" title="Success" {...args}>
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="error" title="Error" {...args}>
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="warning" title="Warning" {...args}>
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="info" title="Info" {...args}>
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="ai" title="AI" {...args}>
        Some custom message
      </Message>
    </>
  ),
  args: {
    mb: 2,
  },
};

export const SubtleVariant: Story = {
  render: (args) => (
    <>
      <Message
        onDismiss={() => {}}
        variant="success-subtle"
        title="Success"
        {...args}
      >
        Some custom message
      </Message>
      <Message
        onDismiss={() => {}}
        variant="error-subtle"
        title="Error"
        {...args}
      >
        Some custom message
      </Message>
      <Message
        onDismiss={() => {}}
        variant="warning-subtle"
        title="Warning"
        {...args}
      >
        Some custom message
      </Message>
      <Message
        onDismiss={() => {}}
        variant="info-subtle"
        title="Info"
        {...args}
      >
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="ai-subtle" title="AI" {...args}>
        Some custom message
      </Message>
      <Message
        onDismiss={() => {}}
        variant="callout-subtle"
        title="Callout"
        {...args}
      >
        Some custom message
      </Message>
    </>
  ),
  args: {
    mb: 2,
  },
};

export const SizeLarge: Story = {
  render: (args) => (
    <>
      <Message onDismiss={() => {}} {...args}>
        Some custom message
      </Message>
      <Message onDismiss={() => {}} variant="info-subtle" {...args}>
        Some custom message
      </Message>
    </>
  ),
  args: {
    title: "Large",
    size: "large",
    mb: 2,
  },
};

export const ShowCloseIcon: Story = () => {
  return (
    <Message showCloseIcon={false}>
      A longer custom message which now shows the close icon is not rendered and
      padding is equal on both sides
    </Message>
  );
};
ShowCloseIcon.storyName = "Show Close Icon";
ShowCloseIcon.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Transparent: Story = () => {
  const [isOpen, setIsOpen] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      {!isOpen && (
        <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
          Open Message
        </Button>
      )}
      <Message
        open={isOpen}
        onDismiss={() => {
          setIsOpen(false);
          setTimeout(() => buttonRef.current?.focus(), 0);
        }}
        transparent
      >
        Some custom message
      </Message>
    </>
  );
};
Transparent.storyName = "Transparent";
Transparent.parameters = {
  chromatic: { disableSnapshot: true },
};
