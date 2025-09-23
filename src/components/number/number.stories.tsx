import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Number, { NumberProps } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Number> = {
  title: "Deprecated/Number Input",
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
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <>
      {sizes.map((size) => (
        <Number
          key={`Number - ${size}`}
          label={`Number - ${size}`}
          value={state}
          onChange={setValue}
          size={size}
          mb={2}
        />
      ))}
    </>
  );
};
Sizes.storyName = "Sizes";

export const Disabled: Story = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Number label="Number" value={state} onChange={setValue} disabled />;
};
Disabled.storyName = "Disabled";

export const ReadOnly: Story = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Number label="Number" value={state} onChange={setValue} readOnly />;
};
ReadOnly.storyName = "Read Only";

export const WithLabelInline: Story = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Number label="Number" value={state} onChange={setValue} labelInline />
  );
};
WithLabelInline.storyName = "With Label Inline";
WithLabelInline.parameters = { chromatic: { disableSnapshot: true } };

export const WithLabelAlign: Story = () => {
  const alignments: NumberProps["align"][] = ["right", "left"];
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <>
      {alignments.map((alignment) => (
        <Number
          label="Number"
          labelInline
          value={state}
          onChange={setValue}
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
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Number label="Number" value={state} onChange={setValue} maxWidth="50%" />
  );
};
WithCustomMaxWidth.storyName = "With Custom Max Width";

export const WithFieldHelp: Story = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Number label="Number" value={state} onChange={setValue} fieldHelp="Help" />
  );
};
WithFieldHelp.storyName = "With Field Help";

export const WithInputHint: Story = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Number
      label="Number"
      value={state}
      onChange={setValue}
      inputHint="Hint text (optional)."
    />
  );
};
WithInputHint.storyName = "With Input Hint";

export const WithLabelHelp: Story = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return (
    <Number
      label="Number"
      value={state}
      onChange={setValue}
      labelHelp="Help"
      helpAriaLabel="Help"
    />
  );
};
WithLabelHelp.storyName = "With Label Help";

export const Required: Story = () => {
  const [state, setState] = useState("123456");
  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };
  return <Number label="Number" value={state} onChange={setValue} required />;
};
Required.storyName = "Required";
