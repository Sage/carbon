import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import Fieldset from "./fieldset.component";
import Textbox from "../textbox";
import { Select, Option } from "../select";
import Form from "../form";
import { Checkbox } from "../checkbox";
import CarbonProvider from "../carbon-provider";

const meta: Meta<typeof Fieldset> = {
  title: "Fieldset/Test",
  component: Fieldset,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    controls: {
      exclude: ["children"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Default: Story = ({ ...args }) => {
  return (
    <Fieldset {...args}>
      <Textbox
        label="First Name"
        labelInline
        labelAlign="right"
        labelWidth={30}
      />
      <Textbox
        label="Last Name"
        labelInline
        labelAlign="right"
        labelWidth={30}
      />
      <Textbox label="Address" labelInline labelAlign="right" labelWidth={30} />
      <Textbox label="City" labelInline labelAlign="right" labelWidth={30} />
      <Checkbox label="Checkbox" labelWidth={30} labelSpacing={2} reverse />
      <Select label="Country" labelInline labelAlign="right" labelWidth={30}>
        <Option text="United Kingdom" value="uk" />
        <Option text="Spain" value="sp" />
        <Option text="France" value="fr" />
        <Option text="Germany" value="ge" />
      </Select>
      <Textbox
        label="Telephone"
        labelInline
        labelAlign="right"
        labelWidth={30}
      />
    </Fieldset>
  );
};
Default.storyName = "Default";
Default.args = {
  legend: "Personal Information",
};

export const InFormFieldSpacing: Story = () => (
  <Form fieldSpacing={1}>
    <Textbox label="Separate Field" labelInline />
    <Fieldset>
      <Textbox label="Fieldset 1 Field 1" labelInline />
      <Textbox label="Fieldset 1 Field 2" labelInline />
    </Fieldset>
    <Fieldset>
      <Textbox label="Fieldset 2 Field 1" labelInline />
      <Textbox label="Fieldset 2 Field 2" labelInline />
    </Fieldset>
    <Textbox label="Separate Field" labelInline />
  </Form>
);
InFormFieldSpacing.storyName = "In Form with fieldSpacing (legacy)";

export const Validation: Story = () => (
  <Form>
    <Fieldset>
      <Textbox label="Error String" labelInline error="Error Message" />
      <Textbox label="Warning String" labelInline warning="Warning Message" />
      <Textbox label="Info String" labelInline info="Info Message" />
    </Fieldset>
    <Fieldset>
      <Textbox
        label="Error on Label"
        labelInline
        error="Error Message"
        validationOnLabel
      />
      <Textbox
        label="Warning on Label"
        labelInline
        warning="Warning Message"
        validationOnLabel
      />
      <Textbox
        label="Info on Label"
        labelInline
        info="Info Message"
        validationOnLabel
      />
    </Fieldset>
    <Fieldset>
      <Textbox label="Error Boolean" labelInline error />
      <Textbox label="Warning Boolean" labelInline warning />
      <Textbox label="Info Boolean" labelInline info />
    </Fieldset>
  </Form>
);
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidation: Story = ({ ...args }) => (
  <CarbonProvider validationRedesignOptIn>
    <Form>
      <Textbox label="Separate Field" />
      <Fieldset legend="Fieldset" {...args}>
        <Textbox label="Address Line 1" error="Message" />
        <Textbox label="Address Line 2" error="Message" />
        <Checkbox label="Checkbox" />
        <Textbox label="City" warning="Message" />
        <Select label="Country" warning="Message">
          <Option text="United Kingdom" value="uk" />
          <Option text="Spain" value="sp" />
          <Option text="France" value="fr" />
          <Option text="Germany" value="ge" />
        </Select>
        <Textbox label="Postcode" maxWidth="100px" warning="Message" />
      </Fieldset>
      <Textbox label="Separate Field" />
    </Form>
  </CarbonProvider>
);
NewValidation.storyName = "New Validation";
NewValidation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
