/* eslint-disable no-console */
import React from "react";
import { StoryFn } from "@storybook/react";
import { RadioButtonGroup, RadioButton } from ".";
import { RadioButtonGroupProps } from "./radio-button-group/radio-button-group.component";
import { RadioButtonProps } from "./radio-button.component";
import CarbonProvider from "../carbon-provider";

export default {
  title: "Radio Button/Test",
  includeStories: [
    "Required",
    "WithValidationsOnButtons",
    "WithValidationsOnRadioGroup",
    "WithTooltipPosition",
    "WithTooltipPositionOnRadioGroup",
    "WithNewValidation",
    "WithNewValidationGroup",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Required: StoryFn<typeof RadioButton> = () => (
  <RadioButtonGroup name="required" legend="Radio group legend" required>
    <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
    <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
    <RadioButton id="radio-3" value="radio3" label="Radio Option 3" />
  </RadioButtonGroup>
);

Required.storyName = "required";

export const WithValidationsOnButtons: StoryFn<typeof RadioButton> = () => (
  <RadioButtonGroup
    name="validations-on-buttons-group"
    onChange={() => console.log("change")}
    legend="Radio group legend"
  >
    <RadioButton
      id="validations-on-buttons-radio-1"
      value="radio1"
      label="Radio Option 1"
      error="message"
      fieldHelp="Some help text for this input."
    />
    <RadioButton
      id="validations-on-buttons-radio-2"
      value="radio2"
      label="Radio Option 2"
      warning="message"
    />
    <RadioButton
      id="validations-on-buttons-radio-3"
      value="radio3"
      label="Radio Option 3"
      info="message"
    />
  </RadioButtonGroup>
);

WithValidationsOnButtons.storyName = "with validations on RadioButton";

export const WithValidationsOnRadioGroup: StoryFn<typeof RadioButton> = () => (
  <RadioButtonGroup
    name="validations-on-group"
    onChange={() => console.log("change")}
    legend="Radio group legend"
    error="Error message"
  >
    <RadioButton
      id="validations-on-group-radio-1"
      value="radio1"
      label="Radio Option 1"
    />
    <RadioButton
      id="validations-on-group-radio-2"
      value="radio2"
      label="Radio Option 2"
    />
    <RadioButton
      id="validations-on-group-radio-3"
      value="radio3"
      label="Radio Option 3"
    />
  </RadioButtonGroup>
);

WithValidationsOnRadioGroup.storyName = "with validations on RadioGroup";

export const WithTooltipPosition: StoryFn<typeof RadioButton> = () => (
  <RadioButtonGroup
    name="tooltip-position"
    onChange={() => console.log("change")}
    legend="Radio group legend"
  >
    <RadioButton
      id="radio-1"
      value="radio1"
      label="Radio Option 1"
      error="message"
      tooltipPosition="right"
    />
  </RadioButtonGroup>
);

WithTooltipPosition.storyName = "with tooltip position";

export const WithTooltipPositionOnRadioGroup: StoryFn<
  typeof RadioButton
> = () => (
  <RadioButtonGroup
    name="validations-on-group-group-tooltip-position-override"
    onChange={() => console.log("change")}
    legend="Radio group legend"
    error="Error message"
    tooltipPosition="top"
  >
    <RadioButton
      id="validations-on-group-radio-1-tooltip-position-override"
      value="radio1"
      label="Radio Option 1"
    />
    <RadioButton
      id="validations-on-group-radio-2-tooltip-position-override"
      value="radio2"
      label="Radio Option 2"
    />
    <RadioButton
      id="validations-on-group-radio-3-tooltip-position-override"
      value="radio3"
      label="Radio Option 3"
    />
  </RadioButtonGroup>
);

WithTooltipPositionOnRadioGroup.storyName =
  "with tooltip position on RadioGroup";

export const WithNewValidation = (props: Partial<RadioButtonProps>) => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <RadioButton
        id="radio-1"
        value="radio1"
        label="Radiobutton 1"
        {...props}
      />
    </CarbonProvider>
  );
};

WithNewValidation.args = {
  error: "Error message",
  warning: "",
  fieldHelp: "",
  labelHelp: "",
  required: false,
  checked: false,
};

export const WithNewValidationGroup = ({
  ...props
}: Partial<RadioButtonGroupProps>) => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <RadioButtonGroup
        name="radio-button-group"
        legend="Radio group legend"
        {...props}
      >
        <RadioButton id="radio-1" value="radio1" label="Yes" />
        <RadioButton id="radio-2" value="radio2" label="No" />
        <RadioButton id="radio-3" value="radio3" label="Maybe" />
      </RadioButtonGroup>
    </CarbonProvider>
  );
};

WithNewValidationGroup.args = {
  error: "Error message",
  warning: "",
  legendHelp: "Legend help text",
  legendInline: false,
  required: true,
};
