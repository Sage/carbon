import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import NavigationBar from "./navigation-bar.component";

export default {
  title: "Design System/Navigation Bar/Test",
  component: NavigationBar,
  decorators: [withKnobs],
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disable: true,
    },
  },
};

export const Default = () => {
  const children = text("children", "Example content");

  return <NavigationBar>{children}</NavigationBar>;
};

Default.story = {
  name: "default",
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
