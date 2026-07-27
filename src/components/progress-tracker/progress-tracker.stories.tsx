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

export const Default: Story = {
  render: (args) => <ProgressTracker {...args} />,
  args: {
    progress: 50,
  },
};

export const WithDescription: Story = {
  ...Default,
  args: {
    ...Default.args,
    description: "Description",
  },
};

export const CustomLabelValues: Story = {
  render: (args) => <ProgressTracker {...args} />,
  args: {
    currentProgressLabel: "£75",
    maxProgressLabel: "£200",
    customValuePreposition: "out of",
    progress: Math.round((75 / 200) * 100),
  },
};

export const CustomLength: Story = {
  ...Default,
  args: {
    ...Default.args,
    length: "500px",
  },
};

export const LabelsPosition: Story = {
  render: (args) => (
    <>
      <ProgressTracker labelsPosition="top" description="Top" {...args} />
      <ProgressTracker labelsPosition="bottom" description="Bottom" {...args} />
      <ProgressTracker labelsPosition="left" description="Left" {...args} />
    </>
  ),
  args: {
    progress: 50,
    currentProgressLabel: "50%",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <ProgressTracker size="small" description="Small" {...args} />
      <ProgressTracker size="medium" description="Medium" {...args} />
      <ProgressTracker size="large" description="Large" {...args} />
    </>
  ),
  args: {
    progress: 50,
  },
};

export const Variants: Story = {
  render: (args) => (
    <>
      <ProgressTracker variant="neutral" description="Neutral" {...args} />
      <ProgressTracker variant="warning" description="Warning" {...args} />
      <ProgressTracker
        variant="information"
        description="Information"
        {...args}
      />
      <ProgressTracker variant="error" description="Error" {...args} />
      <ProgressTracker variant="success" description="Success" {...args} />
    </>
  ),
  args: {
    progress: 50,
  },
};
