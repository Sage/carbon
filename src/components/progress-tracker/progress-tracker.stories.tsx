import React from "react";
import { ComponentStory } from "@storybook/react";

import ProgressTracker from ".";
import Box from "../box";

export const Default: ComponentStory<typeof ProgressTracker> = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker progress={50} />
    </Box>
  );
};

export const SizeSmall: ComponentStory<typeof ProgressTracker> = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker size="small" progress={50} showDefaultLabels />
    </Box>
  );
};

export const SizeLarge: ComponentStory<typeof ProgressTracker> = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker size="large" progress={50} showDefaultLabels />
    </Box>
  );
};

export const CustomBarLength: ComponentStory<typeof ProgressTracker> = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker progress={50} length="150px" />
    </Box>
  );
};

export const ColorVariants: ComponentStory<typeof ProgressTracker> = () => {
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

export const DefaultLabelValue: ComponentStory<typeof ProgressTracker> = () => {
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

export const DefaultLabelValueLabelsPositionBottom: ComponentStory<
  typeof ProgressTracker
> = () => {
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

export const CustomLabelValues: ComponentStory<typeof ProgressTracker> = () => {
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

export const DefaultAndCustomLabelValues: ComponentStory<
  typeof ProgressTracker
> = () => {
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

export const AccessibilityExample: ComponentStory<
  typeof ProgressTracker
> = () => {
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

export const AccessibilityExampleTwo: ComponentStory<
  typeof ProgressTracker
> = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker progress={50} aria-valuemin={111} aria-valuemax={188} />
    </Box>
  );
};
