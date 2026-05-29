import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import { Checkbox, CheckboxProps } from ".";
import Box from "../box";
import Textbox from "../textbox";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta = {
  title: "Checkbox/Test",
  component: Checkbox,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

const ControlledCheckbox = ({
  ...args
}: Omit<CheckboxProps, "checked" | "onChange">) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Checkbox
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
      {...args}
    />
  );
};
export const Validation: Story = {
  render: (args) => (
    <Box m={2} display="flex" gap={4}>
      <Box display="flex" flexDirection="column" gap={2}>
        <ControlledCheckbox
          label="With Error Small"
          error="Error Message"
          size="small"
          required
          {...args}
        />
        <ControlledCheckbox
          label="With Warning Small"
          warning="Warning Message"
          size="small"
          {...args}
        />
        <ControlledCheckbox
          label="With Error at Bottom Small"
          error="Error Message"
          validationMessagePositionTop={false}
          size="small"
          {...args}
        />
        <ControlledCheckbox
          label="With Warning at Bottom Small"
          warning="Warning Message"
          validationMessagePositionTop={false}
          size="small"
          {...args}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <ControlledCheckbox
          label="With Error"
          error="Error Message"
          required
          {...args}
        />
        <ControlledCheckbox
          label="With Warning"
          warning="Warning Message"
          {...args}
        />
        <ControlledCheckbox
          label="With Error at Bottom"
          error="Error Message"
          validationMessagePositionTop={false}
          {...args}
        />
        <ControlledCheckbox
          label="With Warning at Bottom"
          warning="Warning Message"
          validationMessagePositionTop={false}
          {...args}
        />
      </Box>
      <Box display="flex" flexDirection="column" gap={2}>
        <ControlledCheckbox
          label="With Error Large"
          error="Error Message"
          size="large"
          required
          {...args}
        />
        <ControlledCheckbox
          label="With Warning Large"
          warning="Warning Message"
          size="large"
          {...args}
        />
        <ControlledCheckbox
          label="With Error at Bottom Large"
          error="Error Message"
          validationMessagePositionTop={false}
          size="large"
          {...args}
        />
        <ControlledCheckbox
          label="With Warning at Bottom Large"
          warning="Warning Message"
          validationMessagePositionTop={false}
          size="large"
          {...args}
        />
      </Box>
    </Box>
  ),
  args: {
    inputHint: "Hint Text",
  },
};

const DisclosedContent = () => {
  const [textboxValue, setTextboxValue] = useState("");

  return (
    <Box width="300px">
      <Textbox
        label="Revealed Textbox"
        value={textboxValue}
        onChange={(ev) => setTextboxValue(ev.target.value)}
      />
    </Box>
  );
};

export const ProgressiveDisclosure: Story = {
  render: (args) => (
    <>
      <ControlledCheckbox
        label="Progressive Disclosure Small"
        size="small"
        {...args}
      />
      <ControlledCheckbox
        label="Progressive Disclosure Medium"
        size="medium"
        {...args}
      />
      <ControlledCheckbox
        label="Progressive Disclosure Large"
        size="large"
        {...args}
      />
    </>
  ),
  args: {
    mb: 2,
    checked: true,
    progressiveDisclosure: <DisclosedContent />,
  },
  parameters: {
    chromatic: { delay: 500 },
  },
};

export const IndeterminateSizesWithFocus: Story = {
  render: (args) => (
    <>
      <ControlledCheckbox label="Indeterminate Small" size="small" {...args} />
      <ControlledCheckbox
        label="Indeterminate Medium"
        size="medium"
        {...args}
      />
      <ControlledCheckbox label="Indeterminate Large" size="large" {...args} />
    </>
  ),
  args: {
    mb: 2,
    indeterminate: true,
  },
  parameters: {
    pseudo: {
      focus: '[aria-checked="mixed"]',
    },
  },
};
