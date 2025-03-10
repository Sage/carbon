import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import { Checkbox, CheckboxGroup, CheckboxProps, CheckboxGroupProps } from ".";
import Box from "../box";
import CarbonProvider from "../carbon-provider";

export default {
  title: "Checkbox/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

export const Default = ({ ...args }: CheckboxProps) => {
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
      {...args}
    />
  );
};

Default.storyName = "default";

Default.args = {
  id: "default",
  label: "Example Checkbox",
  autoFocus: false,
  disabled: false,
  fieldHelp: "This text provides help for the input.",
  fieldHelpInline: false,
  reverse: false,
  labelHelp: "This text provides more information for the label.",
  inputWidth: 0,
  labelWidth: 0,
  labelSpacing: 1,
  size: "small",
  value: "",
  ml: "0",
  adaptiveSpacingBreakpoint: 0,
  required: false,
  isOptional: false,
  helpAriaLabel: "",
  validationOnLabel: false,
  validationIconId: "",
  error: "",
  warning: "",
  info: "",
};
Default.argTypes = {
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
};

export const WithLongLabel = ({ label, size, ...args }: CheckboxProps) => {
  return (
    <Box padding="25px" width="250px">
      <Checkbox size={size || "large"} label={label} mb={2} {...args} />
      <Checkbox label={label} size={size} {...args} />
    </Box>
  );
};

WithLongLabel.storyName = "With long label";
WithLongLabel.args = {
  label: "A really long description that will wrap onto the next line.",
  size: "",
};

export const Validation = ({ ...args }: CheckboxGroupProps) => {
  return (
    <CheckboxGroup {...args}>
      <Checkbox label="Checkbox 1" />
      <Checkbox label="Checkbox 2" />
    </CheckboxGroup>
  );
};
Validation.storyName = "Validation";
Validation.args = {
  id: "validation",
  legend: "Checkbox Group",
  legendInline: false,
  legendWidth: 0,
  legendAlign: "left",
  legendSpacing: 1,
  error: "error message",
  warning: "",
  required: false,
  isOptional: false,
  inline: false,
};
Validation.argTypes = {
  legendSpacing: {
    options: [1, 2],
    control: {
      type: "select",
    },
  },
};

export const NewValidation = ({ ...args }: CheckboxGroupProps) => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <CheckboxGroup {...args}>
        <Checkbox label="Checkbox 1" />
        <Checkbox label="Checkbox 2" />
      </CheckboxGroup>
    </CarbonProvider>
  );
};
NewValidation.storyName = "New validation";
NewValidation.args = {
  id: "new-validation",
  legend: "Checkbox Group",
  legendHelp: "Legend help text",
  legendInline: false,
  legendAlign: "left",
  error: "error message",
  warning: "",
  required: false,
  isOptional: false,
  inline: false,
};

export const WithLegendAlignment = ({ ...args }: CheckboxGroupProps) => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <CheckboxGroup {...args} legendAlign="left" mb={2}>
        <Checkbox label="Checkbox option 1" />
        <Checkbox label="Checkbox option 2" fieldHelp="fieldHelp Text" />
      </CheckboxGroup>
      <CheckboxGroup {...args} legendAlign="right">
        <Checkbox label="Checkbox option 1" />
        <Checkbox label="Checkbox option 2" fieldHelp="fieldHelp Text" />
      </CheckboxGroup>
    </CarbonProvider>
  );
};
WithLegendAlignment.storyName = "With Legend Alignment";
WithLegendAlignment.args = {
  id: "label-align",
  legend: "Checkbox Group",
  legendHelp: "Help text",
  legendInline: false,
  required: false,
  isOptional: false,
  validationIconId: "",
  error: "Error message",
  warning: "",
};
