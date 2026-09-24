import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import Box from "../../box";

import Loader, { LoaderProps } from ".";

import Button from "../../button/button.component";

const meta: Meta<typeof Loader> = {
  title: "Loader",
  component: Loader,
  parameters: { chromatic: { disableSnapshot: true } },
  argTypes: {
    loaderType: {
      options: ["standalone", "ring", "star"],
      control: { type: "radio" },
    },
    variant: {
      options: [
        "typical",
        "ai",
        "stacked",
        "inline",
        "ai-stacked",
        "ai-inline",
      ],
      control: { type: "select" },
    },
    size: {
      options: ["extra-small", "small", "medium", "large"],
      control: { type: "radio" },
    },
    inverse: {
      control: "boolean",
    },
    showLabel: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Playground: Story = {
  render: (args: LoaderProps) => (
    <Box>
      <Loader {...args} />
    </Box>
  ),
  args: {
    loaderType: "standalone",
    variant: "typical",
    size: "medium",
    inverse: false,
    showLabel: true,
    loaderLabel: "Loading",
    hasMotion: true,
    isTracked: false,
    animationTime: 3,
    isSuccess: false,
    isError: false,
  },
  decorators: [
    (Story, { args }) => (
      <Box
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

export const InsideButtons: Story = {
  render: () => (
    <>
      <Box height="50px">
        <Button m={2} buttonType="gradient-grey" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="ai-inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="primary" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
            inverse
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="secondary" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="tertiary" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="primary" destructive onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
            inverse
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="secondary" onClick={() => {}} destructive>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="tertiary" onClick={() => {}} destructive>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="gradient-grey" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
      <Box height="50px">
        <Button m={2} buttonType="gradient-white" onClick={() => {}}>
          <Loader
            loaderType="ring"
            variant="inline"
            size="extra-small"
            showLabel
          />
        </Button>
      </Box>
    </>
  ),
};

InsideButtons.storyName = "Inside Buttons";
