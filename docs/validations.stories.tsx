import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import Textbox from "../src/components/textbox";
import { RadioButton, RadioButtonGroup } from "../src/components/radio-button";
import Form, { RequiredFieldsIndicator } from "../src/components/form";

const meta: Meta = {
  title: "Documentation/Validations",
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;

export const Validation: StoryObj = () => {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  return (
    <Form>
      <RequiredFieldsIndicator mb={2}>
        Indicates required information
      </RequiredFieldsIndicator>
      <Textbox
        label="Textbox"
        inputHint="Hint Text"
        required
        error="Error Message (Fix is required)"
        value={value1}
        onChange={(e) => setValue1(e.target.value)}
      />
      <Textbox
        label="Textbox"
        inputHint="Hint Text"
        required
        warning="Warning Message (Fix is optional)"
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
      />
    </Form>
  );
};
Validation.storyName = "Validation";

export const ValidationGroupedInputs: StoryObj = () => {
  const [radioValue, setRadioValue] = useState("");

  return (
    <Form>
      <RequiredFieldsIndicator mb={2}>
        Indicates required information
      </RequiredFieldsIndicator>
      <RadioButtonGroup
        legend="Radio Button Group"
        legendHint="Legend Hint"
        name="group-radio"
        required
        error="Error Message (Fix is required)"
        value={radioValue}
        onChange={(e) => setRadioValue(e.target.value)}
      >
        <RadioButton id="group-radio-1" value="radio1" label="Radio Option 1" />
        <RadioButton id="group-radio-2" value="radio2" label="Radio Option 2" />
      </RadioButtonGroup>
    </Form>
  );
};
ValidationGroupedInputs.storyName = "Validation with Grouped Inputs";

export const ValidationMessageBottom: StoryObj = () => {
  const [textboxValue, setTextboxValue] = useState("");
  const [radioValue, setRadioValue] = useState("");

  return (
    <Form>
      <RequiredFieldsIndicator mb={2}>
        Indicates required information
      </RequiredFieldsIndicator>
      <Textbox
        label="Textbox"
        inputHint="Hint Text"
        required
        error="Error Message (Fix is required)"
        value={textboxValue}
        onChange={(e) => setTextboxValue(e.target.value)}
        validationMessagePositionTop={false}
      />

      <RadioButtonGroup
        legend="Radio Button Group"
        legendHint="Legend Hint"
        name="group-radio-bottom"
        required
        error="Error Message (Fix is required)"
        value={radioValue}
        onChange={(e) => setRadioValue(e.target.value)}
        validationMessagePositionTop={false}
      >
        <RadioButton
          id="group-radio-bottom-1"
          value="radio1"
          label="Radio Option 1"
        />
        <RadioButton
          id="group-radio-bottom-2"
          value="radio2"
          label="Radio Option 2"
        />
      </RadioButtonGroup>
    </Form>
  );
};
ValidationMessageBottom.storyName = "Validation with Message Below Input";
