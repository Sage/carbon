import React, { useEffect, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import styled from "styled-components";
import { useArgs } from "storybook/preview-api";

import Message from ".";
import Button from "../button/__next__";
import Box from "../box";
import Link from "../link";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const ErrorSummaryList = styled.ul<{ $size: "medium" | "large" }>`
  display: flex;
  flex-direction: column;
  gap: ${({ $size }) =>
    $size === "large"
      ? "var(--global-space-comp-xs)"
      : "var(--global-space-comp-2-xs)"};
  list-style: none;
  margin: 0;
  padding: 0;
`;

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

const PlaygroundMessage = (args: MessageStoryArgs) => {
  const [, updateArgs] = useArgs<MessageStoryArgs>();
  const { dismissible, ...messageArgs } = args;

  return (
    <Message
      {...messageArgs}
      onDismiss={
        dismissible
          ? () => {
              updateArgs({ open: false });
            }
          : undefined
      }
    >
      {messageArgs.children}
    </Message>
  );
};

export const Playground: Story = {
  render: (args) => <PlaygroundMessage {...args} />,
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
export const ErrorSummary: Story = {
  render: () => (
    <>
      <Message
        variant="error"
        title="There is a problem"
        size="medium"
        mb="var(--global-space-layout-xs)"
      >
        <ErrorSummaryList role="list" $size="medium">
          <li>
            <Link href="#" linkSize="medium">
              Enter an email address
            </Link>
          </li>
          <li>
            <Link href="#" linkSize="medium">
              Enter a valid telephone number
            </Link>
          </li>
        </ErrorSummaryList>
      </Message>
      <Message variant="error" title="There is a problem" size="large">
        <ErrorSummaryList role="list" $size="large">
          <li>
            <Link href="#" linkSize="large">
              Enter an email address
            </Link>
          </li>
          <li>
            <Link href="#" linkSize="large">
              Enter a valid telephone number
            </Link>
          </li>
        </ErrorSummaryList>
      </Message>
    </>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
};
