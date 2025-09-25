import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import IconButton from ".";
import Icon from "../icon";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof IconButton> = {
  title: "Deprecated/Icon Button",
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  component: IconButton,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = () => {
  return (
    <IconButton aria-label="icon-button" onClick={() => {}}>
      <Icon type="home" />
    </IconButton>
  );
};
Default.storyName = "Default";

export const WithTooltip: Story = () => {
  return (
    <IconButton aria-label="icon-button" onClick={() => {}}>
      <Icon type="home" tooltipMessage="Hey I'm a tooltip!" />
    </IconButton>
  );
};
WithTooltip.storyName = "With Tooltip";

export const Disabled: Story = () => {
  return (
    <IconButton disabled aria-label="icon-button" onClick={() => {}}>
      <Icon type="home" />
    </IconButton>
  );
};
Disabled.storyName = "Disabled";
