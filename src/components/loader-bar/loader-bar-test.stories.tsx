import React from "react";
import { StoryFn } from "@storybook/react";
import LoaderBar, { LoaderBarProps } from ".";
import { LOADER_BAR_SIZES } from "./loader-bar.config";
import Box from "../box";
import Typography from "../typography";

export default {
  title: "Deprecated/Loader Bar/Test",
  includeStories: ["DefaultStory", "LoaderBarWithMinHeight"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    size: {
      options: LOADER_BAR_SIZES,
      control: {
        type: "select",
      },
    },
  },
};

export const DefaultStory = ({ ...args }: LoaderBarProps) => {
  return <LoaderBar size="medium" {...args} />;
};

DefaultStory.storyName = "default";

export const LoaderBarWithMinHeight: StoryFn<typeof LoaderBar> = () => {
  return (
    <Box p={3}>
      <Box backgroundColor="#e0e0e0" minHeight="50px">
        <Typography>Small bar</Typography>
      </Box>
      <LoaderBar m={0} size="small" />
    </Box>
  );
};

LoaderBarWithMinHeight.parameters = {
  chromatic: { disableSnapshot: false },
  controls: { disable: true },
};
