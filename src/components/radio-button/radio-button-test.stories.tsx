/* eslint-disable no-console */
import React from "react";
import { StoryFn } from "@storybook/react";
import { RadioButtonGroup, RadioButton } from ".";
import { RadioButtonGroupProps } from "./radio-button-group/radio-button-group.component";
import { RadioButtonProps } from "./radio-button.component";
import CarbonProvider from "../carbon-provider";
import { Checkbox } from "../checkbox";
import Switch from "../switch";
import Box from "../box";

export default {
  title: "Radio Button/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
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
  },
};

export const WithLabelHelp: StoryFn<typeof RadioButton> = () => (
  <RadioButtonGroup name="labelHelp" legend="Radio group legend">
    <RadioButton
      id="radio-1"
      value="radio1"
      label="Radio Option 1"
      labelHelp="Radio 1"
    />
    <RadioButton
      id="radio-2"
      value="radio2"
      label="Radio Option 2"
      labelHelp="Radio 2"
    />
    <RadioButton
      id="radio-3"
      value="radio3"
      label="Radio Option 3"
      labelHelp="Radio 3"
    />
  </RadioButtonGroup>
);

WithLabelHelp.storyName = "with labelHelp";

export const WithValidationsOnButtons = ({ ...args }) => (
  <RadioButtonGroup
    name="validations-on-buttons-group"
    onChange={() => console.log("change")}
    {...args}
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
WithValidationsOnButtons.args = {
  legend: "Radio group legend",
  legendInline: false,
  required: false,
  inline: false,
};

export const WithValidationsOnRadioGroup = ({ ...args }) => (
  <RadioButtonGroup
    name="validations-on-group"
    onChange={() => console.log("change")}
    {...args}
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
WithValidationsOnRadioGroup.args = {
  error: "Error message",
  warning: "",
  legend: "Radio group legend",
  legendInline: false,
  required: false,
  inline: false,
  legendAlign: "left",
};

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
      <RadioButton id="radio-1" value="radio1" {...props} />
    </CarbonProvider>
  );
};

WithNewValidation.args = {
  label: "Radiobutton 1",
  error: true,
  warning: false,
  fieldHelp: "",
  labelHelp: "",
  required: false,
  checked: false,
  disabled: false,
  labelSpacing: 1,
  reverse: false,
  size: "small",
};

export const WithNewValidationGroup = ({
  ...props
}: Partial<RadioButtonGroupProps>) => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <RadioButtonGroup name="radio-button-group" {...props}>
        <RadioButton id="radio-1" value="radio1" label="Yes" />
        <RadioButton id="radio-2" value="radio2" label="No" />
        <RadioButton
          id="radio-3"
          value="radio3"
          label="Maybe"
          fieldHelp="fieldHelp text"
        />
      </RadioButtonGroup>
    </CarbonProvider>
  );
};

WithNewValidationGroup.args = {
  id: "new-validation",
  legend: "Radio group legend",
  error: "Error message",
  warning: "",
  legendHelp: "Legend help text",
  legendAlign: "left",
  required: true,
  isOptional: false,
  inline: false,
};
WithNewValidationGroup.parameters = {
  chromatic: { disableSnapshot: false },
};

export const WithLegendAlignment = ({
  ...props
}: Partial<RadioButtonGroupProps>) => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <RadioButtonGroup
        name="radio-button-group-left"
        {...props}
        legendAlign="left"
        mb={2}
      >
        <RadioButton id="radio-1-left" value="radio1" label="Yes" />
        <RadioButton id="radio-2-left" value="radio2" label="No" />
        <RadioButton
          id="radio-3-left"
          value="radio3"
          label="RadioButton with a longer label"
          fieldHelp="fieldHelp text"
        />
      </RadioButtonGroup>
      <RadioButtonGroup
        name="radio-button-group-right"
        {...props}
        legendAlign="right"
      >
        <RadioButton id="radio-1-right" value="radio1" label="Yes" />
        <RadioButton id="radio-2-right" value="radio2" label="No" />
        <RadioButton
          id="radio-3-right"
          value="radio3"
          label="RadioButton with a longer label"
          fieldHelp="fieldHelp text"
        />
      </RadioButtonGroup>
    </CarbonProvider>
  );
};

WithLegendAlignment.args = {
  id: "with-legend-alignment",
  legend: "Radio group legend",
  error: "Error message",
  warning: "",
  legendHelp: "Legend help text",
  required: true,
  isOptional: false,
  inline: false,
};
WithLegendAlignment.parameters = {
  chromatic: { disableSnapshot: false },
};

export const HiddenInlineRadioButtons = () => {
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = React.useState(false);

  return (
    <CarbonProvider validationRedesignOptIn>
      <Box height="90vh" overflowY="auto">
        <Box position="sticky" height="300px" top="0%" bg="black" />
        <Box height="1200px">
          <Box m={2}>
            <RadioButtonGroup legend="Radio Buttons" name="radio-buttons">
              <RadioButton id="first" value="1" label="first" size="large" />
              <RadioButton id="second" value="2" label="second" size="large" />
            </RadioButtonGroup>
          </Box>
          <Box m={2}>
            <Checkbox
              label="Checkbox"
              name="checkbox-default"
              size="large"
              checked={isCheckboxChecked}
              onChange={(e) => setIsCheckboxChecked(e.target.checked)}
            />
          </Box>
          <Box m={2}>
            <Switch
              checked={isSwitchChecked}
              label="Switch"
              size="small"
              onChange={() => {
                setIsSwitchChecked(!isSwitchChecked);
              }}
            />
          </Box>
        </Box>
      </Box>
    </CarbonProvider>
  );
};
HiddenInlineRadioButtons.storyName = "Hidden Inline Radio Buttons";
