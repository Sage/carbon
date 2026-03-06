import React, { useState } from "react";
import { RadioButton, RadioButtonGroup } from ".";
import Box from "../box";
import Textbox from "../textbox";

export const RadioButtonGroupControlled = ({ ...args }) => {
  const [value, setValue] = useState("radio1");

  return (
    <RadioButtonGroup
      name="radio-group"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...args}
    >
      <RadioButton id="radio-1" value="radio1" label="Radio Button 1" />
      <RadioButton id="radio-2" value="radio2" label="Radio Button 2" />
      <RadioButton id="radio-3" value="radio3" label="Radio Button 3" />
    </RadioButtonGroup>
  );
};

export const RadioButtonControlled = ({ ...args }) => {
  const [value, setValue] = useState("radio1");

  return (
    <RadioButtonGroup
      name="radio-group"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <RadioButton id="radio-1" value="radio1" label="Radio Button" {...args} />
    </RadioButtonGroup>
  );
};

export const RadioButtonWithConditionalContent = ({ ...args }) => {
  const [value, setValue] = useState("radio1");
  const [textboxValue, setTextboxValue] = useState("");

  const conditionalContent = (
    <Box mr={1} width="300px">
      <Textbox
        label="Revealed Textbox"
        value={textboxValue}
        onChange={(ev) => setTextboxValue(ev.target.value)}
      />
    </Box>
  );

  return (
    <RadioButtonGroup
      name="radio-group"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <RadioButton
        id="radio-1"
        value="radio1"
        label="Radio Button 1"
        conditionalContent={conditionalContent}
        {...args}
      />
      <RadioButton id="radio-2" value="radio2" label="Radio Button 2" />
      <RadioButton id="radio-3" value="radio3" label="Radio Button 3" />
    </RadioButtonGroup>
  );
};
