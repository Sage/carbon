import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import Textbox from "../src/components/textbox";
import { RadioButton, RadioButtonGroup } from "../src/components/radio-button";
import { Checkbox, CheckboxGroup } from "../src/components/checkbox";
import CarbonProvider from "../src/components/carbon-provider";
import Form, { RequiredFieldsIndicator } from "../src/components/form";

const meta: Meta = {
  title: "Documentation/Validations",
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;

export const StringValidation: StoryObj = () => {
  return (
    <>
      <Textbox label="Textbox" value="" error="Error Message" />
      <Textbox label="Textbox" value="" warning="Warning Message" />
      <Textbox label="Textbox" value="" info="Info Message" />
    </>
  );
};
StringValidation.storyName = "String Validation";

export const BooleanValidation: StoryObj = () => {
  return <Textbox label="Textbox" value="" error />;
};
BooleanValidation.storyName = "Boolean Validation";

export const ValidationOnLabel: StoryObj = () => {
  return (
    <Textbox label="Textbox" value="" error="Error Message" validationOnLabel />
  );
};
ValidationOnLabel.storyName = "Validation on Label";

export const TooltipPosition: StoryObj = () => {
  return (
    <Textbox
      label="Textbox"
      value=""
      error="Error Message"
      tooltipPosition="bottom"
    />
  );
};
TooltipPosition.storyName = "Tooltip Position";

export const GroupedInputValidation: StoryObj = () => {
  return (
    <RadioButtonGroup legend="Radio Button Group" name="errorRadioGroup">
      <RadioButton
        id="error-radio-1"
        value="radio1"
        label="Radio Option 1"
        error="Error Message"
      />
      <RadioButton
        id="warning-radio-2"
        value="radio2"
        label="Radio Option 2"
        warning="Warning Message"
      />
      <RadioButton
        id="info-radio-2"
        value="radio3"
        label="Radio Option 3"
        info="Information Message"
      />
    </RadioButtonGroup>
  );
};
GroupedInputValidation.storyName = "Grouped Input Validation";

export const GroupedLegendValidation: StoryObj = () => {
  return (
    <RadioButtonGroup
      legend="Radio Button Group"
      name="errorRadioGroup"
      required
      error="Error Message"
    >
      <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
      <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
      <RadioButton id="radio-2" value="radio3" label="Radio Option 3" />
    </RadioButtonGroup>
  );
};
GroupedLegendValidation.storyName = "Grouped Legend Validation";

export const ValidationRedesign: StoryObj = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Form>
        <RequiredFieldsIndicator mb={2}>
          Fill in all fields marked with
        </RequiredFieldsIndicator>
        <Textbox
          label="Textbox"
          inputHint="Hint text"
          value=""
          required
          error="Error Message (Fix is required)"
        />
        <Textbox
          label="Textbox"
          inputHint="Hint text"
          value=""
          warning="Warning Message (Fix is optional)"
        />
      </Form>
    </CarbonProvider>
  );
};
ValidationRedesign.storyName = "Validation Redesign";

export const ValidationRedesignWithGroupedInputs: StoryObj = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Form>
        <RequiredFieldsIndicator mb={2}>
          Fill in all fields marked with
        </RequiredFieldsIndicator>
        <RadioButtonGroup
          legend="Radio Button Group"
          legendHelp="Legend help"
          name="errorRadioGroup"
          required
          error="Error Message (Fix is required)"
        >
          <RadioButton id="new-radio-1" value="radio1" label="Radio Option 1" />
          <RadioButton id="new-radio-2" value="radio2" label="Radio Option 2" />
        </RadioButtonGroup>

        <CheckboxGroup
          legend="Checkbox Group"
          legendHelp="Legend help"
          warning="Warning Message (Fix is optional)"
        >
          <Checkbox
            id="new-checkbox-1"
            value="checkbox1"
            label="Checkbox Option 1"
          />
          <Checkbox
            id="new-checkbox-2"
            value="checkbox2"
            label="Checkbox Option 2"
          />
        </CheckboxGroup>
      </Form>
    </CarbonProvider>
  );
};
ValidationRedesignWithGroupedInputs.storyName =
  "Validation Redesign with Grouped Inputs";
