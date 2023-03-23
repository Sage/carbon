import React from "react";
import { ComponentStory } from "@storybook/react";

import IconButton from ".";
import Icon from "../icon";

export const Default: ComponentStory<typeof IconButton> = () => (
  <IconButton aria-label="icon-button" onClick={() => {}}>
    <Icon type="home" />
  </IconButton>
);

export const WithTooltip: ComponentStory<typeof IconButton> = () => (
  <IconButton aria-label="icon-button" onClick={() => {}}>
    <Icon type="home" tooltipMessage="Hey I'm a tooltip!" />
  </IconButton>
);

export const Disabled: ComponentStory<typeof IconButton> = () => (
  <IconButton disabled aria-label="icon-button" onClick={() => {}}>
    <Icon type="home" />
  </IconButton>
);
