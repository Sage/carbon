import React from "react";
import { text } from "@storybook/addon-knobs";
import AppWrapper from "./app-wrapper";

export default {
  title: "AppWrapper/Test",
  component: AppWrapper,
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disabled: true,
    },
  },
};

export const Basic = () => {
  const children = text(
    "children",
    "This component will wrap its children within the width constraints of your application."
  );

  return <AppWrapper>{children}</AppWrapper>;
};

Basic.story = {
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
