import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, CheckboxProps, CheckboxGroup } from ".";
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

export const WithLabel: Story = {
  render: ControlledCheckbox,
  args: {
    label: "Checkbox",
  },
};

export const WithInputHint: Story = {
  ...WithLabel,
  args: {
    ...WithLabel.args,
    inputHint: "Input Hint",
  },
};

export const Sizes: Story = () => {
  const [checkedSmall, setCheckedSmall] = useState(false);
  const [checkedMedium, setCheckedMedium] = useState(false);
  const [checkedLarge, setCheckedLarge] = useState(false);

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-around">
      <Checkbox
        label="Small Checkbox"
        size="small"
        checked={checkedSmall}
        onChange={() => {
          setCheckedSmall(!checkedSmall);
        }}
      />
      <Checkbox
        label="Medium Checkbox"
        size="medium"
        checked={checkedMedium}
        onChange={() => {
          setCheckedMedium(!checkedMedium);
        }}
      />
      <Checkbox
        label="Large Checkbox"
        size="large"
        checked={checkedLarge}
        onChange={() => {
          setCheckedLarge(!checkedLarge);
        }}
      />
    </Box>
  );
};
Sizes.storyName = "Sizes";

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
  ...WithLabel,
  args: {
    ...WithLabel.args,
    checked: true,
    progressiveDisclosure: <DisclosedContent />,
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

const CustomLabel = () => (
  <>
    <Icon type="placeholder" aria-hidden />
    Checkbox
  </>
);

export const WithCustomLabel: Story = {
  render: ControlledCheckbox,
  args: {
    label: <CustomLabel />,
  },
};

export const Required: Story = {
  ...WithLabel,
  args: {
    ...WithLabel.args,
    required: true,
  },
};

export const Disabled: Story = {
  ...WithInputHint,
  args: {
    ...WithInputHint.args,
    required: true,
    disabled: true,
  },
};
