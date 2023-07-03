import React from "react";
import ProgressTracker, { ProgressTrackerProps } from ".";
import { PROGRESS_TRACKER_SIZES } from "./progress-tracker.config";

export default {
  component: ProgressTracker,
  title: "Progress Tracker/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    size: {
      options: PROGRESS_TRACKER_SIZES,
      control: {
        type: "select",
      },
    },
    progress: {
      control: {
        type: "number",
      },
    },
    currentProgressLabel: {
      options: ["", "$100", "100ml", "error"],
      control: {
        type: "select",
      },
    },
    maxProgressLabel: {
      options: ["", "$200", "200ml"],
      control: {
        type: "select",
      },
    },
    labelsPosition: {
      options: ["top", "bottom"],
      control: {
        type: "select",
      },
    },
  },
};

export const Default = (args: ProgressTrackerProps) => {
  return <ProgressTracker {...args} />;
};

Default.storyName = "default";

export const ProgressTrackerComponent = (props: ProgressTrackerProps) => {
  return <ProgressTracker progress={50} showDefaultLabels {...props} />;
};
