import React from "react";
import BatchSelection, { BatchSelectionProps } from ".";
import IconButton from "../icon-button";
import Icon from "../icon";

export default {
  title: "Batch Selection/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    colorTheme: {
      options: ["dark", "light", "white", "transparent"],
      control: {
        type: "select",
      },
    },
  },
};

export const Default = (args: Omit<BatchSelectionProps, "children">) => (
  <BatchSelection {...args}>
    <IconButton onAction={() => {}}>
      <Icon type="csv" />
    </IconButton>
    <IconButton onAction={() => {}}>
      <Icon type="bin" />
    </IconButton>
    <IconButton onAction={() => {}}>
      <Icon type="pdf" />
    </IconButton>
  </BatchSelection>
);

Default.storyName = "default";
Default.args = {
  disabled: false,
  hidden: false,
  selectedCount: 0,
  colorTheme: "transparent",
};
