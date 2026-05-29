import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

import { CheckboxGroup, Checkbox, CheckboxGroupProps } from "..";
import Box from "../../box";

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
    themeProvider: { chromatic: { theme: "sage" } },
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

const ControlledCheckboxGroup = (args: CheckboxGroupProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

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
      {["1", "2", "3"].map((option) => (
        <Checkbox
          key={option}
          label={`Checkbox ${option}`}
          value={`checkbox-${option}`}
          checked={selectedValues.includes(`checkbox-${option}`)}
          onChange={handleChange}
        />
      ))}
    </CheckboxGroup>
  );
};

export const Default: Story = {
  render: ControlledCheckboxGroup,
};

export const WithLegend: Story = {
  ...Default,
  args: {
    legend: "Legend",
  },
};

export const WithLegendHint: Story = {
  ...WithLegend,
  args: {
    ...WithLegend.args,
    legendHint: "Legend Hint",
  },
};

export const Inline: Story = {
  ...WithLegend,
  args: {
    ...WithLegend.args,
    inline: true,
  },
};

export const Sizes: Story = () => {
  const [valuesBySize, setValuesBySize] = useState<
    Record<"small" | "medium" | "large", string[]>
  >({
    small: [],
    medium: [],
    large: [],
  });

  const handleChange =
    (size: "small" | "medium" | "large") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;
      setValuesBySize((prev) => ({
        ...prev,
        [size]: checked
          ? [...prev[size], value]
          : prev[size].filter((val) => val !== value),
      }));
    };

  const sizeConfigs: Array<{
    size: "small" | "medium" | "large";
    legend: string;
  }> = [
    { size: "small", legend: "Small Checkbox Group" },
    { size: "medium", legend: "Medium Checkbox Group" },
    { size: "large", legend: "Large Checkbox Group" },
  ];

  const options = ["1", "2", "3"];

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-around"
      flexWrap="wrap"
      gap="var(--spacing-400)"
    >
      {sizeConfigs.map(({ size, legend }) => (
        <CheckboxGroup key={size} legend={legend} size={size}>
          {options.map((option) => {
            const value = `${size}-${option}`;
            return (
              <Checkbox
                key={value}
                value={value}
                label={`Checkbox ${option}`}
                checked={valuesBySize[size].includes(value)}
                onChange={handleChange(size)}
              />
            );
          })}
        </CheckboxGroup>
      ))}
    </Box>
  );
};
Sizes.storyName = "Sizes";

export const Required: Story = {
  ...WithLegend,
  args: {
    ...WithLegend.args,
    required: true,
  },
};

export const Disabled: Story = {
  ...WithLegendHint,
  args: {
    ...WithLegendHint.args,
    required: true,
    disabled: true,
  },
};
