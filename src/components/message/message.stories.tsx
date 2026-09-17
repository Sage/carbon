import React, { useEffect, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import Message from ".";
import Button from "../button/__next__";
import Box from "../box";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

type MessageStoryArgs = React.ComponentProps<typeof Message> & {
  dismissible?: boolean;
};

const meta: Meta<MessageStoryArgs> = {
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
type Story = StoryObj<MessageStoryArgs>;

export const Playground: Story = {
  render: ({ dismissible, ...args }) => (
    <Message {...args} onDismiss={dismissible ? () => {} : undefined}>
      {args.children}
    </Message>
  ),
  args: {
    children: "Some custom message",
    variant: "info",
    title: "",
    open: true,
    dismissible: false,
    closeButtonAriaLabel: "Close message",
    width: "100%",
    size: "medium",
  },
  argTypes: {
    dismissible: {
      control: "boolean",
      description: "Render the Message with a dismiss button",
      table: { category: "Story" },
    },
  },
};
Playground.storyName = "Playground";

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
