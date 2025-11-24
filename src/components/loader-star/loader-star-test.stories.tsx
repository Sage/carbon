import React from "react";
import Box from "../box";
import LoaderStar, { LoaderStarProps } from ".";

export default {
  title: "Deprecated/Loader Star/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    loaderStarLabel: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = (props: Partial<LoaderStarProps>) => (
  <Box m={3} width="100%" height="200px">
    <LoaderStar {...props} />
  </Box>
);

Default.storyName = "default";
