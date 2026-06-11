import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import { SimpleColorPicker, SimpleColor } from ".";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof SimpleColorPicker> = {
  title: "Simple Color Picker",
  component: SimpleColorPicker,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof SimpleColorPicker>;

export const Default: Story = () => {
  const [state, setState] = useState("transparent");
  const colors = [
    { color: "transparent", label: "transparent" },
    { color: "#0073C1", label: "blue" },
    { color: "#582C83", label: "purple" },
    { color: "#E96400", label: "orange" },
    { color: "#99ADB6", label: "gray" },
    { color: "#C7384F", label: "flush mahogany" },
    { color: "#004500", label: "dark green" },
    { color: "#FFB500", label: "yellow" },
    { color: "#335C6D", label: "dark blue" },
    { color: "#00DC00", label: "light blue" },
  ];

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <SimpleColorPicker
      name="picker-default-example"
      legend="Legend"
      onChange={onChange}
      value={state}
    >
      {colors.map(({ color, label }) => (
        <SimpleColor value={color} key={color} aria-label={label} id={color} />
      ))}
    </SimpleColorPicker>
  );
};
Default.storyName = "Default";

export const Disabled: Story = () => {
  const [state, setState] = useState("transparent");

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <SimpleColorPicker
      name="picker-disabled-example"
      legend="Legend"
      onChange={onChange}
      value={state}
    >
      {[
        { color: "transparent", label: "transparent" },
        { color: "#0073C1", label: "blue" },
        { color: "#582C83", label: "purple" },
      ].map(({ color, label }) => (
        <SimpleColor
          value={color}
          key={color}
          aria-label={label}
          id={color}
          disabled
        />
      ))}
    </SimpleColorPicker>
  );
};
Disabled.storyName = "Disabled";

export const Required: Story = () => {
  const [state, setState] = useState("transparent");

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <SimpleColorPicker
      legend="Legend"
      required
      onChange={onChange}
      value={state}
      name="picker-required-example"
    >
      {[
        { color: "transparent", label: "transparent" },
        { color: "#0073C1", label: "blue" },
        { color: "#582C83", label: "purple" },
      ].map(({ color, label }) => (
        <SimpleColor value={color} key={color} aria-label={label} id={color} />
      ))}
    </SimpleColorPicker>
  );
};
Required.storyName = "Required";

export const WithMargin: Story = () => {
  const [state, setState] = useState("transparent");

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  const colors = [
    { color: "transparent", label: "transparent" },
    { color: "#0073C1", label: "blue" },
    { color: "#582C83", label: "purple" },
  ];

  return (
    <SimpleColorPicker
      name="with-margin"
      legend="Legend"
      onChange={onChange}
      value={state}
      m={4}
    >
      {colors.map(({ color, label }) => (
        <SimpleColor value={color} key={color} aria-label={label} />
      ))}
    </SimpleColorPicker>
  );
};
WithMargin.storyName = "With Margin";
