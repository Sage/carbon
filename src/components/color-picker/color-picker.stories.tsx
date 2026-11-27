import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import Box from "../box";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import ColorPicker, { ColorPickerColor, ColorPickerProps } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof ColorPicker> = {
  title: "Color Picker",
  component: ColorPicker,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [
    (Story) => (
      <Box height={500}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

const ControlledColorPicker = ({
  value: initialValue = "",
  ...args
}: Partial<ColorPickerProps>) => {
  const [value, setValue] = useState<ColorPickerColor | "">(initialValue);

  return (
    <ColorPicker
      label="Select colour"
      {...args}
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    />
  );
};

export const Default: Story = {
  render: (args) => <ControlledColorPicker {...args} />,
  args: {
    label: "Select colour",
    inputHint: "Hint text",
  },
};
Default.storyName = "Default";

export const Rich: Story = {
  render: () => (
    <ControlledColorPicker label="Rich colour" palette="rich" value="blue" />
  ),
};
Rich.storyName = "Rich palette";

export const Muted: Story = {
  render: () => (
    <ControlledColorPicker label="Muted colour" palette="muted" value="pink" />
  ),
};
Muted.storyName = "Muted palette";

export const FilteredColors: Story = {
  render: () => (
    <ControlledColorPicker
      label="Tag colour"
      colors={["blue", "teal", "green", "orange", "red"]}
    />
  ),
};
FilteredColors.storyName = "Filtering the available colours";

export const Sizes: Story = {
  render: () => (
    <>
      {(["small", "medium", "large"] as const).map((size) => (
        <ControlledColorPicker
          key={size}
          label={`Select colour (${size})`}
          size={size}
          value="pink"
          palette="muted"
          mb={2}
        />
      ))}
    </>
  ),
};
Sizes.storyName = "Sizes";

export const Validation: Story = {
  render: () => (
    <>
      <ControlledColorPicker
        label="Select colour"
        inputHint="Hint text"
        error="Error message (fix is required)"
        value="pink"
        palette="muted"
        required
        mb={2}
      />
      <ControlledColorPicker
        label="Select colour"
        inputHint="Hint text"
        warning="Warning message (fix is optional)"
        value="pink"
        palette="muted"
      />
    </>
  ),
};
Validation.storyName = "Validation";

export const DisabledAndReadOnly: Story = {
  render: () => (
    <>
      <ControlledColorPicker
        label="Disabled"
        value="pink"
        palette="muted"
        disabled
        mb={2}
      />
      <ControlledColorPicker
        label="Read only"
        value="pink"
        palette="muted"
        readOnly
      />
    </>
  ),
};
DisabledAndReadOnly.storyName = "Disabled and read only";
