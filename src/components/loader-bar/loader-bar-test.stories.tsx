import React from "react";
import { StoryFn } from "@storybook/react-vite";
import LoaderBar, { LoaderBarProps } from ".";
import { LOADER_BAR_SIZES } from "./loader-bar.config";
import Box from "../box";
import Typography from "../typography";

const lightGreyBackground: React.CSSProperties = {
  minHeight: "50px",
  backgroundColor: "rgb(224, 224, 224)",
};

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
      <div style={lightGreyBackground}>
        <Typography>Small bar</Typography>
      </div>
      <LoaderBar m={0} size="small" />
    </Box>
  );
};

LoaderBarWithMinHeight.parameters = {
  chromatic: { disableSnapshot: false },
  controls: { disable: true },
};
