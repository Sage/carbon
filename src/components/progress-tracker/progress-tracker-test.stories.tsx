import React from "react";
import ProgressTracker from ".";
import Box from "../box";
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
  includeStories: ["SnapshotCapture"],
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: { disableSnapshot: false },
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

export const SnapshotCapture = () => {
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      Component with props applied to capture in one Chromatic snapshot
      {/* Default */}
      <ProgressTracker progress={50} />
      {/* Sizes */}
      <ProgressTracker size="small" progress={50} />
      <ProgressTracker size="large" progress={50} />
      {/* Custom bar length */}
      <ProgressTracker progress={50} length="150px" />
      {/* Color variants */}
      <ProgressTracker progress={15} currentProgressLabel="15%" />
      <ProgressTracker progress={50} currentProgressLabel="50%" />
      <ProgressTracker progress={100} currentProgressLabel="100%" />
      <ProgressTracker progress={100} error currentProgressLabel="error" />
      {/* Custom label values */}
      <ProgressTracker
        progress={50}
        currentProgressLabel="$50"
        maxProgressLabel="$200"
      />
      <ProgressTracker
        progress={70}
        currentProgressLabel="Step 3"
        maxProgressLabel="5"
        description="Adding VAT"
      />
      {/* Labels position bottom */}
      <ProgressTracker
        labelsPosition="bottom"
        progress={50}
        currentProgressLabel="50%"
      />
      {/* Labels position left */}
      <ProgressTracker
        labelsPosition="left"
        progress={50}
        currentProgressLabel="50%"
        labelWidth="40px"
      />
      {/* Left label with various label widths */}
      <ProgressTracker labelsPosition="left" progress={10} labelWidth="60%" />
      <ProgressTracker labelsPosition="left" progress={30} labelWidth="100px" />
      <ProgressTracker
        labelsPosition="left"
        progress={40}
        labelWidth="fit-content"
      />
      {/* Inside flex tile */}
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
    </Box>
  );
};

SnapshotCapture.storyName = "Snapshot Capture";
