import React from "react";
import ProgressTracker, { ProgressTrackerProps } from ".";
import { PROGRESS_TRACKER_SIZES } from "./progress-tracker.config";
import {
  FlexTileCell,
  FlexTileContainer,
  FlexTileDivider,
  Tile,
} from "../tile";

export default {
  component: ProgressTracker,
  title: "Progress Tracker/Test",
  includeStories: ["Default", "LeftLabelWithLabelWidth", "InsideFlexTile"],
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
        labelWidth="60%"
        {...args}
      />
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={30}
        labelWidth="100px"
        {...args}
      />
      <ProgressTracker
        mt={2}
        labelsPosition="left"
        progress={40}
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

export const InsideFlexTile = () => {
  return (
    <Tile m={0} py={0}>
      <FlexTileContainer>
        <FlexTileCell py={2}>
          <FlexTileDivider />
          <ProgressTracker
            length="100%"
            progress={50}
            currentProgressLabel="Step 3"
            maxProgressLabel="5"
          />
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
};

InsideFlexTile.storyName = "inside flex tile";
InsideFlexTile.parameters = {
  themeProvider: { chromatic: { disableSnapshot: false } },
};
