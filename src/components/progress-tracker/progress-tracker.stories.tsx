import React from "react";
import { Meta, StoryObj } from "@storybook/react";

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
      <ProgressTracker size="small" progress={50} showDefaultLabels />
    </Box>
  );
};
SizeSmall.storyName = "Size - Small";

export const SizeLarge: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker size="large" progress={50} showDefaultLabels />
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

export const DefaultLabelValue: Story = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ProgressTracker mt={2} progress={15} currentProgressLabel="15%" />
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
DefaultLabelValue.storyName = "Default Label Value";

export const DefaultLabelValueLabelsPositionBottom: Story = () => {
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
DefaultLabelValueLabelsPositionBottom.storyName =
  "Default Label Value - labelsPosition Bottom";

export const DefaultLabelValueLabelsPositionLeft: Story = () => {
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
DefaultLabelValueLabelsPositionLeft.storyName =
  "Default Label Value - labelsPosition Left";

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

export const DefaultAndCustomLabelValues: Story = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <ProgressTracker progress={50} currentProgressLabel="50%" />
      <ProgressTracker
        mt={2}
        progress={50}
        currentProgressLabel="Step 3"
        maxProgressLabel="5"
      />
      <ProgressTracker
        mt={2}
        progress={50}
        currentProgressLabel="50%"
        description="Adding VAT"
      />
      <ProgressTracker
        mt={2}
        progress={50}
        currentProgressLabel="Step 3"
        maxProgressLabel="5"
        description="Adding VAT"
      />
    </Box>
  );
};
DefaultAndCustomLabelValues.storyName = "Default and Custom Label Values";

export const AccessibilityExample: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker
        currentProgressLabel="50%"
        progress={50}
        aria-valuemin={100}
        aria-valuenow={150}
        aria-valuemax={200}
        aria-valuetext="$150"
      />
    </Box>
  );
};
AccessibilityExample.storyName = "Accessibility Example";

export const AccessibilityExampleTwo: Story = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker progress={50} aria-valuemin={111} aria-valuemax={188} />
    </Box>
  );
};
AccessibilityExampleTwo.storyName = "Accessibility Example Two";
