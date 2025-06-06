import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import Icon from "../icon";
import Help from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Help> = {
  title: "Help",
  component: Help,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;
type Story = StoryObj<typeof Help>;

export const Default: Story = () => {
  return (
    <Box m={64}>
      <Help>Some helpful text goes here</Help>
    </Box>
  );
};
Default.storyName = "Default";

export const WithTooltipCustomMessage: Story = () => {
  return (
    <Box m={64}>
      <Help>
        <Icon type="add" color="red" />
        <Icon type="add" color="green" />
        <Icon type="add" color="blue" /> Some <em>helpful</em> text goes here
      </Help>
    </Box>
  );
};
WithTooltipCustomMessage.storyName = "With Tooltip Custom Message";

export const WithTooltipPosition: Story = () => {
  return (
    <>
      {(["right", "left", "top", "bottom"] as const).map((position) => (
        <Box my={64} mx={300} key={position}>
          <Help tooltipPosition={position} isFocused>
            {`This tooltip is positioned ${position}`}
          </Help>
        </Box>
      ))}
    </>
  );
};
WithTooltipPosition.storyName = "With Tooltip Position";

export const WithTooltipColorOverrides: Story = () => (
  <Box my={64} mx={300}>
    <Help tooltipBgColor="lightblue" tooltipFontColor="black">
      The background and font color are overridden
    </Help>
  </Box>
);
WithTooltipColorOverrides.storyName = "With Tooltip Color Overrides";

export const WithIcons: Story = () => {
  return (
    <>
      {(["error", "add", "minus", "settings"] as const).map((icon) => (
        <Box m={65} key={icon}>
          <Help type={`${icon}`}>
            {`This is the Help component with the ${icon} icon`}
          </Help>
        </Box>
      ))}
    </>
  );
};
WithIcons.storyName = "With Icons";

export const WithHref: Story = () => {
  return (
    <Box m={64}>
      <Help href="https://carbon.sage.com">
        This is the Help component with a href.
      </Help>
    </Box>
  );
};
WithHref.storyName = "With Href";
