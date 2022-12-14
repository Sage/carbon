import React from "react";
import { ComponentStory } from "@storybook/react";
import LoaderBar from ".";

export const DefaultStory: ComponentStory<typeof LoaderBar> = () => (
  <LoaderBar mt={2} />
);

export const SmallStoryLoaderbar: ComponentStory<typeof LoaderBar> = () => (
  <LoaderBar size="small" mt={2} />
);

export const LargeStoryLoaderbar: ComponentStory<typeof LoaderBar> = () => (
  <LoaderBar size="large" mt={2} />
);
