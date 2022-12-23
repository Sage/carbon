import React, { useState } from "react";
import { SimpleColorPicker, SimpleColor } from ".";

export const Default = () => {
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

export const Disabled = () => {
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

export const Required = () => {
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

export const WithMargin = () => {
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
