import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Preview from "./preview.component";
import Box from "../box";
import Button from "../button";

const meta: Meta<typeof Preview> = {
  title: "Preview/Test",
  component: Preview,
  parameters: {
    info: { disable: true },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof Preview>;

export const PreviewChromaticSnapshots: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={2} width="320px">
      <Preview loading />
      <Preview loading lines={6} />
      <Preview loading width="256px" />
      <Preview loading height="256px" />
      <Preview mb={2} loading shape="rectangle" />
      <Preview mb={2} loading shape="rectangle-round" />
      <Preview loading shape="circle" />
      <Preview loading disableAnimation />
    </Box>
  ),
};
PreviewChromaticSnapshots.storyName = "Preview Chromatic Snapshots";

export const SnapshotWithChildren: Story = () => {
  const [isLoading, setIsLoading] = useState(true);
  const handleOnClick = () => {
    setIsLoading(!isLoading);
  };
  return (
    <>
      <Preview loading={isLoading} lines={3}>
        This the where the children are rendered
      </Preview>
      <Button mt={2} onClick={handleOnClick}>
        {isLoading ? "Click to preview children" : "Click to see loading state"}
      </Button>
    </>
  );
};
SnapshotWithChildren.storyName = "Snapshot With Children";
