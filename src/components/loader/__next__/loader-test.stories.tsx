import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Box from "../../box";

import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

import Loader, { LoaderProps } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Loader> = {
  title: "Loader/Test",
  component: Loader,
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
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  render: (args: LoaderProps) => (
    <Box>
      <Loader {...args} />
    </Box>
  ),
};
Default.storyName = "Default";
