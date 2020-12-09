import React, { useState } from "react";
import { text, object, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { SimpleColorPicker, SimpleColor } from ".";

export default {
  title: "Experimental/Simple Color Picker/Test",
  component: SimpleColorPicker,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

// eslint-disable-next-line react/prop-types
export const Default = () => {
  const [state, setState] = useState("");
  const name = text("name", "basicPicker");
  const legend = text("legend", "Pick a colour");
  const demoColors = [
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
  const availableColors = object("availableColors", demoColors);

  const onChange = (e) => {
    const { value } = e.target;
    setState(value);
    action(`Selected - ${value}`)(e);
  };

  return (
    <SimpleColorPicker
      name={name}
      legend={legend}
      onChange={onChange}
      onBlur={(ev) => action("Blur")(ev)}
      value={state}
      required={boolean("required", false)}
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

Default.story = {
  name: "default",
};
