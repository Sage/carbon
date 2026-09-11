import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

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

// Documentation regression stories moved from the public docs.

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

Default.parameters = { chromatic: { disableSnapshot: true } };
WithCloseButton.parameters = { chromatic: { disableSnapshot: true } };
WithTitle.parameters = { chromatic: { disableSnapshot: true } };
