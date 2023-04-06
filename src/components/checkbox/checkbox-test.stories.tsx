import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import { Checkbox, CheckboxProps, CheckboxGroup } from ".";

export default {
  title: "Checkbox/Test",
  includeStories: ["Default"],
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

export const CheckboxComponent = ({ ...props }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <div
        style={{
          marginTop: "64px",
        }}
      >
        <Checkbox
          label="Checkbox 1"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          {...props}
        />
      </div>
    </>
  );
};

export const CheckboxGroupComponent = ({
  // eslint-disable-next-line react/prop-types
  children = "This is an example of a checkbox",
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div
      style={{
        marginTop: "64px",
        marginLeft: "64px",
      }}
    >
      <CheckboxGroup legend="Test CheckboxGroup Label" {...props}>
        {["One", "Two", "Three"].map((label) => (
          <Checkbox
            label={label}
            id={`checkbox-group-${label}`}
            key={`checkbox-group-${label}`}
            name={`checkbox-group-${label}`}
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
        ))}
        {children}
      </CheckboxGroup>
    </div>
  );
};
