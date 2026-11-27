import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, CheckboxGroup, CheckboxProps } from ".";
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

export const IndeterminateState: Story = () => {
  const [items, setItems] = useState([
    { id: "checkbox-1", label: "Checkbox 1", checked: true },
    { id: "checkbox-2", label: "Checkbox 2", checked: false },
    { id: "checkbox-3", label: "Checkbox 3", checked: false },
  ]);

  const checkedCount = items.filter((item) => item.checked).length;
  const allChecked = checkedCount === items.length;
  const someChecked = checkedCount > 0 && checkedCount < items.length;
  const controlledIds = items.map((item) => item.id).join(" ");

  const handleSelectAll = () => {
    const newChecked = !allChecked;
    setItems(items.map((item) => ({ ...item, checked: newChecked })));
  };

  const handleChange = (id: string, checked: boolean) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, checked } : item)),
    );
  };

  return (
    <>
      <Checkbox
        label="Select All"
        indeterminate={someChecked}
        checked={allChecked}
        onChange={handleSelectAll}
        aria-controls={controlledIds}
      />
      <CheckboxGroup m={2}>
        {items.map((item) => (
          <Checkbox
            key={item.id}
            id={item.id}
            label={item.label}
            checked={item.checked}
            onChange={(ev) => handleChange(item.id, ev.target.checked)}
          />
        ))}
      </CheckboxGroup>
    </>
  );
};
IndeterminateState.storyName = "Indeterminate State";
