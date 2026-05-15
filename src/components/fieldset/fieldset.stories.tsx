import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Fieldset from ".";
import Textbox from "../textbox";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Fieldset> = {
  title: "Fieldset",
  component: Fieldset,
  argTypes: {
    ...styledSystemProps,
    legendHint: { control: "text" },
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    themeProvider: { chromatic: { theme: "sage" } },
    controls: {
      exclude: ["children"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Default: Story = {
  render: (args) => (
    <Fieldset {...args}>
      <Textbox label="Input 1" value="Input Text" onChange={() => {}} />
      <Textbox label="Input 2" value="Input Text" onChange={() => {}} />
      <Textbox label="Input 3" value="Input Text" onChange={() => {}} />
    </Fieldset>
  ),
  args: {
    legend: "Fieldset Legend",
  },
};

export const WithLegendHint: Story = {
  ...Default,
  args: {
    ...Default.args,
    legendHint: "Fieldset LegendHint",
  },
};

export const HorizontalOrientation: Story = {
  ...Default,
  args: {
    ...Default.args,
    orientation: "horizontal",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <>
      <Fieldset legend="Small Fieldset" size="small" {...args}>
        <Textbox label="Input 1" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 2" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 3" value="Input Text" onChange={() => {}} />
      </Fieldset>
      <Fieldset legend="Medium Fieldset" size="medium" {...args}>
        <Textbox label="Input 1" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 2" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 3" value="Input Text" onChange={() => {}} />
      </Fieldset>
      <Fieldset legend="Large Fieldset" size="large" {...args}>
        <Textbox label="Input 1" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 2" value="Input Text" onChange={() => {}} />
        <Textbox label="Input 3" value="Input Text" onChange={() => {}} />
      </Fieldset>
    </>
  ),
  args: {
    mb: 4,
  },
};

export const HorizontalSizes: Story = {
  ...Sizes,
  args: {
    ...Sizes.args,
    orientation: "horizontal",
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

export const LabelFontWeight: Story = {
  ...Default,
  args: {
    ...Default.args,
    labelWeight: "bold",
  },
  parameters: {
    chromatic: { disableSnapshot: false },
  },
};

export const Required: Story = {
  ...Default,
  args: {
    ...Default.args,
    required: true,
  },
};
