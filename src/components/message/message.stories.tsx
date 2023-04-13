/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";

import Message from ".";
import Button from "../button";
import Typography, { List, ListItem } from "../typography";
import Box from "../box";
import Link from "../link";

export const Default: ComponentStory<typeof Message> = () => {
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

export const ShowCloseIcon: ComponentStory<typeof Message> = () => (
  <Box width="600px">
    <Message showCloseIcon={false} open>
      A longer custom message which now shows the close icon is not rendered and
      padding is equal on both sides
    </Message>
  </Box>
);

export const Error: ComponentStory<typeof Message> = () => {
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

export const Success: ComponentStory<typeof Message> = () => {
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

export const Warning: ComponentStory<typeof Message> = () => {
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

export const WithRichContent: ComponentStory<typeof Message> = () => {
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

export const WithMargin: ComponentStory<typeof Message> = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message
        open={isOpen}
        onDismiss={() => setIsOpen(false)}
        variant="warning"
        m={1}
      >
        Some custom message
      </Message>
      <Message
        open={isOpen}
        onDismiss={() => setIsOpen(false)}
        variant="warning"
        m={3}
      >
        Some custom message
      </Message>
      <Message
        open={isOpen}
        onDismiss={() => setIsOpen(false)}
        variant="warning"
        m="16px"
      >
        Some custom message
      </Message>
    </>
  );
};
