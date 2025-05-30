import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import AdvancedColorPicker, { AdvancedColorPickerProps } from ".";

export default {
  title: "Advanced Color Picker/Test",
  component: AdvancedColorPicker,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  args: {
    onBlur: action("onBlur"),
  },
};

export const Default = (args: Partial<AdvancedColorPickerProps>) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("orchid");
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setColor(target.value);
  };
  return (
    <AdvancedColorPicker
      {...args}
      name="advancedPicker"
      availableColors={[
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
      ]}
      defaultColor="#EBAEDE"
      selectedColor={color}
      onChange={onChange}
      onOpen={() => {
        setOpen(!open);
      }}
      onClose={() => {
        setOpen(false);
      }}
      open={open}
    />
  );
};
