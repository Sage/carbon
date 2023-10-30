import React from "react";
import NavigationBar, { NavigationBarProps } from ".";

export default {
  title: "Navigation Bar/Test",
  includeStories: ["DefaultStory"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DefaultStory = ({ children, ...args }: NavigationBarProps) => {
  return <NavigationBar {...args}>{children}</NavigationBar>;
};

DefaultStory.storyName = "default";
DefaultStory.args = {
  navigationType: "light",
  isLoading: false,
  children: "Example content",
  ariaLabel: undefined,
  position: undefined,
  offset: "0",
};
