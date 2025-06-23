import React from "react";
import CarbonStoryWrapper from "./story-wrapper";

type Modes = "dark" | "light";

export const globalModeTypes = {
  mode: {
    name: "Mode",
    description: "Global mode for components",
    defaultValue: "light",
    toolbar: {
      icon: "circlehollow",
      items: [
        { value: "light", icon: "sun", title: "Light mode" },
        { value: "dark", icon: "moon", title: "Dark mode" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

interface StoryContextGlobals {
  mode?: Modes;
}

interface StoryContext {
  globals: StoryContextGlobals;
}

type StoryFn = () => React.ReactNode;

let lastMode: Modes | undefined;

export const modeDecorator = (Story: StoryFn, context: StoryContext) => {
  const { mode = "light" } = context.globals;

  // Only apply changes if values actually changed
  if (lastMode !== mode) {
    // setMode(mode);
    lastMode = mode;
  }

  return (
    <CarbonStoryWrapper mode={lastMode}>
      <Story />
    </CarbonStoryWrapper>
  );
};
