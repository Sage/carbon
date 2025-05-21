import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Number, { NumberProps } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Number> = {
  title: "Number Input",
  component: Number,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Number>;

export const Default: Story = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return <Number label="Number" value={state} onChange={setValue} />;
};
Default.storyName = "Default";

export const Sizes: Story = () => {
  const sizes: NumberProps["size"][] = ["small", "medium", "large"];

  return (
    <>
      {sizes.map((size) => (
        <Number
          key={`Number - ${size}`}
          label={`Number - ${size}`}
          value="123456"
          size={size}
          mb={2}
        />
      ))}
    </>
  );
};
Sizes.storyName = "Sizes";

export const Disabled: Story = () => {
  return <Number label="Number" value="123456" disabled />;
};
Disabled.storyName = "Disabled";

export const ReadOnly: Story = () => {
  return <Number label="Number" value="123456" readOnly />;
};
ReadOnly.storyName = "Read Only";

export const WithLabelInline: Story = () => {
  return <Number label="Number" value="123456" labelInline />;
};
WithLabelInline.storyName = "With Label Inline";
WithLabelInline.parameters = { chromatic: { disableSnapshot: true } };

export const WithLabelAlign: Story = () => {
  const alignments: NumberProps["align"][] = ["right", "left"];

  return (
    <>
      {alignments.map((alignment) => (
        <Number
          label="Number"
          labelInline
          value="123456"
          inputWidth={50}
          key={alignment}
          labelAlign={alignment}
        />
      ))}
    </>
  );
};
WithLabelAlign.storyName = "With Label Align";

export const WithCustomMaxWidth: Story = () => {
  return <Number label="Number" value="123456" maxWidth="50%" />;
};
WithCustomMaxWidth.storyName = "With Custom Max Width";

export const WithFieldHelp: Story = () => {
  return <Number label="Number" value="123456" fieldHelp="Help" />;
};
WithFieldHelp.storyName = "With Field Help";

export const WithInputHint: Story = () => (
  <Number label="Number" value="123456" inputHint="Hint text (optional)." />
);
WithInputHint.storyName = "With Input Hint";

export const WithLabelHelp: Story = () => {
  return (
    <Number
      label="Number"
      value="123456"
      labelHelp="Help"
      helpAriaLabel="Help"
    />
  );
};
WithLabelHelp.storyName = "With Label Help";

export const Required: Story = () => {
  return <Number label="Number" value="123456" required />;
};
Required.storyName = "Required";

export const IsOptional: Story = () => {
  return <Number label="Number" value="123456" isOptional />;
};
IsOptional.storyName = "IsOptional";
