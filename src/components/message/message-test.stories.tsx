import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Message from ".";
import Button from "../button/__next__";
import Link from "../link";
import Typography from "../typography";
import Box from "../box";

const meta: Meta<typeof Message> = {
  title: "Message/Test",
  component: Message,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  argTypes: {
    title: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Message>;

export const WithNoTitle: Story = {
  render: (args) => (
    <>
      <Message onDismiss={() => {}} variant="info-subtle" {...args}>
        Subtle with no Title
      </Message>
      <Message onDismiss={() => {}} size="large" {...args}>
        Large with no Title
      </Message>
      <Message
        onDismiss={() => {}}
        variant="info-subtle"
        size="large"
        {...args}
      >
        Large Subtle with no Title
      </Message>
    </>
  ),
  args: {
    mb: 2,
  },
};

export const WithLongTextWrapping: Story = {
  render: (args) => (
    <>
      <Message {...args}>
        Some long custom message that should wrap onto multiple lines when it
        exceeds the width of the container.
      </Message>
      <Message variant="info-subtle" {...args}>
        Some long custom message that should wrap onto multiple lines when it
        exceeds the width of the container.
      </Message>
      <Message onDismiss={() => {}} {...args}>
        This is a long custom message that should wrap onto multiple lines when
        it exceeds the width of the container.
      </Message>
      <Message onDismiss={() => {}} variant="info-subtle" {...args}>
        This is a long custom message that should wrap onto multiple lines when
        it exceeds the width of the container.
      </Message>
    </>
  ),
  args: {
    title:
      "This is a long title that should also wrap onto multiple lines when it exceeds the width of the container.",
    width: "300px",
    mb: 2,
  },
};

export const WithCustomContent: Story = {
  render: (args) => (
    <Message onDismiss={() => {}} {...args}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Typography m={0}>
          Some custom message. <Link href="#">Link</Link>
        </Typography>
        <Button mx={2} size="small" onClick={() => {}}>
          Button
        </Button>
      </Box>
    </Message>
  ),
  args: {
    title: "Custom Content",
    width: "400px",
  },
  parameters: {
    pseudo: { focus: "[data-role='close']" },
  },
};

export const DisableCloseIcon: Story = {
  render: (args) => <Message {...args}>Some custom message</Message>,
  args: {
    showCloseIcon: false,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export const Transparent: Story = {
  render: (args) => <Message {...args}>Some custom message</Message>,
  args: {
    transparent: true,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};
