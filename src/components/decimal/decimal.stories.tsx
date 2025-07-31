import React, { useState } from "react";
import { ArgTypes, Meta, StoryObj } from "@storybook/react";

import Decimal, { DecimalProps, CustomEvent } from ".";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [state, setState] = useState("0.01");
    const setValue = ({ target }: CustomEvent) => {
      setState(target.value.rawValue);
    };
    return <Decimal {...args} value={state} onChange={setValue} />;
  },
  args: { label: "Decimal" },
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

export const LabelAlign: Story = () => {
  const [state, setState] = useState({
    right: "0.01",
    left: "0.01",
  });
  const handleChange =
    (alignment: DecimalProps["labelAlign"]) => (e: CustomEvent) => {
      setState({ ...state, [alignment || "left"]: e.target.value.rawValue });
    };
  return (["right", "left"] as const).map((alignment) => (
    <Decimal
      label="Decimal"
      labelInline
      inputWidth={50}
      key={alignment}
      labelAlign={alignment}
      value={state[alignment]}
      onChange={handleChange(alignment)}
    />
  ));
};
LabelAlign.storyName = "Label Align";

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

export const WithLabelHelp: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, labelHelp: "Help", helpAriaLabel: "Help" },
  name: "With Label Help",
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

export const LeftAligned: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, required: true, align: "left" },
  name: "Left Aligned",
};
