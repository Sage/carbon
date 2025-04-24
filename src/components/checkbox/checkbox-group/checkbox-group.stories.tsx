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

export const RequiredGroup: Story = {
  ...Default,
  args: {
    ...Default.args,
    required: true,
  },
};

export const OptionalGroup: Story = {
  ...Default,
  args: {
    ...Default.args,
    isOptional: true,
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

export const ErrorState: Story = {
  render: (args) => (
    <CarbonProvider validationRedesignOptIn>
      <CheckboxGroup {...args}>
        <Checkbox label="Apple" name="Apple" />
        <Checkbox label="Banana" name="Banana" />
        <Checkbox label="Cherry" name="Cherry" />
      </CheckboxGroup>
    </CarbonProvider>
  ),
  args: {
    error: "One or more fruits must be selected",
    legend: "What fruits do you have?",
    required: true,
  },
};

export const WarningState: Story = {
  render: (args) => (
    <CarbonProvider validationRedesignOptIn>
      <CheckboxGroup {...args}>
        <Checkbox label="Apple" name="Apple" />
        <Checkbox label="Banana" name="Banana" />
        <Checkbox label="Cherry" name="Cherry" />
      </CheckboxGroup>
    </CarbonProvider>
  ),
  args: {
    warning: "One or more fruits are recommended",
    legend: "What fruits do you have?",
  },
};

export const LegacyErrorState: Story = {
  ...Default,
  args: {
    ...Default.args,
    error: "One or more fruits must be selected",
  },
};

export const LegacyWarningState: Story = {
  ...Default,
  args: {
    ...Default.args,
    warning: "One or more fruits are recommended",
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
