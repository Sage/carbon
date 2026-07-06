import React from "react";
import ProgressTracker from ".";
import Box from "../box";
import {
  FlexTileCell,
  FlexTileContainer,
  FlexTileDivider,
  Tile,
} from "../tile";

export default {
  component: ProgressTracker,
  title: "Progress Tracker/Test",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const SnapshotCapture = () => {
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      Component with props applied to capture in one Chromatic snapshot
      {/* Default */}
      <ProgressTracker progress={50} />
      {/* Sizes */}
      <ProgressTracker size="small" progress={50} description="Small" />
      <ProgressTracker size="medium" progress={50} description="Medium" />
      <ProgressTracker size="large" progress={50} description="Large" />
      {/* Custom bar length */}
      <ProgressTracker
        progress={50}
        length="150px"
        description="Custom Length"
      />
      {/* Custom label values */}
      <ProgressTracker
        progress={50}
        currentProgressLabel="$50"
        maxProgressLabel="$200"
        customValuePreposition="out of"
        description="Custom Labels"
      />
      {/* Labels position bottom */}
      <ProgressTracker labelsPosition="bottom" progress={50} />
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
      {/* Variants */}
      <ProgressTracker progress={50} variant="neutral" description="Neutral" />
      <ProgressTracker progress={50} variant="warning" description="Warning" />
      <ProgressTracker
        progress={50}
        variant="information"
        description="Information"
      />
      <ProgressTracker progress={50} variant="error" description="Error" />
      <ProgressTracker progress={50} variant="success" description="Success" />
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
