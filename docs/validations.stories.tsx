import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Textbox from "../src/components/textbox";
import TextInput from "../src/components/textbox/__next__";
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
      <Textbox
        label="Textbox"
        value=""
        error="Error Message"
        onChange={() => {}}
      />
      <Textbox
        label="Textbox"
        value=""
        warning="Warning Message"
        onChange={() => {}}
      />
      <Textbox
        label="Textbox"
        value=""
        info="Info Message"
        onChange={() => {}}
      />
    </>
  );
};
StringValidation.storyName = "String Validation";

export const BooleanValidation: StoryObj = () => {
  return <Textbox label="Textbox" value="" error onChange={() => {}} />;
};
BooleanValidation.storyName = "Boolean Validation";

export const ValidationOnLabel: StoryObj = () => {
  return (
    <Textbox
      label="Textbox"
      value=""
      error="Error Message"
      validationOnLabel
      onChange={() => {}}
    />
  );
};
ValidationOnLabel.storyName = "Validation on Label";

export const TooltipPosition: StoryObj = () => {
  const [state, setState] = React.useState("");
  return (
    <Textbox
      label="Textbox"
      onChange={(e) => setState(e.target.value)}
      value={state}
      error="Error Message"
      tooltipPosition="bottom"
    />
  );
};
TooltipPosition.storyName = "Tooltip Position";

export const GroupedInputValidation: StoryObj = () => {
  const [state, setState] = React.useState("radio1");
  return (
    <RadioButtonGroup
      legend="Radio Button Group"
      name="errorRadioGroup"
      value={state}
      onChange={(e) => setState(e.target.value)}
    >
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
  const [state, setState] = React.useState("radio1");
  return (
    <RadioButtonGroup
      legend="Radio Button Group"
      name="errorRadioGroup"
      required
      error="Error Message"
      value={state}
      onChange={(e) => setState(e.target.value)}
    >
      <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
      <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
      <RadioButton id="radio-2" value="radio3" label="Radio Option 3" />
    </RadioButtonGroup>
  );
};
GroupedLegendValidation.storyName = "Grouped Legend Validation";

export const ValidationRedesign: StoryObj = () => {
  const [state, setState] = React.useState("");
  return (
    <CarbonProvider validationRedesignOptIn>
      <Form>
        <RequiredFieldsIndicator mb={2}>
          Fill in all fields marked with
        </RequiredFieldsIndicator>
        <TextInput
          label="Textbox"
          inputHint="Hint text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          error="Error Message (Fix is required)"
        />
        <TextInput
          label="Textbox"
          inputHint="Hint text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          warning="Warning Message (Fix is optional)"
        />
      </Form>
    </CarbonProvider>
  );
};
ValidationRedesign.storyName = "Validation Redesign";

export const ValidationRedesignWithGroupedInputs: StoryObj = () => {
  const [state, setState] = React.useState("radio1");
  const [state2, setState2] = React.useState(true);
  const [state3, setState3] = React.useState(false);
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
          value={state}
          onChange={(e) => setState(e.target.value)}
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
            checked={state2}
            onChange={(e) => setState2(e.target.checked)}
          />
          <Checkbox
            id="new-checkbox-2"
            value="checkbox2"
            label="Checkbox Option 2"
            checked={state3}
            onChange={(e) => setState3(e.target.checked)}
          />
        </CheckboxGroup>
      </Form>
    </CarbonProvider>
  );
};
ValidationRedesignWithGroupedInputs.storyName =
  "Validation Redesign with Grouped Inputs";

export const ValidationRedesignMessageBottom: StoryObj = () => {
  const [state, setState] = React.useState("");
  const [state2, setState2] = React.useState(true);
  const [state3, setState3] = React.useState(false);

  return (
    <CarbonProvider validationRedesignOptIn>
      <Form>
        <RequiredFieldsIndicator mb={2}>
          Fill in all fields marked with
        </RequiredFieldsIndicator>

        <Textbox
          label="Textbox"
          inputHint="Hint text"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
          error="Error Message (Fix is required)"
          validationMessagePositionTop={false}
        />

        <CheckboxGroup
          legend="Checkbox Group"
          legendHelp="Legend help"
          warning="Warning Message (Fix is optional)"
          validationMessagePositionTop={false}
        >
          <Checkbox
            id="new-checkbox-1-bottom"
            value="checkbox1"
            label="Checkbox Option 1"
            checked={state2}
            onChange={(e) => setState2(e.target.checked)}
          />
          <Checkbox
            id="new-checkbox-2-bottom"
            value="checkbox2"
            label="Checkbox Option 2"
            checked={state3}
            onChange={(e) => setState3(e.target.checked)}
          />
        </CheckboxGroup>
      </Form>
    </CarbonProvider>
  );
};
ValidationRedesignMessageBottom.storyName =
  "Validation Redesign with Message Below Input";
