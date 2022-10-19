import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import { Checkbox, CheckboxProps } from ".";

interface StoryProps {
  labelSpecialCharacters?: string;
  fieldHelpSpecialCharacters?: string;
  labelHelpSpecialCharacters?: string;
}

export default {
  title: "Checkbox/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: false,
    },
  },
  argTypes: {
    labelSpacing: {
      options: [1, 2],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["small", "large"],
      control: {
        type: "select",
      },
    },
    inputWidth: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
      },
    },
    labelWidth: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
      },
    },
    adaptiveSpacingBreakpoint: {
      control: {
        type: "number",
      },
    },
    labelSpecialCharacters: specialCharacters,
    fieldHelpSpecialCharacters: specialCharacters,
    labelHelpSpecialCharacters: specialCharacters,
  },
};

export const Default = ({
  label,
  labelSpecialCharacters,
  fieldHelp,
  fieldHelpSpecialCharacters,
  labelHelp,
  labelHelpSpecialCharacters,
  ...args
}: CheckboxProps & StoryProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setIsChecked(checked);
    action("change")(`checked: ${checked}`);
  };
  return (
    <Checkbox
      onChange={handleChange}
      checked={isChecked}
      onBlur={action("onBlur")}
      label={label || labelSpecialCharacters}
      fieldHelp={fieldHelp || fieldHelpSpecialCharacters}
      labelHelp={labelHelp || labelHelpSpecialCharacters}
      helpAriaLabel={(labelHelp as string) || labelHelpSpecialCharacters}
      {...args}
    />
  );
};

Default.storyName = "default";

Default.args = {
  key: "",
  label: "Example Checkbox",
  labelSpecialCharacters: undefined,
  autoFocus: false,
  disabled: false,
  fieldHelp: "This text provides help for the input.",
  fieldHelpSpecialCharacters: undefined,
  fieldHelpInline: false,
  reverse: false,
  labelHelp: "This text provides more information for the label.",
  labelHelpSpecialCharacters: undefined,
  inputWidth: 0,
  labelWidth: 0,
  labelSpacing: 1,
  size: "small",
  value: "",
  ml: "0",
  adaptiveSpacingBreakpoint: undefined,
  required: false,
};
