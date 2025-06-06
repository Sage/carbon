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
};

export default meta;
type Story = StoryObj<typeof ProgressTracker>;

export const Default: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker progress={50} />
    </Box>
  );
};
Default.storyName = "Default";

export const SizeSmall: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker size="small" progress={50} />
    </Box>
  );
};
SizeSmall.storyName = "Size - Small";

export const SizeLarge: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker size="large" progress={50} />
    </Box>
  );
};
SizeLarge.storyName = "Size - Large";

export const CustomBarLength: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker progress={50} length="150px" />
    </Box>
  );
};
CustomBarLength.storyName = "Custom Bar Length";

export const ColorVariants: Story = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ProgressTracker progress={15} currentProgressLabel="15%" />
      <ProgressTracker mt={2} progress={50} currentProgressLabel="50%" />
      <ProgressTracker mt={2} progress={100} currentProgressLabel="100%" />
      <ProgressTracker
        mt={2}
        progress={100}
        error
        currentProgressLabel="error"
      />
    </Box>
  );
};
ColorVariants.storyName = "Color Variants";

export const CustomLabelValues: Story = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ProgressTracker
        progress={50}
        currentProgressLabel="$50"
        maxProgressLabel="$200"
      />
      <ProgressTracker
        mt={2}
        progress={70}
        currentProgressLabel="Step 3"
        maxProgressLabel="5"
        description="Adding VAT"
      />
      <ProgressTracker mt={2} progress={100} currentProgressLabel="$200" />
      <ProgressTracker
        mt={2}
        progress={100}
        error
        currentProgressLabel="error"
      />
    </Box>
  );
};
CustomLabelValues.storyName = "Custom Label Values";

export const LabelsPositionBottom: Story = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ProgressTracker
        mt={2}
        labelsPosition="bottom"
        progress={15}
        currentProgressLabel="15%"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="bottom"
        progress={50}
        currentProgressLabel="50%"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="bottom"
        progress={100}
        currentProgressLabel="100%"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="bottom"
        progress={100}
        error
        currentProgressLabel="error"
      />
    </Box>
  );
};
LabelsPositionBottom.storyName = "Label Position Bottom";

export const LabelPositionLeft: Story = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={15}
        currentProgressLabel="15%"
        labelWidth="40px"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={50}
        currentProgressLabel="50%"
        labelWidth="40px"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={100}
        currentProgressLabel="100%"
        labelWidth="40px"
      />
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={100}
        error
        currentProgressLabel="error"
        labelWidth="40px"
      />
    </Box>
  );
};
LabelPositionLeft.storyName = "Label Position Left";
