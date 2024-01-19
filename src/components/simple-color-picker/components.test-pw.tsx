import React from "react";
import {
  SimpleColorPicker,
  SimpleColor,
  SimpleColorPickerProps,
  SimpleColorProps,
} from ".";

const colors = [
  {
    color: "#FFFFFF",
    label: "transparent",
  },
  {
    color: "#0073C1",
    label: "blue",
  },
  {
    color: "#582C83",
    label: "purple",
  },
  {
    color: "#E96400",
    label: "orange",
  },
  {
    color: "#99ADB6",
    label: "gray",
  },
  {
    color: "#C7384F",
    label: "flush mahogany",
  },
  {
    color: "#004500",
    label: "dark green",
  },
  {
    color: "#FFB500",
    label: "yellow",
  },
  {
    color: "#335C6D",
    label: "dark blue",
  },
  {
    color: "#00DC00",
    label: "light blue",
  },
];

export const SimpleColorPickerCustom = ({
  onChange,
  ...props
}: Partial<SimpleColorPickerProps>) => {
  const [state, setState] = React.useState("transparent");
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    if (onChange) {
      onChange(ev);
    }
    setState(value);
  };
  return (
    <SimpleColorPicker
      name="picker-default-example"
      legend="Legend"
      onChange={handleChange}
      value={state}
      {...props}
    >
      {colors.map(({ color, label }) => (
        <SimpleColor value={color} key={color} aria-label={label} id={color} />
      ))}
    </SimpleColorPicker>
  );
};

export const SimpleColorCustom = ({
  onChange,
  ...props
}: Partial<SimpleColorProps>) => {
  const [state, setState] = React.useState("transparent");
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    if (onChange) {
      onChange(ev);
    }
    setState(value);
  };
  return (
    <>
      <SimpleColor
        value={state}
        key={colors[0].color}
        aria-label={colors[0].label}
        id={colors[0].color}
        onChange={handleChange}
        {...props}
      />
      <SimpleColor
        value={state}
        key={colors[1].color}
        aria-label={colors[1].label}
        id={colors[1].color}
        onChange={handleChange}
        {...props}
      />
    </>
  );
};
