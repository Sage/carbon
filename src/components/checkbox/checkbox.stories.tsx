import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, CheckboxProps } from ".";
import Box from "../box";
import Textbox from "../textbox";
import Icon from "../icon";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta = {
  title: "Checkbox",
  component: Checkbox,
  argTypes: {
    ...styledSystemProps,
    label: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    controls: {
      exclude: ["onChange", "value"],
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {
  render: (args) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
    );
  },
  args: {
    label: "Checkbox",
    inputHint: "Hint text",
    disabled: false,
    required: false,
    size: "medium",
    indeterminate: false,
    error: "",
    progressiveDisclosure: "Additional content shown when checked",
  },
};
Playground.storyName = "Playground";

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

const CustomLabel = () => (
  <>
    <Icon type="placeholder" aria-hidden />
    Checkbox
  </>
);

export const ProgressiveDisclosure: Story = {
  render: ControlledCheckbox,
  args: {
    label: "Checkbox",
    progressiveDisclosure: <DisclosedContent />,
  },
};

export const WithCustomLabel: Story = {
  render: ControlledCheckbox,
  args: {
    label: <CustomLabel />,
  },
};
