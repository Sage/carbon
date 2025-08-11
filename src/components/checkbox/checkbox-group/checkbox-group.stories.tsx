import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import CarbonProvider from "../../carbon-provider";

import { CheckboxGroup, Checkbox } from "..";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta = {
  title: "Checkbox Group",
  component: CheckboxGroup,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Default: Story = {
  render: (args) => (
    <CheckboxGroup {...args}>
      {["Apple", "Banana", "Cherry", "Date"].map((label) => (
        <Checkbox key={label} name="fruits" label={label} />
      ))}
    </CheckboxGroup>
  ),
  args: {
    legend: "What fruits do you have?",
  },
};

export const WithLegendHelp: Story = {
  render: (args) => (
    <CarbonProvider validationRedesignOptIn>
      <CheckboxGroup {...args}>
        {["Apple", "Banana", "Cherry", "Date"].map((label) => (
          <Checkbox key={label} name="fruits" label={label} />
        ))}
      </CheckboxGroup>
    </CarbonProvider>
  ),
  args: {
    legend: "What fruits do you have?",
    legendHelp: "Legend Help",
  },
};

export const RequiredGroup: Story = {
  ...Default,
  args: {
    ...Default.args,
    required: true,
  },
};

export const Inline: Story = {
  render: (args) => (
    <CarbonProvider validationRedesignOptIn>
      <CheckboxGroup {...args}>
        {["Apple", "Banana", "Cherry", "Date"].map((label) => (
          <Checkbox key={label} name="fruits" label={label} />
        ))}
      </CheckboxGroup>
    </CarbonProvider>
  ),
  args: {
    inline: true,
    required: true,
    legend: "What fruits do you have?",
  },
};

export const LegacyInlineLegend: Story = {
  ...Default,
  args: {
    ...Default.args,
    legendInline: true,
    legendWidth: 20,
    legendAlign: "left",
    legendSpacing: 2,
  },
};
