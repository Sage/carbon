import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Breadcrumbs } from ".";
import { Crumb } from "./crumb";
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
    <Breadcrumbs>
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
