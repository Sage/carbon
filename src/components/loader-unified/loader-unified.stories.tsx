import React from "react";
import { Meta, StoryObj } from "@storybook/react";

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
      options: ["extra-small", "small", "medium", "large", "extra-large"],
    },
    isInsideButton: {
      control: { type: "boolean" },
    },
    isActive: {
      control: { type: "boolean" },
    },
    variant: {
      control: { type: "select" },
      options: [
        "action",
        "neutral",
        "inverse",
        "gradient-grey",
        "gradient-white",
        "default",
        "gradient",
      ],
    },
    loaderLabel: {
      control: { type: "text" },
    },
    spinnerLabel: {
      control: { type: "text" },
    },
    showSpinnerLabel: {
      control: { type: "boolean" },
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
    loaderStarLabel: {
      control: { type: "text" },
    },
    loaderType: {
      control: { type: "select" },
      options: ["dots", "bar", "spinner", "star"],
      defaultValue: "dots",
    },
  },
  args: {
    loaderType: "dots",
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;
type Story = StoryObj<typeof UnifiedLoader>;

export const Default: Story = {
  render: (args: LoaderProps) => <UnifiedLoader {...args} />,
  args: {
    size: "medium",
    isInsideButton: false,
    isActive: true,
    variant: "default",
    loaderLabel: "Loading",
    spinnerLabel: "Loading",
    showSpinnerLabel: false,
    hasMotion: true,
    isTracked: false,
    animationTime: undefined,
    loaderStarLabel: "Loading",
    loaderType: "dots",
  },
};
Default.storyName = "Default";
