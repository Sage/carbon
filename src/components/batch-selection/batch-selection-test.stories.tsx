import React from "react";
import BatchSelection, { BatchSelectionProps } from ".";
import IconButton from "../icon-button";
import Icon from "../icon";

export default {
  title: "Batch Selection/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
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
    <IconButton onClick={() => {}}>
      <Icon type="csv" />
    </IconButton>
    <IconButton onClick={() => {}}>
      <Icon type="bin" />
    </IconButton>
    <IconButton onClick={() => {}}>
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

export const BatchSelectionComponent = ({
  children,
  selectedCount = 0,
  ...rest
}: Partial<BatchSelectionProps>) => (
  <BatchSelection {...rest} selectedCount={selectedCount}>
    <IconButton aria-label="icon-button" onClick={() => {}}>
      <Icon type="csv" />
    </IconButton>
    <IconButton aria-label="icon-button" onClick={() => {}}>
      <Icon type="bin" />
    </IconButton>
    <IconButton aria-label="icon-button" onClick={() => {}}>
      <Icon type="pdf" />
    </IconButton>
    {children}
  </BatchSelection>
);
