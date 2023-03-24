import React from "react";
import { ComponentStory } from "@storybook/react";

import Fieldset from ".";
import { Select, Option } from "../select";
import Textbox from "../textbox";
import { Checkbox } from "../checkbox";
import Form from "../form";

export const Default: ComponentStory<typeof Fieldset> = () => (
  <Fieldset legend="Fieldset">
    <Textbox
      label="First Name"
      labelInline
      labelAlign="right"
      labelWidth={30}
    />
    <Textbox label="Last Name" labelInline labelAlign="right" labelWidth={30} />
    <Textbox label="Address" labelInline labelAlign="right" labelWidth={30} />
    <Checkbox
      label="Checkbox"
      labelAlign="right"
      labelWidth={30}
      labelSpacing={2}
      reverse
    />
    <Textbox label="City" labelInline labelAlign="right" labelWidth={30} />
    <Textbox label="Country" labelInline labelAlign="right" labelWidth={30} />
    <Textbox label="Telephone" labelInline labelAlign="right" labelWidth={30} />
  </Fieldset>
);

export const InFormBasic: ComponentStory<typeof Fieldset> = () => (
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

export const InFormFieldSpacing: ComponentStory<typeof Fieldset> = () => (
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

export const ValidationsStringComponent: ComponentStory<
  typeof Fieldset
> = () => (
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

export const ValidationsStringLabel: ComponentStory<typeof Fieldset> = () => (
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

export const ValidationsBoolean: ComponentStory<typeof Fieldset> = () => (
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
