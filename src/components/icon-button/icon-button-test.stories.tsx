import React from "react";
import Icon from "../icon";
import IconButton from ".";

export default {
  title: "IconButton/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = ({ ...props }) => {
  return (
    <IconButton aria-label="icon-button" onClick={() => {}} {...props}>
      <Icon type="home" />
    </IconButton>
  );
};

Default.storyName = "default";

export const IconButtonComponent = ({ ...props }) => {
  return (
    <IconButton aria-label="icon-button" onClick={() => {}} {...props}>
      <Icon type="home" />
    </IconButton>
  );
};
