import React from "react";
import LoaderBar, { LoaderBarProps } from ".";
import { LOADER_BAR_SIZES } from "./loader-bar.config";

export default {
  title: "Loader Bar/Test",
  includeStories: ["DefaultStory"],
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

export const LoaderBarComponentTest = (props: LoaderBarProps) => {
  return <LoaderBar mt={2} size="medium" {...props} />;
};
