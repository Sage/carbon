/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import Message from ".";
import Button from "../button";
import Typography, { List, ListItem } from "../typography";
import Box from "../box";
import Link from "../link";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Message> = {
  title: "Message",
  component: Message,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Message>;

export const Default: Story = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message open={isOpen} onDismiss={() => setIsOpen(false)}>
        Some custom message
      </Message>
    </>
  );
};
Default.storyName = "Default";

export const WithTitle: Story = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message title="Title" open={isOpen} onDismiss={() => setIsOpen(false)}>
        Some custom message
      </Message>
    </>
  );
};
WithTitle.storyName = "With Title";

export const ShowCloseIcon: Story = () => {
  return (
    <Box width="600px">
      <Message showCloseIcon={false} open>
        A longer custom message which now shows the close icon is not rendered
        and padding is equal on both sides
      </Message>
    </Box>
  );
};
ShowCloseIcon.storyName = "Show Close Icon";

export const Error: Story = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message open={isOpen} onDismiss={() => setIsOpen(false)} variant="error">
        Some custom message
      </Message>
    </>
  );
};
Error.storyName = "Error";

export const Success: Story = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message
        open={isOpen}
        onDismiss={() => setIsOpen(false)}
        variant="success"
      >
        Some custom message
      </Message>
    </>
  );
};
Success.storyName = "Success";

export const Warning: Story = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message
        open={isOpen}
        onDismiss={() => setIsOpen(false)}
        variant="warning"
      >
        Some custom message
      </Message>
    </>
  );
};
Warning.storyName = "Warning";

export const Neutral: Story = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message
        open={isOpen}
        onDismiss={() => setIsOpen(false)}
        variant="neutral"
      >
        Some custom message
      </Message>
    </>
  );
};
Neutral.storyName = "Neutral";

export const Transparent: Story = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message open={isOpen} onDismiss={() => setIsOpen(false)} transparent>
        Some custom message
      </Message>
    </>
  );
};
Transparent.storyName = "Transparent";

export const WithRichContent: Story = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message
        open={isOpen}
        onDismiss={() => setIsOpen(false)}
        variant="warning"
        title={<Typography variant="h4">Title</Typography>}
      >
        Some custom message
        <Box mt="8px">
          <List>
            <ListItem>
              Some custom <Typography variant="b">message as a list</Typography>
              . <Link href="#">With a link</Link>
            </ListItem>
            <ListItem>
              Some custom <Typography variant="b">message as a list</Typography>
              . <Link href="#">With a link</Link>
            </ListItem>
            <ListItem>
              Some custom <Typography variant="b">message as a list</Typography>
              . <Link href="#">With a link</Link>
            </ListItem>
          </List>
        </Box>
      </Message>
    </>
  );
};
WithRichContent.storyName = "With Rich Content";

export const WithMargin: Story = () => {
  const [isOpen, setIsOpen] = useState({
    MessageOne: true,
    MessageTwo: true,
    MessageThree: true,
  });

  const displayButton = Object.values({ ...isOpen }).every(
    (value) => value === false,
  );
  return (
    <>
      {displayButton && (
        <Button
          onClick={() =>
            setIsOpen({
              MessageOne: true,
              MessageTwo: true,
              MessageThree: true,
            })
          }
        >
          Open Message
        </Button>
      )}
      <Message
        open={isOpen.MessageOne}
        onDismiss={() => setIsOpen({ ...isOpen, MessageOne: false })}
        variant="warning"
        m={1}
      >
        This is message one.
      </Message>
      <Message
        open={isOpen.MessageTwo}
        onDismiss={() => setIsOpen({ ...isOpen, MessageTwo: false })}
        variant="warning"
        m={3}
      >
        This is message two.
      </Message>
      <Message
        open={isOpen.MessageThree}
        onDismiss={() => setIsOpen({ ...isOpen, MessageThree: false })}
        variant="warning"
        m="16px"
      >
        This is message three.
      </Message>
    </>
  );
};
WithMargin.storyName = "With Margin";

export const WithFocus: Story = () => {
  const [isMessageOpen, setIsMessageOpen] = useState(true);

  const messageRef: React.Ref<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (isMessageOpen) {
      messageRef.current?.focus();
    }
  }, [isMessageOpen]);

  return (
    <>
      {!isMessageOpen && (
        <Button onClick={() => setIsMessageOpen(true)}>Open Message</Button>
      )}
      <Message
        open={isMessageOpen}
        onDismiss={() => setIsMessageOpen(false)}
        variant="error"
        mb={1}
        ref={messageRef}
      >
        This is message one.
      </Message>
    </>
  );
};
WithFocus.storyName = "With Focus";
