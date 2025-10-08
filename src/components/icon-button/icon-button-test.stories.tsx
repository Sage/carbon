import React from "react";
import Icon from "../icon";
import IconButton, { IconButtonProps } from ".";

export default {
  title: "Deprecated/Icon Button/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = (props: IconButtonProps) => {
  return (
    <IconButton aria-label="icon-button" onClick={() => {}} {...props}>
      <Icon type="home" />
    </IconButton>
  );
};

Default.storyName = "default";
