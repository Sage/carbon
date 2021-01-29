import React from "react";
import { text } from "@storybook/addon-knobs";
import AppWrapper from "./app-wrapper.component";

export default {
  title: "AppWrapper/Test",
  component: AppWrapper,
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
  const children = text(
    "children",
    "This component will wrap its children within the width constraints of your application."
  );

  return <AppWrapper>{children}</AppWrapper>;
};

Default.story = {
  name: "default",
};
