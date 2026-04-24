import React, { useEffect, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import Message from ".";
import Button from "../button/__next__";
import Box from "../box";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Message> = {
  title: "Message",
  component: Message,
  parameters: {
    chromatic: { disableSnapshot: true },
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
  const [isOpenError, setIsOpenError] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpenError) {
      messageRef.current?.focus();
    }
  }, [isOpenError]);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {!isOpenError && (
        <Button onClick={() => setIsOpenError(true)}>Open Error Message</Button>
      )}
      <Message
        open={isOpenError}
        ref={messageRef}
        onDismiss={() => setIsOpenError(false)}
        variant="error"
      >
        Some custom message
      </Message>

      {!isOpenSuccess && (
        <Button onClick={() => setIsOpenSuccess(true)}>
          Open Success Message
        </Button>
      )}
      <div aria-live="polite">
        <Message
          open={isOpenSuccess}
          onDismiss={() => setIsOpenSuccess(false)}
          variant="success"
        >
          Some custom message
        </Message>
      </div>
    </Box>
  );
};
ProgrammaticFocus.storyName = "Programmatic Focus";

export const WithTitle: Story = {
  ...Default,
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
  parameters: {
    chromatic: { disableSnapshot: false },
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
  parameters: {
    chromatic: { disableSnapshot: false },
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
  parameters: { chromatic: { disableSnapshot: false } },
};
