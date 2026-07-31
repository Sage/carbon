import { Meta, StoryObj } from "@storybook/react-vite";
import React, { useRef, useState } from "react";
import Button, { ButtonProps } from "./button.component";
import Box from "../../box";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  parameters: { chromatic: { disableSnapshot: true } },
  argTypes: {
    children: {
      control: "text",
    },
    variant: {
      options: ["default", "destructive", "gradient"],
      control: { type: "radio" },
    },
    variantType: {
      options: ["primary", "secondary", "tertiary", "subtle"],
      control: { type: "radio" },
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
    inverse: {
      control: "boolean",
    },
    noWrap: {
      control: "boolean",
    },
    type: {
      options: ["button", "submit", "reset"],
      control: { type: "radio" },
    },
  },
  args: {
    children: "Button",
    disabled: false,
    fullWidth: false,
    inverse: false,
    noWrap: true,
    size: "medium",
    type: "button",
    variant: "default",
    variantType: "primary",
  },
  decorators: (StoryToRender) => (
    <Box minHeight="80px" p={2}>
      <StoryToRender />
    </Box>
  ),
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  render: (args: ButtonProps) => <Button {...args}>{args.children}</Button>,
  args: {
    children: "Button",
    variant: "default",
    variantType: "primary",
    size: "medium",
    disabled: false,
    fullWidth: false,
    inverse: false,
    noWrap: true,
    type: "button",
    href: undefined,
    target: undefined,
    rel: undefined,
  },
  decorators: [
    (Story, { args }) => (
      <Box
        minHeight="80px"
        p={2}
        backgroundColor={
          args.inverse
            ? "var(--mode-color-generic-bg-inverse-nought)"
            : "var(--mode-color-generic-bg-nought)"
        }
      >
        <Story />
      </Box>
    ),
  ],
};
Playground.storyName = "Playground";

export const ClickHandler: Story = () => {
  const [value, setValue] = useState(0);
  return (
    <Button onClick={() => setValue((p) => p + 1)}>
      Button Clicked {value} Times
    </Button>
  );
};
ClickHandler.storyName = "Click Handler";

export const ProgrammaticFocus: Story = () => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  return (
    <Box display="flex" gap={2}>
      <Button ref={buttonRef} variantType="primary">
        Button to Focus
      </Button>
      <Button
        variantType="secondary"
        onClick={() => buttonRef.current?.focus()}
      >
        Focus other button
      </Button>
    </Box>
  );
};
ProgrammaticFocus.storyName = "Programmatic Focus";
