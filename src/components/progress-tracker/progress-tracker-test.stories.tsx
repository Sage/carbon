import React from "react";
import ProgressTracker, { ProgressTrackerProps } from ".";
import { PROGRESS_TRACKER_SIZES } from "./progress-tracker.config";

export default {
  component: ProgressTracker,
  title: "Progress Tracker/Test",
  includeStories: ["Default", "LeftLabelWithLabelWidth"],
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
      options: ["top", "bottom", "left"],
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

export const LeftLabelWithLabelWidth = (args: ProgressTrackerProps) => {
  return (
    <>
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={10}
        showDefaultLabels
        labelWidth="60%"
        {...args}
      />
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={30}
        showDefaultLabels
        labelWidth="100px"
        {...args}
      />
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={40}
        showDefaultLabels
        labelWidth="fit-content"
        {...args}
      />
    </>
  );
};

LeftLabelWithLabelWidth.storyName = "left label with label width";

LeftLabelWithLabelWidth.parameters = {
  themeProvider: { chromatic: { disableSnapshot: false, theme: "sage" } },
};

export const ProgressTrackerComponent = (props: ProgressTrackerProps) => {
  return <ProgressTracker progress={50} showDefaultLabels {...props} />;
};
