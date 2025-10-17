import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Box from "../box";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import UnifiedLoader, { LoaderProps } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof UnifiedLoader> = {
  title: "UnifiedLoader",
  component: UnifiedLoader,
  argTypes: {
    ...styledSystemProps,
    size: {
      control: { type: "select" },
      options: ["extra-small", "small", "medium", "large"],
    },
    variant: {
      control: { type: "select" },
      options: ["typical", "ai", "stacked", "inline"],
    },
    loaderLabel: {
      control: { type: "text" },
    },
    hasMotion: {
      control: { type: "boolean" },
    },
    isTracked: {
      control: { type: "boolean" },
    },
    animationTime: {
      control: { type: "number" },
    },
    inverse: {
      control: { type: "boolean" },
    },
    loaderType: {
      control: { type: "select" },
      options: ["standalone", "star", "ring"],
      defaultValue: "dots",
    },
  },
  args: {
    loaderType: "standalone",
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;
type Story = StoryObj<typeof UnifiedLoader>;

export const Default: Story = {
  render: (args: LoaderProps) => (
    <Box
      backgroundColor={args.inverse ? "#343434" : "#FFF"}
      height="500px"
      padding="20px"
      width="500px"
    >
      <UnifiedLoader {...args} />
    </Box>
  ),
  args: {
    size: "medium",
    isInsideButton: false,
    variant: "typical",
    loaderLabel: "Loading",
    hasMotion: true,
    isTracked: false,
    animationTime: undefined,
    loaderType: "standalone",
  },
};
Default.storyName = "Default";
