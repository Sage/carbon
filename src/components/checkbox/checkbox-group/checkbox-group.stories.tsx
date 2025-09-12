import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";
import CarbonProvider from "../../carbon-provider";

import { CheckboxGroup, Checkbox, CheckboxGroupProps } from "..";

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

const ControlledCheckboxGroup = (args: CheckboxGroupProps) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedValues((prev) => [...prev, value]);
    } else {
      setSelectedValues((prev) => prev.filter((val) => val !== value));
    }
  };
  return (
    <CheckboxGroup {...args}>
      {["Apple", "Banana", "Cherry", "Date"].map((label) => (
        <Checkbox
          key={label}
          name="fruits"
          label={label}
          value={label}
          checked={selectedValues.includes(label)}
          onChange={handleChange}
        />
      ))}
    </CheckboxGroup>
  );
};

export const Default: Story = {
  render: (args) => (
    <CheckboxGroup {...args}>
      {["Apple", "Banana", "Cherry", "Date"].map((label) => (
        <Checkbox
          key={label}
          name="fruits"
          label={label}
          value={label}
          checked={false}
          onChange={() => {}}
        />
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
      <ControlledCheckboxGroup {...args} />
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
      <ControlledCheckboxGroup {...args} />
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
