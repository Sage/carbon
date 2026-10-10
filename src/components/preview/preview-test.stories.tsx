import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import Skeleton from "../skeleton";
import Box from "../box";
import Button from "../button";

const meta: Meta<typeof Skeleton> = {
  title: "Skeleton/Test",
  component: Skeleton,
  parameters: {
    info: { disable: true },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const PreviewChromaticSnapshots: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={2} width="320px">
      <Skeleton loading />
      <Skeleton loading lines={6} />
      <Skeleton loading width="256px" />
      <Skeleton loading height="256px" />
      <Skeleton mb={2} loading shape="rectangle-moderate" />
      <Skeleton mb={2} loading shape="rectangle-curved" />
      <Skeleton loading shape="circle" />
      <Skeleton loading disableAnimation />
    </Box>
  ),
};
PreviewChromaticSnapshots.storyName = "Skeleton Chromatic Snapshots";

export const SnapshotWithChildren: Story = () => {
  const [isLoading, setIsLoading] = useState(true);
  const handleOnClick = () => {
    setIsLoading(!isLoading);
  };
  return (
    <>
      <Skeleton loading={isLoading} lines={3}>
        This the where the children are rendered
      </Skeleton>
      <Button mt={2} onClick={handleOnClick}>
        {isLoading ? "Click to preview children" : "Click to see loading state"}
      </Button>
    </>
  );
};
SnapshotWithChildren.storyName = "Snapshot With Children";
