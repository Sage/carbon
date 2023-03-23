import React from "react";
import { ComponentStory } from "@storybook/react";

import Fieldset from ".";
import { Select, Option } from "../select";
import Textbox from "../textbox";

export const Canada: ComponentStory<typeof Fieldset> = () => (
  <Fieldset>
    <Textbox label="Address line 1" labelInline labelAlign="right" />
    <Textbox label="Address line 2" labelInline labelAlign="right" />
    <Textbox label="Town/City" labelInline labelAlign="right" />
    <Select label="Province" labelInline labelAlign="right">
      <Option key="ab" text="Alberta" value="ab" />
      <Option key="on" text="Ontario" value="on" />
      <Option key="qc" text="Quebec" value="qc" />
    </Select>
    <Textbox label="ZIP Code" labelInline labelAlign="right" inputWidth={10} />
  </Fieldset>
);

export const EU: ComponentStory<typeof Fieldset> = () => (
  <Fieldset>
    <Textbox label="Address line 1" labelInline labelAlign="right" />
    <Textbox label="Address line 2" labelInline labelAlign="right" />
    <Textbox
      label="Postal Code"
      labelInline
      labelAlign="right"
      inputWidth={10}
    />
    <Textbox label="Town/City" labelInline labelAlign="right" />
    <Select label="Country" labelInline labelAlign="right">
      <Option key="dk" text="Denmark" value="dk" />
      <Option key="fr" text="France" value="fr" />
      <Option key="de" text="Germany" value="de" />
      <Option key="es" text="Spain" value="es" />
    </Select>
  </Fieldset>
);

export const UkAndIreland: ComponentStory<typeof Fieldset> = () => (
  <Fieldset>
    <Textbox label="Address line 1" labelInline labelAlign="right" />
    <Textbox label="Address line 2" labelInline labelAlign="right" />
    <Textbox label="Town/City" labelInline labelAlign="right" />
    <Textbox label="County" labelInline labelAlign="right" />
    <Select label="Country" labelInline labelAlign="right" defaultValue="uk">
      <Option key="uk" text="United Kingdom" value="uk" />
      <Option key="irl" text="Ireland" value="irl" />
    </Select>
    <Textbox label="Postcode" labelInline labelAlign="right" inputWidth={10} />
  </Fieldset>
);

export const UnitedStates: ComponentStory<typeof Fieldset> = () => (
  <Fieldset>
    <Textbox label="Address line 1" labelInline labelAlign="right" />
    <Textbox label="Address line 2" labelInline labelAlign="right" />
    <Textbox label="Town/City" labelInline labelAlign="right" />
    <Select label="State" labelInline labelAlign="right">
      <Option key="ca" text="California" value="ca" />
      <Option key="ny" text="New York" value="ny" />
      <Option key="tx" text="Texas" value="tx" />
    </Select>
    <Textbox label="ZIP Code" labelInline labelAlign="right" inputWidth={10} />
  </Fieldset>
);

export const Other: ComponentStory<typeof Fieldset> = () => (
  <Fieldset>
    <Textbox label="Address line 1" labelInline labelAlign="right" />
    <Textbox label="Address line 2" labelInline labelAlign="right" />
    <Textbox label="Town/City" labelInline labelAlign="right" />
    <Textbox label="Province / State" labelInline labelAlign="right" />
    <Textbox
      label="Postal Code"
      labelInline
      labelAlign="right"
      inputWidth={10}
    />
    <Select label="Country" labelInline labelAlign="right">
      <Option key="au" text="Australia" value="au" />
      <Option key="cn" text="China" value="cn" />
    </Select>
  </Fieldset>
);
