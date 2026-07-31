import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import ProgressTracker from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof ProgressTracker> = {
  title: "Progress Tracker",
  component: ProgressTracker,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        gap={4}
      >
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProgressTracker>;

export const Playground: Story = {
  render: (args) => <ProgressTracker {...args} />,
  args: {
    progress: 50,
    description: "Completed",
    currentProgressLabel: "50%",
    maxProgressLabel: "100%",
    customValuePreposition: "of",
    labelsPosition: "bottom",
    labelWidth: "100px",
    length: "256px",
    size: "medium",
    variant: "neutral",
  },
};
Playground.storyName = "Playground";
