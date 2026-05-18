import React, { useState } from "react";
import { action } from "storybook/actions";
import { SimpleColorPicker, SimpleColor } from ".";

export default {
  title: "Simple Color Picker/Test",
  includeStories: [
    "Default",
    "ValidationsStringComponent",
    "ValidationsStringLabel",
    "ValidationsBoolean",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

type DefaultStoryProps = {
  availableColors: Record<string, string>[];
  name: string;
  legend: string;
};

export const Default = ({
  availableColors,
  name,
  legend,
  ...args
}: DefaultStoryProps) => {
  const [state, setState] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState(value);
    action(`Selected - ${value}`)(e);
  };
  return (
    <SimpleColorPicker
      onChange={onChange}
      onBlur={(ev) => action("Blur")(ev)}
      value={state}
      name={name}
      legend={legend}
      {...args}
    >
      {availableColors.map(({ color, label }) => (
        <SimpleColor
          value={color}
          key={color}
          aria-label={label}
          id={color}
          defaultChecked={color === "#582C83"}
        />
      ))}
    </SimpleColorPicker>
  );
};

Default.storyName = "default";
Default.args = {
  required: false,
  name: "basicPicker",
  legend: "Pick a colour",
  availableColors: [
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
  ],
};

export const ValidationsStringComponent = () => {
  const [state, setState] = useState("transparent");

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  const colors = [
    { color: "transparent", label: "transparent" },
    { color: "#0073C1", label: "blue" },
    { color: "#582C83", label: "purple" },
  ];

  return ["error", "warning", "info"].map((validationType) => (
    <SimpleColorPicker
      key={`${validationType}-string-component`}
      name={`picker-${validationType}-validation`}
      legend="Legend"
      onChange={onChange}
      {...{ [validationType]: "Message" }}
      value={state}
    >
      {colors.map(({ color, label }) => (
        <SimpleColor
          value={color}
          key={color}
          aria-label={label}
          id={`${validationType}-${color}`}
        />
      ))}
    </SimpleColorPicker>
  ));
};

ValidationsStringComponent.storyName = "validations string component";
ValidationsStringComponent.parameters = {
  chromatic: {
    disableSnapshot: false,
  },
};

export const ValidationsStringLabel = () => {
  const [state, setState] = useState("transparent");

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  const colors = [
    { color: "transparent", label: "transparent" },
    { color: "#0073C1", label: "blue" },
    { color: "#582C83", label: "purple" },
  ];

  return ["error", "warning", "info"].map((validationType) => (
    <SimpleColorPicker
      key={`${validationType}-string-legend`}
      name={`picker-${validationType}-validation-legend`}
      legend="Legend"
      validationOnLegend
      onChange={onChange}
      {...{ [validationType]: "Message" }}
      value={state}
    >
      {colors.map(({ color, label }) => (
        <SimpleColor
          value={color}
          key={color}
          aria-label={label}
          id={`${validationType}-${color}`}
        />
      ))}
    </SimpleColorPicker>
  ));
};

ValidationsStringLabel.storyName = "validations string label";
ValidationsStringLabel.parameters = {
  chromatic: {
    disableSnapshot: false,
  },
};

export const ValidationsBoolean = () => {
  const [state, setState] = useState("transparent");

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  const colors = [
    { color: "transparent", label: "transparent" },
    { color: "#0073C1", label: "blue" },
    { color: "#582C83", label: "purple" },
  ];

  return ["error", "warning", "info"].map((validationType) => (
    <SimpleColorPicker
      key={`${validationType}-boolean-component`}
      name={`picker-${validationType}-validation-boolean`}
      legend="Legend"
      onChange={onChange}
      {...{ [validationType]: true }}
      value={state}
    >
      {colors.map(({ color, label }) => (
        <SimpleColor
          value={color}
          key={color}
          aria-label={label}
          id={`${validationType}-${color}`}
        />
      ))}
    </SimpleColorPicker>
  ));
};

ValidationsBoolean.storyName = "validations boolean";
ValidationsBoolean.parameters = {
  chromatic: {
    disableSnapshot: false,
  },
};
