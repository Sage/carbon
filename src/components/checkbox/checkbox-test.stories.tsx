import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import { Checkbox, CheckboxGroup, CheckboxGroupProps, CheckboxProps } from ".";
import Box from "../box";
import CarbonProvider from "../carbon-provider";

export default {
  title: "Checkbox/Test",
  includeStories: [
    "Default",
    "WithLongLabel",
    "WithNewValidation",
    "WithNewValidationGroup",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: false,
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
  },
};

export const Default = ({
  label,
  fieldHelp,
  labelHelp,
  ...args
}: CheckboxProps) => {
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
      label={label}
      fieldHelp={fieldHelp}
      labelHelp={labelHelp}
      helpAriaLabel={labelHelp as string}
      {...args}
    />
  );
};

Default.storyName = "default";

Default.args = {
  key: "",
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
  adaptiveSpacingBreakpoint: undefined,
  required: false,
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

export const WithNewValidation = (props: Partial<CheckboxProps>) => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Checkbox label="Checkbox 1" {...props} />
    </CarbonProvider>
  );
};

WithNewValidation.args = {
  error: "Error message",
  warning: "",
  fieldHelp: "field help text",
  labelHelp: "label help text",
  required: false,
  checked: false,
};

export const WithNewValidationGroup = ({
  ...props
}: Partial<CheckboxGroupProps>) => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <CheckboxGroup legend="Checkbox legend" {...props}>
        <Checkbox label="Checkbox 1" labelHelp="this shouldn't render" />
        <Checkbox label="Checkbox 2" fieldHelp="this shouldn't render either" />
        <Checkbox label="Checkbox 3" />
      </CheckboxGroup>
    </CarbonProvider>
  );
};

WithNewValidationGroup.args = {
  error: "Error message",
  warning: "",
  legendHelp: "Legend help text",
  legendInline: false,
  required: false,
};
