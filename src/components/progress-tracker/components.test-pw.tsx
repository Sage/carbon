import React from "react";
import ProgressTracker, { ProgressTrackerProps } from ".";
import Box from "../box";

export const Default = (args: ProgressTrackerProps) => {
  return <ProgressTracker {...args} />;
};

export const ProgressTrackerComponent = (props: ProgressTrackerProps) => {
  return <ProgressTracker progress={50} showDefaultLabels {...props} />;
};

export const AccessibilityExample = () => {
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

export const AccessibilityExampleTwo = () => {
  return (
    <Box display="flex" justifyContent="space-around">
      <ProgressTracker progress={50} aria-valuemin={111} aria-valuemax={188} />
    </Box>
  );
};
