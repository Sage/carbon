import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Fieldset from ".";
import { Select, Option } from "../select";
import Textbox from "../textbox";
import Form from "../form";
import CarbonProvider from "../carbon-provider";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Fieldset> = {
  title: "Fieldset",
  component: Fieldset,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Default: Story = () => (
  <CarbonProvider validationRedesignOptIn>
    <Form>
      <Fieldset legend="Fieldset">
        <Textbox label="Address Line 1" />
        <Textbox label="Address Line 2" />
        <Textbox label="City" />
        <Select label="Country">
          <Option text="United Kingdom" value="uk" />
          <Option text="Spain" value="sp" />
          <Option text="France" value="fr" />
          <Option text="Germany" value="ge" />
        </Select>
        <Textbox label="Postcode" maxWidth="100px" />
      </Fieldset>
    </Form>
  </CarbonProvider>
);
Default.storyName = "Default";

export const InFormFieldSpacing: Story = () => (
  <CarbonProvider validationRedesignOptIn>
    <Form fieldSpacing={1}>
      <Fieldset legend="Fieldset">
        <Textbox label="Address Line 1" />
        <Textbox label="Address Line 2" />
        <Textbox label="City" />
        <Select label="Country">
          <Option text="United Kingdom" value="uk" />
          <Option text="Spain" value="sp" />
          <Option text="France" value="fr" />
          <Option text="Germany" value="ge" />
        </Select>
        <Textbox label="Postcode" maxWidth="100px" />
      </Fieldset>
    </Form>
  </CarbonProvider>
);
InFormFieldSpacing.storyName = "With fieldSpacing";

export const ValidationsStringComponent: Story = () => (
  <>
    {["error", "warning", "info"].map((type) => (
      <Fieldset
        key={`${type}-string-component`}
        legend={`Fieldset ${type} on component`}
      >
        <Textbox
          label="Address"
          labelInline
          labelAlign="right"
          {...{ [type]: "Message" }}
        />
        <Textbox label="Town/City" labelInline labelAlign="right" />
        <Select
          label="Province"
          labelInline
          labelAlign="right"
          {...{ [type]: "Message" }}
        >
          <Option key="ab" text="Alberta" value="ab" />
          <Option key="on" text="Ontario" value="on" />
          <Option key="qc" text="Quebec" value="qc" />
        </Select>
        <Textbox
          label="ZIP Code"
          labelInline
          labelAlign="right"
          inputWidth={10}
        />
      </Fieldset>
    ))}
  </>
);
ValidationsStringComponent.storyName = "Validations (String on Component)";

export const ValidationsStringLabel: Story = () => (
  <>
    {["error", "warning", "info"].map((type) => (
      <Fieldset
        key={`${type}-string-label`}
        legend={`Fieldset ${type} on label`}
      >
        <Textbox
          label="Address"
          labelInline
          labelAlign="right"
          validationOnLabel
          {...{ [type]: "Message" }}
        />
        <Textbox label="Town/City" labelInline labelAlign="right" />
        <Select
          label="Province"
          labelInline
          labelAlign="right"
          validationOnLabel
          {...{ [type]: "Message" }}
        >
          <Option key="ab" text="Alberta" value="ab" />
          <Option key="on" text="Ontario" value="on" />
          <Option key="qc" text="Quebec" value="qc" />
        </Select>
        <Textbox
          label="ZIP Code"
          labelInline
          labelAlign="right"
          inputWidth={10}
        />
      </Fieldset>
    ))}
  </>
);
ValidationsStringLabel.storyName = "Validations (String on Label)";

export const ValidationsBoolean: Story = () => (
  <>
    {["error", "warning", "info"].map((type) => (
      <Fieldset key={`${type}-boolean`} legend={`Fieldset ${type} as boolean`}>
        <Textbox
          label="Address"
          labelInline
          labelAlign="right"
          {...{ [type]: true }}
        />
        <Textbox label="Town/City" labelInline labelAlign="right" />
        <Select
          label="Province"
          labelInline
          labelAlign="right"
          {...{ [type]: true }}
        >
          <Option key="ab" text="Alberta" value="ab" />
          <Option key="on" text="Ontario" value="on" />
          <Option key="qc" text="Quebec" value="qc" />
        </Select>
        <Textbox
          label="ZIP Code"
          labelInline
          labelAlign="right"
          inputWidth={10}
        />
      </Fieldset>
    ))}
  </>
);
ValidationsBoolean.storyName = "Validations (Boolean)";

export const NewValidation: Story = () => (
  <CarbonProvider validationRedesignOptIn>
    <Form>
      <Fieldset legend="Fieldset">
        <Textbox label="Address Line 1" error="Message" />
        <Textbox label="Address Line 2" error="Message" />
        <Textbox label="City" warning="Message" />
        <Select label="Country" warning="Message">
          <Option text="United Kingdom" value="uk" />
          <Option text="Spain" value="sp" />
          <Option text="France" value="fr" />
          <Option text="Germany" value="ge" />
        </Select>
        <Textbox label="Postcode" maxWidth="100px" warning="Message" />
      </Fieldset>
    </Form>
  </CarbonProvider>
);
NewValidation.storyName = "New Validation";

export const Required: Story = () => (
  <CarbonProvider validationRedesignOptIn>
    <Form>
      <Fieldset legend="Fieldset" required>
        <Textbox label="Address Line 1" />
        <Textbox label="Address Line 2" />
        <Textbox label="City" />
        <Select label="Country">
          <Option text="United Kingdom" value="uk" />
          <Option text="Spain" value="sp" />
          <Option text="France" value="fr" />
          <Option text="Germany" value="ge" />
        </Select>
        <Textbox label="Postcode" maxWidth="100px" />
      </Fieldset>
    </Form>
  </CarbonProvider>
);
Required.storyName = "Required";

export const IsOptional: Story = () => (
  <CarbonProvider validationRedesignOptIn>
    <Form>
      <Fieldset legend="Fieldset" isOptional>
        <Textbox label="Address Line 1" />
        <Textbox label="Address Line 2" />
        <Textbox label="City" />
        <Select label="Country">
          <Option text="United Kingdom" value="uk" />
          <Option text="Spain" value="sp" />
          <Option text="France" value="fr" />
          <Option text="Germany" value="ge" />
        </Select>
        <Textbox label="Postcode" maxWidth="100px" />
      </Fieldset>
    </Form>
  </CarbonProvider>
);
IsOptional.storyName = "IsOptional";
