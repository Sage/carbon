import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import { Breadcrumbs, Crumb } from ".";
import Box from "../box";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof Breadcrumbs> = {
  title: "Breadcrumbs",
  component: Breadcrumbs,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = () => {
  return (
    <Breadcrumbs aria-label="Default breadcrumbs">
      <Crumb href="#">Breadcrumb 1</Crumb>
      <Crumb href="#">Breadcrumb 2</Crumb>
      <Crumb href="#">Breadcrumb 3</Crumb>
      <Crumb href="#" isCurrent>
        Current Page
      </Crumb>
    </Breadcrumbs>
  );
};
Default.storyName = "Default";

export const OnDarkBackground: Story = () => {
  return (
    <Box p={2} bg="#000">
      <Breadcrumbs
        isDarkBackground
        aria-label="Breadcrumbs on a dark background"
      >
        <Crumb href="#">Breadcrumb 1</Crumb>
        <Crumb href="#">Breadcrumb 2</Crumb>
        <Crumb href="#">Breadcrumb 3</Crumb>
        <Crumb href="#" isCurrent>
          Current Page
        </Crumb>
      </Breadcrumbs>
    </Box>
  );
};
OnDarkBackground.storyName = "On Dark Background";
