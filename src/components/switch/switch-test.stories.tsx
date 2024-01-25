import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Switch, { SwitchProps } from "./switch.component";

export default {
  title: "Switch/Test",
  includeStories: ["Default", "NewDefault"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
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
    error: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = ({
  fieldHelp,
  label,
  ...args
}: Partial<SwitchProps>) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = ev.target;
    setIsChecked(checked);
    action("change")(`checked: ${checked}`);
  };
  return (
    <Switch
      onChange={handleChange}
      name="switch-default"
      checked={isChecked}
      onBlur={action("onBlur")}
      fieldHelp={fieldHelp}
      label={label}
      {...args}
    />
  );
};

Default.storyName = "default";
Default.args = {
  fieldHelp: "This text provides help for the input.",
  fieldHelpInline: false,
  label: "Switch on this component?",
  labelHelp: "Switch off and on this component.",
  helpAriaLabel: "Switch off and on this component.",
  labelInline: false,
  loading: false,
  inputWidth: 0,
  labelWidth: 0,
  labelSpacing: 1,
  reverse: true,
  value: "test-value",
  disabled: false,
  size: "small",
};

export const NewDefault = ({
  fieldHelp,
  label,
  ...args
}: Partial<SwitchProps>) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = ev.target;
    setIsChecked(checked);
    action("change")(`checked: ${checked}`);
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      <Switch
        m={2}
        onChange={handleChange}
        name="switch-default"
        checked={isChecked}
        onBlur={action("onBlur")}
        fieldHelp={fieldHelp}
        label={label}
        error="Error Message (Fix is required)"
        {...args}
      />
    </CarbonProvider>
  );
};

NewDefault.storyName = "new validation";
NewDefault.args = {
  label: "Label",
  labelHelp: "Hint text",
  labelInline: false,
  loading: false,
  inputWidth: 0,
  labelWidth: 0,
  labelSpacing: 1,
  reverse: true,
  value: "test-value",
  disabled: false,
  size: "small",
};
