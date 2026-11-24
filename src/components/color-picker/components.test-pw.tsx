import React, { useState } from "react";

import ColorPicker, { ColorPickerColor, ColorPickerProps } from ".";

const ColorPickerComponent = ({
  value: initialValue = "",
  ...props
}: Partial<ColorPickerProps>) => {
  const [value, setValue] = useState<ColorPickerColor | "">(initialValue);

  return (
    <ColorPicker
      label="Select colour"
      {...props}
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
    />
  );
};

export default ColorPickerComponent;
