import React from "react";
import { Meta, StoryObj } from "@storybook/react";

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
        value={""}
        onChange={() => {}}
      />
      <Textbox
        label="Last Name"
        labelInline
        labelAlign="right"
        labelWidth={30}
        value={""}
        onChange={() => {}}
      />
      <Textbox
        label="Address"
        labelInline
        labelAlign="right"
        labelWidth={30}
        value={""}
        onChange={() => {}}
      />
      <Textbox
        label="City"
        labelInline
        labelAlign="right"
        labelWidth={30}
        value={""}
        onChange={() => {}}
      />
      <Checkbox
        label="Checkbox"
        labelWidth={30}
        labelSpacing={2}
        reverse
        checked={false}
        onChange={() => {}}
      />
      <Select
        label="Country"
        labelInline
        labelAlign="right"
        labelWidth={30}
        value={""}
        onChange={() => {}}
      >
        <Option text="United Kingdom" value="uk" />
        <Option text="Spain" value="sp" />
        <Option text="France" value="fr" />
        <Option text="Germany" value="ge" />
      </Select>
      <Textbox
        value={""}
        onChange={() => {}}
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
    <Textbox
      label="Separate Field"
      labelInline
      value={""}
      onChange={() => {}}
    />
    <Fieldset>
      <Textbox
        label="Fieldset 1 Field 1"
        labelInline
        value={""}
        onChange={() => {}}
      />
      <Textbox
        label="Fieldset 1 Field 2"
        labelInline
        value={""}
        onChange={() => {}}
      />
    </Fieldset>
    <Fieldset>
      <Textbox
        label="Fieldset 2 Field 1"
        labelInline
        value={""}
        onChange={() => {}}
      />
      <Textbox
        label="Fieldset 2 Field 2"
        labelInline
        value={""}
        onChange={() => {}}
      />
    </Fieldset>
    <Textbox
      label="Separate Field"
      labelInline
      value={""}
      onChange={() => {}}
    />
  </Form>
);
InFormFieldSpacing.storyName = "In Form with fieldSpacing (legacy)";

export const Validation: Story = () => (
  <Form>
    <Fieldset>
      <Textbox
        label="Error String"
        labelInline
        error="Error Message"
        value={""}
        onChange={() => {}}
      />
      <Textbox
        label="Warning String"
        labelInline
        warning="Warning Message"
        value={""}
        onChange={() => {}}
      />
      <Textbox
        label="Info String"
        labelInline
        info="Info Message"
        value={""}
        onChange={() => {}}
      />
    </Fieldset>
    <Fieldset>
      <Textbox
        label="Error on Label"
        labelInline
        error="Error Message"
        validationOnLabel
        value={""}
        onChange={() => {}}
      />
      <Textbox
        label="Warning on Label"
        labelInline
        warning="Warning Message"
        validationOnLabel
        value={""}
        onChange={() => {}}
      />
      <Textbox
        label="Info on Label"
        labelInline
        info="Info Message"
        validationOnLabel
        value={""}
        onChange={() => {}}
      />
    </Fieldset>
    <Fieldset>
      <Textbox
        label="Error Boolean"
        labelInline
        error
        value={""}
        onChange={() => {}}
      />
      <Textbox
        label="Warning Boolean"
        labelInline
        warning
        value={""}
        onChange={() => {}}
      />
      <Textbox
        label="Info Boolean"
        labelInline
        info
        value={""}
        onChange={() => {}}
      />
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
      <Textbox label="Separate Field" value={""} onChange={() => {}} />
      <Fieldset legend="Fieldset" {...args}>
        <Textbox
          label="Address Line 1"
          error="Message"
          value={""}
          onChange={() => {}}
        />
        <Textbox
          label="Address Line 2"
          error="Message"
          value={""}
          onChange={() => {}}
        />
        <Checkbox label="Checkbox" checked={false} onChange={() => {}} />
        <Textbox
          label="City"
          warning="Message"
          value={""}
          onChange={() => {}}
        />
        <Select
          label="Country"
          warning="Message"
          value={""}
          onChange={() => {}}
        >
          <Option text="United Kingdom" value="uk" />
          <Option text="Spain" value="sp" />
          <Option text="France" value="fr" />
          <Option text="Germany" value="ge" />
        </Select>
        <Textbox
          label="Postcode"
          maxWidth="100px"
          warning="Message"
          value={""}
          onChange={() => {}}
        />
      </Fieldset>
      <Textbox label="Separate Field" value={""} onChange={() => {}} />
    </Form>
  </CarbonProvider>
);
NewValidation.storyName = "New Validation";
NewValidation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
