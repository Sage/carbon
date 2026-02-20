import React, { useState } from "react";
import { RadioButtonGroup, RadioButton } from ".";
import { RadioButtonGroupProps } from "./radio-button-group/radio-button-group.component";
import CarbonProvider from "../carbon-provider";
import { Checkbox } from "../checkbox";
import Switch from "../switch";
import Box from "../box";

export default {
  title: "Deprecated/Radio Button/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
    themeProvider: { chromatic: { theme: "sage" } },
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

export const WithLabelHelp = ({ ...args }) => {
  const [value, setValue] = useState("");

  return (
    <RadioButtonGroup
      name="labelHelp"
      legend="Radio group legend"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <RadioButton
        id="radio-1"
        value="radio1"
        label="Radio Option 1"
        labelHelp="Radio 1"
        {...args}
      />
      <RadioButton
        id="radio-2"
        value="radio2"
        label="Radio Option 2"
        labelHelp="Radio 2"
        {...args}
      />
      <RadioButton
        id="radio-3"
        value="radio3"
        label="Radio Option 3"
        labelHelp="Radio 3"
        {...args}
      />
    </RadioButtonGroup>
  );
};
WithLabelHelp.storyName = "With labelHelp";
WithLabelHelp.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const WithValidationsOnButtons = ({ ...args }) => {
  const [value, setValue] = useState("");

  return (
    <RadioButtonGroup
      name="validations-on-buttons-group"
      value={value}
      onChange={(e) => setValue(e.target.value)}
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
};
WithValidationsOnButtons.storyName = "Validations on RadioButton";
WithValidationsOnButtons.args = {
  legend: "Radio group legend",
  legendInline: false,
  required: false,
  inline: false,
};
WithValidationsOnButtons.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const WithValidationsOnRadioGroup = ({ ...args }) => {
  const [errorValue, setErrorValue] = useState("");
  const [warningValue, setWarningValue] = useState("");
  const [infoValue, setInfoValue] = useState("");

  return (
    <>
      <RadioButtonGroup
        name="error-validations-on-group"
        value={errorValue}
        onChange={(e) => setErrorValue(e.target.value)}
        error="Error message"
        mb={2}
        {...args}
      >
        <RadioButton
          id="error-validations-on-group-radio-1"
          value="error-validations-on-group-radio-1"
          label="Error Radio Option 1"
        />
        <RadioButton
          id="error-validations-on-group-radio-2"
          value="error-validations-on-group-radio-2"
          label="Error Radio Option 2"
        />
        <RadioButton
          id="error-validations-on-group-radio-3"
          value="error-validations-on-group-radio-3"
          label="Error Radio Option 3"
        />
      </RadioButtonGroup>

      <RadioButtonGroup
        name="warning-validations-on-group"
        value={warningValue}
        onChange={(e) => setWarningValue(e.target.value)}
        warning="Warning message"
        mb={2}
        {...args}
      >
        <RadioButton
          id="warning-validations-on-group-radio-1"
          value="warning-validations-on-group-radio-1"
          label="Warning Radio Option 1"
        />
        <RadioButton
          id="warning-validations-on-group-radio-2"
          value="warning-validations-on-group-radio-2"
          label="Warning Radio Option 2"
        />
        <RadioButton
          id="warning-validations-on-group-radio-3"
          value="warning-validations-on-group-radio-3"
          label="Warning Radio Option 3"
        />
      </RadioButtonGroup>

      <RadioButtonGroup
        name="info-validations-on-group"
        value={infoValue}
        onChange={(e) => setInfoValue(e.target.value)}
        info="Info message"
        mb={2}
        {...args}
      >
        <RadioButton
          id="info-validations-on-group-radio-1"
          value="info-validations-on-group-radio-1"
          label="Info Radio Option 1"
        />
        <RadioButton
          id="info-validations-on-group-radio-2"
          value="info-validations-on-group-radio-2"
          label="Info Radio Option 2"
        />
        <RadioButton
          id="info-validations-on-group-radio-3"
          value="info-validations-on-group-radio-3"
          label="Info Radio Option 3"
        />
      </RadioButtonGroup>
    </>
  );
};
WithValidationsOnRadioGroup.storyName = "Validations on RadioButtonGroup";
WithValidationsOnRadioGroup.args = {
  legend: "Radio group legend",
  legendInline: false,
  required: false,
  inline: false,
  legendAlign: "left",
};
WithValidationsOnRadioGroup.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidation = ({ ...props }: Partial<RadioButtonGroupProps>) => {
  const [errorValueTop, setErrorValueTop] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const [warningValueTop, setWarningValueTop] = useState("");
  const [warningValue, setWarningValue] = useState("");

  return (
    <CarbonProvider validationRedesignOptIn>
      <RadioButtonGroup
        name="radio-button-group-error-top"
        error="Error Message"
        mb={2}
        value={errorValueTop}
        onChange={(e) => setErrorValueTop(e.target.value)}
        id="validation-1"
        {...props}
      >
        <RadioButton
          id="error-top-radio-1"
          value="error-top-radio-1"
          label="Yes"
        />
        <RadioButton
          id="error-top-radio-2"
          value="error-top-radio-2"
          label="No"
        />
        <RadioButton
          id="error-top-radio-3"
          value="error-top-radio-3"
          label="Maybe"
          fieldHelp="fieldHelp text"
        />
      </RadioButtonGroup>
      <RadioButtonGroup
        name="radio-button-group-warning-top"
        warning="Warning Message"
        mb={2}
        value={warningValueTop}
        onChange={(e) => setWarningValueTop(e.target.value)}
        id="validation-2"
        {...props}
      >
        <RadioButton
          id="warning-top-radio-1"
          value="warning-top-radio-1"
          label="Yes"
        />
        <RadioButton
          id="warning-top-radio-2"
          value="warning-top-radio-2"
          label="No"
        />
        <RadioButton
          id="warning-top-radio-3"
          value="warning-top-radio-3"
          label="Maybe"
          fieldHelp="fieldHelp text"
        />
      </RadioButtonGroup>
      <RadioButtonGroup
        validationMessagePositionTop={false}
        name="radio-button-group-error-bottom"
        error="Error Message"
        mb={2}
        value={errorValue}
        onChange={(e) => setErrorValue(e.target.value)}
        id="validation-3"
        {...props}
      >
        <RadioButton id="error-radio-1" value="error-radio-1" label="Yes" />
        <RadioButton id="error-radio-2" value="error-radio-2" label="No" />
        <RadioButton
          id="error-radio-3"
          value="error-radio-3"
          label="Maybe"
          fieldHelp="fieldHelp text"
        />
      </RadioButtonGroup>
      <RadioButtonGroup
        validationMessagePositionTop={false}
        name="radio-button-group-warning-bottom"
        warning="Warning Message"
        value={warningValue}
        onChange={(e) => setWarningValue(e.target.value)}
        id="validation-4"
        {...props}
      >
        <RadioButton id="warning-radio-1" value="warning-radio-1" label="Yes" />
        <RadioButton id="warning-radio-2" value="warning-radio-2" label="No" />
        <RadioButton
          id="warning-radio-3"
          value="warning-radio-3"
          label="Maybe"
          fieldHelp="fieldHelp text"
        />
      </RadioButtonGroup>
    </CarbonProvider>
  );
};
NewValidation.args = {
  legend: "Radio group legend",
  legendHelp: "Legend help text",
  legendAlign: "left",
  required: true,
  inline: false,
};
NewValidation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidationInline = ({
  ...props
}: Partial<RadioButtonGroupProps>) => {
  const [errorValueTop, setErrorValueTop] = useState("");
  const [errorValue, setErrorValue] = useState("");
  const [warningValueTop, setWarningValueTop] = useState("");
  const [warningValue, setWarningValue] = useState("");

  return (
    <CarbonProvider validationRedesignOptIn>
      <RadioButtonGroup
        name="radio-button-group-error-top"
        error="Error Message"
        mb={2}
        inline
        value={errorValueTop}
        onChange={(e) => setErrorValueTop(e.target.value)}
        id="validation-1"
        {...props}
      >
        <RadioButton
          id="error-top-radio-1"
          value="error-top-radio-1"
          label="Yes"
        />
        <RadioButton
          id="error-top-radio-2"
          value="error-top-radio-2"
          label="No"
        />
        <RadioButton
          id="error-top-radio-3"
          value="error-top-radio-3"
          label="Maybe"
          fieldHelp="fieldHelp text"
        />
      </RadioButtonGroup>
      <RadioButtonGroup
        name="radio-button-group-warning-top"
        warning="Warning Message"
        mb={2}
        inline
        value={warningValueTop}
        onChange={(e) => setWarningValueTop(e.target.value)}
        id="validation-2"
        {...props}
      >
        <RadioButton
          id="warning-top-radio-1"
          value="warning-top-radio-1"
          label="Yes"
        />
        <RadioButton
          id="warning-top-radio-2"
          value="warning-top-radio-2"
          label="No"
        />
        <RadioButton
          id="warning-top-radio-3"
          value="warning-top-radio-3"
          label="Maybe"
          fieldHelp="fieldHelp text"
        />
      </RadioButtonGroup>
      <RadioButtonGroup
        validationMessagePositionTop={false}
        name="radio-button-group-error-bottom"
        error="Error Message"
        mb={2}
        inline
        value={errorValue}
        onChange={(e) => setErrorValue(e.target.value)}
        id="validation-3"
        {...props}
      >
        <RadioButton id="error-radio-1" value="error-radio-1" label="Yes" />
        <RadioButton id="error-radio-2" value="error-radio-2" label="No" />
        <RadioButton
          id="error-radio-3"
          value="error-radio-3"
          label="Maybe"
          fieldHelp="fieldHelp text"
        />
      </RadioButtonGroup>
      <RadioButtonGroup
        validationMessagePositionTop={false}
        name="radio-button-group-warning-bottom"
        warning="Warning Message"
        inline
        value={warningValue}
        onChange={(e) => setWarningValue(e.target.value)}
        id="validation-4"
        {...props}
      >
        <RadioButton id="warning-radio-1" value="warning-radio-1" label="Yes" />
        <RadioButton id="warning-radio-2" value="warning-radio-2" label="No" />
        <RadioButton
          id="warning-radio-3"
          value="warning-radio-3"
          label="Maybe"
          fieldHelp="fieldHelp text"
        />
      </RadioButtonGroup>
    </CarbonProvider>
  );
};
NewValidationInline.args = {
  legend: "Radio group legend",
  legendHelp: "Legend help text",
  legendAlign: "left",
  required: true,
  inline: true,
};
NewValidationInline.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const WithLegendAlignment = ({
  ...props
}: Partial<RadioButtonGroupProps>) => {
  const [valueLeft, setValueLeft] = useState("");
  const [valueRight, setValueRight] = useState("");

  return (
    <CarbonProvider validationRedesignOptIn>
      <RadioButtonGroup
        name="radio-button-group-left"
        value={valueLeft}
        onChange={(e) => setValueLeft(e.target.value)}
        {...props}
        legendAlign="left"
        mb={2}
      >
        <RadioButton id="radio-1-left" value="radio1-left" label="Yes" />
        <RadioButton id="radio-2-left" value="radio2-left" label="No" />
        <RadioButton
          id="radio-3-left"
          value="radio3-left"
          label="RadioButton with a longer label"
          fieldHelp="fieldHelp text"
        />
      </RadioButtonGroup>
      <RadioButtonGroup
        name="radio-button-group-right"
        value={valueRight}
        onChange={(e) => setValueRight(e.target.value)}
        {...props}
        legendAlign="right"
      >
        <RadioButton id="radio-1-right" value="radio1-right" label="Yes" />
        <RadioButton id="radio-2-right" value="radio2-right" label="No" />
        <RadioButton
          id="radio-3-right"
          value="radio3-right"
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
  inline: false,
};
WithLegendAlignment.parameters = {
  chromatic: { disableSnapshot: false },
};

export const HiddenInlineRadioButtons = () => {
  const [value, setValue] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);
  const [isSwitchChecked, setIsSwitchChecked] = React.useState(false);

  return (
    <CarbonProvider validationRedesignOptIn>
      <Box height="90vh" overflowY="auto">
        <Box position="sticky" height="300px" top="0%" bg="black" />
        <Box height="1200px">
          <Box m={2}>
            <RadioButtonGroup
              legend="Radio Buttons"
              name="radio-buttons"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            >
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
