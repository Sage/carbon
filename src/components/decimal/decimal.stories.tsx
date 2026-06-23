import React, { useState } from "react";
import { ArgTypes, Meta, StoryObj } from "@storybook/react-vite";

import Decimal, { DecimalProps, CustomEvent } from ".";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import Box from "../box";
import { Select, Option } from "../select";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
}) as Partial<ArgTypes<DecimalProps>>;

const meta: Meta<typeof Decimal> = {
  title: "Decimal Input",
  component: Decimal,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Decimal>;

/* TODO: we really need a better of having a reusable default story that can show state
 * I've checked how it used to be and you couldn't see the state setting at that point either
 * I've put a message on the Storybook Discord but it's been ignored so will need to chase or ask on git */
export const DefaultStory: Story = {
  render: (args: DecimalProps) => {
    const [state, setState] = useState("0.01");
    const setValue = ({ target }: CustomEvent) => {
      setState(target.value.rawValue);
    };
    return <Decimal {...args} value={state} onChange={setValue} />;
  },
  args: { label: "Decimal", required: true },
  name: "Default",
};

export const Sizes: Story = () => {
  const [state, setState] = useState({
    small: "0.01",
    medium: "0.01",
    large: "0.01",
  });

  const handleChange = (size: DecimalProps["size"]) => (e: CustomEvent) => {
    setState({ ...state, [size || "small"]: e.target.value.rawValue });
  };

  return (["small", "medium", "large"] as const).map((size) => (
    <Decimal
      key={`Decimal - ${size}`}
      label={`Decimal - ${size}`}
      value={state[size]}
      onChange={handleChange(size)}
      size={size}
      mb={2}
    />
  ));
};
Sizes.storyName = "Sizes";

export const Disabled: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, disabled: true },
  name: "Disabled",
};

export const Prefix: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, prefix: "£", maxWidth: "20%" },
  name: "Prefix",
};

export const Suffix: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, suffix: "kg", maxWidth: "20%" },
  name: "Suffix",
};

export const WithPopoverContainer: Story = {
  render: (args: DecimalProps) => {
    const [state, setState] = useState("0.01");
    const [selectValue, setSelectValue] = useState("1");
    const setValue = ({ target }: CustomEvent) => {
      setState(target.value.rawValue);
    };
    return (
      <Decimal
        {...args}
        value={state}
        onChange={setValue}
        popoverContainerContent={
          <Box m="24px">
            <Select
              name="simple"
              id="simple"
              label="Select a colour"
              value={selectValue}
              onChange={(ev) => setSelectValue(ev.target.value)}
            >
              <Option text="Amber" value="1" />
              <Option text="Black" value="2" />
              <Option text="Blue" value="3" />
              <Option text="Brown" value="4" />
              <Option text="Green" value="5" />
              <Option text="Orange" value="6" />
              <Option text="Pink" value="7" />
              <Option text="Purple" value="8" />
              <Option text="Red" value="9" />
              <Option text="White" value="10" />
              <Option text="Yellow" value="11" />
            </Select>
          </Box>
        }
      />
    );
  },
  args: { label: "Decimal", maxWidth: "40%" },
  name: "With Popover Container",
};

export const WithPopoverPosition: Story = {
  render: (args: DecimalProps) => {
    const [state, setState] = useState("0.01");
    const [selectValue, setSelectValue] = useState("1");
    const setValue = ({ target }: CustomEvent) => {
      setState(target.value.rawValue);
    };
    return (
      <Decimal
        {...args}
        value={state}
        onChange={setValue}
        popoverContainerContent={
          <Box m="24px">
            <Select
              name="simple"
              id="simple"
              label="Select a colour"
              value={selectValue}
              onChange={(ev) => setSelectValue(ev.target.value)}
            >
              <Option text="Amber" value="1" />
              <Option text="Black" value="2" />
              <Option text="Blue" value="3" />
              <Option text="Brown" value="4" />
              <Option text="Green" value="5" />
              <Option text="Orange" value="6" />
              <Option text="Pink" value="7" />
              <Option text="Purple" value="8" />
              <Option text="Red" value="9" />
              <Option text="White" value="10" />
              <Option text="Yellow" value="11" />
            </Select>
          </Box>
        }
      />
    );
  },
  args: { label: "Decimal", maxWidth: "40%", popoverPosition: "left" },
  argTypes: {
    popoverPosition: {
      options: ["left", "right", "center"],
      control: { type: "select" },
    },
  },
  name: "With Popover Position",
};

export const ReadOnly: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, readOnly: true },
  name: "Read Only",
};

export const Empty: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, allowEmptyValue: true },
  name: "Empty",
};
Empty.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithCustomPrecision: Story = () => {
  const [state, setState] = useState("0.0001");
  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };
  return (
    <Decimal label="Decimal" value={state} onChange={setValue} precision={4} />
  );
};
WithCustomPrecision.storyName = "With Custom Precision";

export const LabelInline: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, labelInline: true },
  parameters: { chromatic: { disableSnapshot: true } },
  name: "Label Inline",
};

export const WithCustomMaxWidth: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, maxWidth: "50%" },
  name: "With Custom Max Width",
};

export const WithFieldHelp: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, fieldHelp: "Help" },
  name: "With Field Help",
};

export const WithInputHint: Story = {
  ...DefaultStory,
  args: {
    ...DefaultStory.args,
    inputHint: "Hint text (optional).",
    helpAriaLabel: "Help",
  },
  name: "With Input Hint",
};

export const Required: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, required: true, helpAriaLabel: "Help" },
  name: "Required",
};
Required.parameters = {
  chromatic: { disableSnapshot: true },
};

export const LeftAligned: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, required: true, align: "left" },
  name: "Left Aligned",
};
