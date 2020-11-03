import React, { useState } from "react";
import { text, object, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import AdvancedColorPicker from ".";

export default {
  title: "Design System/Advanced Color Picker/Test",
  component: AdvancedColorPicker,
  decorators: [withKnobs],
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disable: true,
    },
  },
};

export const Basic = () => {
  const [state, setState] = useState({
    open: false,
    selectedColor: null,
  });

  const onOpen = (e) => {
    setState({
      open: true,
      selectedColor: state.selectedColor,
    });

    action("Open")(e);
  };

  const onClose = (e) => {
    setState({
      open: false,
      selectedColor: state.selectedColor,
    });

    action("Close")(e);
  };

  const onChange = (e) => {
    const { value } = e.target;

    setState({
      selectedColor: value,
    });

    action(`Selected - ${value}`)(e);
  };

  const onBlur = (e) => {
    action("Blur")(e);
  };

  const demoColors = [
    { value: "#FFFFFF", label: "white" },
    { value: "transparent", label: "transparent" },
    { value: "#000000", label: "black" },
    { value: "#A3CAF0", label: "blue" },
    { value: "#FD9BA3", label: "pink" },
    { value: "#B4AEEA", label: "purple" },
    { value: "#ECE6AF", label: "goldenrod" },
    { value: "#EBAEDE", label: "orchid" },
    { value: "#EBC7AE", label: "desert" },
    { value: "#AEECEB", label: "turquoise" },
    { value: "#AEECD6", label: "mint" },
  ];
  const name = text("name", "advancedPicker");
  const availableColors = object("availableColors", demoColors);

  return (
    <AdvancedColorPicker
      name={name}
      onOpen={onOpen}
      onClose={onClose}
      onChange={onChange}
      onBlur={onBlur}
      availableColors={availableColors}
      selectedColor={state.selectedColor}
      defaultColor="#EBAEDE"
      open={state.open}
    />
  );
};

Basic.story = {
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
