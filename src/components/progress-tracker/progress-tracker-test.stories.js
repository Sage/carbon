import React from "react";
import ProgressTracker from ".";
import {
  PROGRESS_TRACKER_SIZES,
  PROGRESS_TRACKER_VARIANTS,
} from "./progress-tracker.config";

export default {
  component: ProgressTracker,
  title: "Progress Tracker/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
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
      options: ["", "$100", "100ml"],
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
    variant: {
      options: PROGRESS_TRACKER_VARIANTS,
      control: {
        type: "select",
      },
    },
    orientation: {
      options: ["horizontal", "vertical"],
      control: {
        type: "select",
      },
    },
    direction: {
      options: ["up", "down"],
      control: {
        type: "select",
      },
    },
    labelsPosition: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "select",
      },
    },
  },
};

export const Default = ({ ...args }) => {
  return <ProgressTracker {...args} />;
};

Default.storyName = "default";
