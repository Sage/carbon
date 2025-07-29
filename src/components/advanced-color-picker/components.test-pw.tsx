import React from "react";
import AdvancedColorPicker, { AdvancedColorPickerProps } from ".";

export const AdvancedColorPickerCustom = ({
  onChange,
  ...props
}: Partial<AdvancedColorPickerProps>) => {
  const [open, setOpen] = React.useState(true);
  const [color, setColor] = React.useState("#EBAEDE");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (onChange) {
      onChange(e);
    }
    setColor(value);
  };
  return (
    <AdvancedColorPicker
      aria-label="AdvancedColor"
      name="advancedColor"
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
      selectedColor={color}
      onChange={handleChange}
      onOpen={() => {
        setOpen(open);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onBlur={() => {}}
      open={open}
      {...props}
    />
  );
};

export default AdvancedColorPickerCustom;
