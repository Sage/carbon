import React, { useState } from "react";
import { RadioButtonGroup, RadioButton } from ".";
import { RadioButtonGroupProps } from "./radio-button-group/radio-button-group.component";
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

export const WithLabelHelp = ({ ...args }) => {
  const [value, setValue] = useState("radio1");

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
  const [value, setValue] = useState("radio1");

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
  const [value, setValue] = useState("radio1");

  return (
    <>
      <RadioButtonGroup
        name="validations-on-group"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error="Error message"
        mb={2}
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

      <RadioButtonGroup
        name="validations-on-group"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        warning="Warning message"
        mb={2}
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

      <RadioButtonGroup
        name="validations-on-group"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        info="Info message"
        mb={2}
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
  const [value, setValue] = useState("radio1");

  return (
    <CarbonProvider validationRedesignOptIn>
      <RadioButtonGroup
        name="radio-button-group-error"
        error="Error Message"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      >
        <RadioButton id="radio-1" value="radio1" label="Yes" />
        <RadioButton id="radio-2" value="radio2" label="No" />
        <RadioButton
          id="radio-3"
          value="radio3"
          label="Maybe"
          fieldHelp="fieldHelp text"
        />
      </RadioButtonGroup>
      <RadioButtonGroup
        name="radio-button-group-warning"
        warning="Warning Message"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      >
        <RadioButton id="radio-1" value="radio1" label="Yes" />
        <RadioButton id="radio-2" value="radio2" label="No" />
        <RadioButton
          id="radio-3"
          value="radio3"
          label="Maybe"
          fieldHelp="fieldHelp text"
        />
      </RadioButtonGroup>
      <RadioButtonGroup
        validationMessagePositionTop={false}
        name="radio-button-group-error-bottom"
        error="Error Message"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      >
        <RadioButton id="radio-1" value="radio1" label="Yes" />
        <RadioButton id="radio-2" value="radio2" label="No" />
        <RadioButton
          id="radio-3"
          value="radio3"
          label="Maybe"
          fieldHelp="fieldHelp text"
        />
      </RadioButtonGroup>
      <RadioButtonGroup
        validationMessagePositionTop={false}
        name="radio-button-group-warning-bottom"
        warning="Warning Message"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      >
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
NewValidation.args = {
  id: "new-validation",
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
  const [value, setValue] = useState("radio1");

  return (
    <CarbonProvider validationRedesignOptIn>
      <RadioButtonGroup
        name="radio-button-group-error"
        error="Error Message"
        inline
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      >
        <RadioButton id="radio-1" value="radio1" label="Yes" />
        <RadioButton id="radio-2" value="radio2" label="No" />
        <RadioButton id="radio-3" value="radio3" label="Maybe" />
      </RadioButtonGroup>
      <RadioButtonGroup
        name="radio-button-group-warning"
        warning="Warning Message"
        inline
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      >
        <RadioButton id="radio-1" value="radio1" label="Yes" />
        <RadioButton id="radio-2" value="radio2" label="No" />
        <RadioButton id="radio-3" value="radio3" label="Maybe" />
      </RadioButtonGroup>
      <RadioButtonGroup
        validationMessagePositionTop={false}
        name="radio-button-group-error-bottom"
        error="Error Message"
        inline
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      >
        <RadioButton id="radio-1" value="radio1" label="Yes" />
        <RadioButton id="radio-2" value="radio2" label="No" />
        <RadioButton id="radio-3" value="radio3" label="Maybe" />
      </RadioButtonGroup>
      <RadioButtonGroup
        validationMessagePositionTop={false}
        name="radio-button-group-warning-bottom"
        warning="Warning Message"
        inline
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        {...props}
      >
        <RadioButton id="radio-1" value="radio1" label="Yes" />
        <RadioButton id="radio-2" value="radio2" label="No" />
        <RadioButton id="radio-3" value="radio3" label="Maybe" />
      </RadioButtonGroup>
    </CarbonProvider>
  );
};
NewValidationInline.args = {
  id: "new-validation",
  legend: "Radio group legend",
  legendHelp: "Legend help text",
  legendAlign: "left",
  required: true,
};
NewValidationInline.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const WithLegendAlignment = ({
  ...props
}: Partial<RadioButtonGroupProps>) => {
  const [value, setValue] = useState("radio1");

  return (
    <CarbonProvider validationRedesignOptIn>
      <RadioButtonGroup
        name="radio-button-group-left"
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
  inline: false,
};
WithLegendAlignment.parameters = {
  chromatic: { disableSnapshot: false },
};

export const HiddenInlineRadioButtons = () => {
  const [value, setValue] = useState("radio1");
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
