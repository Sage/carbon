import React from "react";
import { boolean, text, number } from "@storybook/addon-knobs";
import Preview from "./preview.component";

export default {
  title: "Preview/Test",
  component: Preview,
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
export const Default = () => {
  const children = text("children", "Text rendered as children component.");
  const height = text("height");
  const lines = number("lines", Preview.defaultProps.lines);
  const loading = boolean("loading", true);
  const width = text("width");

  return (
    <Preview height={height} lines={lines} loading={loading} width={width}>
      {children}
    </Preview>
  );
};

Default.story = {
  name: "default",
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
