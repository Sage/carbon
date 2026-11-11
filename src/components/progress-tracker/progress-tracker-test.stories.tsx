import React from "react";
import { StoryObj } from "@storybook/react-vite";
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

type Story = StoryObj<typeof ProgressTracker>;

// Documentation regression stories moved from the public docs.

export const Default: Story = {
  render: (args) => <ProgressTracker {...args} />,
  args: {
    progress: 50,
  },
};

export const WithDescription: Story = {
  ...Default,
  args: {
    ...Default.args,
    description: "Description",
  },
};

export const CustomLabelValues: Story = {
  render: (args) => <ProgressTracker {...args} />,
  args: {
    currentProgressLabel: "£75",
    maxProgressLabel: "£200",
    customValuePreposition: "out of",
    progress: Math.round((75 / 200) * 100),
  },
};

export const CustomLength: Story = {
  ...Default,
  args: {
    ...Default.args,
    length: "500px",
  },
};

export const LabelsPosition: Story = {
  render: (args) => (
    <>
      <ProgressTracker labelsPosition="top" description="Top" {...args} />
      <ProgressTracker labelsPosition="bottom" description="Bottom" {...args} />
      <ProgressTracker labelsPosition="left" description="Left" {...args} />
    </>
  ),
  args: {
    progress: 50,
    currentProgressLabel: "50%",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <ProgressTracker size="small" description="Small" {...args} />
      <ProgressTracker size="medium" description="Medium" {...args} />
      <ProgressTracker size="large" description="Large" {...args} />
    </>
  ),
  args: {
    progress: 50,
  },
};

export const Variants: Story = {
  render: (args) => (
    <>
      <ProgressTracker variant="neutral" description="Neutral" {...args} />
      <ProgressTracker variant="warning" description="Warning" {...args} />
      <ProgressTracker
        variant="information"
        description="Information"
        {...args}
      />
      <ProgressTracker variant="error" description="Error" {...args} />
      <ProgressTracker variant="success" description="Success" {...args} />
    </>
  ),
  args: {
    progress: 50,
  },
};

const documentationDecorator = (StoryToRender: React.ComponentType) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <StoryToRender />
  </Box>
);

[
  Default,
  WithDescription,
  CustomLabelValues,
  CustomLength,
  LabelsPosition,
  Sizes,
  Variants,
].forEach((story) => {
  story.parameters = { chromatic: { disableSnapshot: true } };
  story.decorators = [documentationDecorator];
});
