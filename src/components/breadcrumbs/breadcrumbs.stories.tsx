import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import { Breadcrumbs, Crumb } from ".";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const blackBackground: React.CSSProperties = {
  padding: "var(--global-space-layout-2-xs)",
  backgroundColor: "rgb(0, 0, 0)",
};

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof Breadcrumbs> = {
  title: "Breadcrumbs",
  component: Breadcrumbs,
  subcomponents: { Crumb },
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    controls: {
      exclude: ["children"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  render: ({ ...args }) => {
    return (
      <Breadcrumbs aria-label="Default breadcrumbs" {...args}>
        <Crumb href="#">Breadcrumb 1</Crumb>
        <Crumb href="#">Breadcrumb 2</Crumb>
        <Crumb href="#">Breadcrumb 3</Crumb>
        <Crumb href="#" isCurrent>
          Current Page
        </Crumb>
      </Breadcrumbs>
    );
  },
};

export const Inverse: Story = {
  render: ({ ...args }) => {
    return (
      <div style={blackBackground}>
        <Breadcrumbs aria-label="Breadcrumbs with inverse styling" {...args}>
          <Crumb href="#">Breadcrumb 1</Crumb>
          <Crumb href="#">Breadcrumb 2</Crumb>
          <Crumb href="#">Breadcrumb 3</Crumb>
          <Crumb href="#" isCurrent>
            Current Page
          </Crumb>
        </Breadcrumbs>
      </div>
    );
  },
  args: {
    inverse: true,
  },
};
