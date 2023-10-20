import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Fieldset from ".";
import { Select, Option } from "../select";
import Textbox from "../textbox";
import { Checkbox } from "../checkbox";
import Form from "../form";

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
  <Fieldset legend="Fieldset">
    <Textbox
      label="First Name"
      labelInline
      labelAlign="right"
      labelWidth={30}
    />
    <Textbox label="Last Name" labelInline labelAlign="right" labelWidth={30} />
    <Textbox label="Address" labelInline labelAlign="right" labelWidth={30} />
    <Checkbox label="Checkbox" labelWidth={30} labelSpacing={2} reverse />
    <Textbox label="City" labelInline labelAlign="right" labelWidth={30} />
    <Textbox label="Country" labelInline labelAlign="right" labelWidth={30} />
    <Textbox label="Telephone" labelInline labelAlign="right" labelWidth={30} />
  </Fieldset>
);
Default.storyName = "Default";

export const InFormBasic: Story = () => (
  <Form>
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
InFormBasic.storyName = "In Form (Basic)";

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
InFormFieldSpacing.storyName = "In Form (Field Spacing)";

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
