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
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const Default: Story = () => (
  <CarbonProvider validationRedesignOptIn>
    <Form>
      <Fieldset legend="Fieldset">
        <Textbox label="Address Line 1" value={""} onChange={() => {}} />
        <Textbox label="Address Line 2" value={""} onChange={() => {}} />
        <Textbox label="City" value={""} onChange={() => {}} />
        <Select label="Country" value={""} onChange={() => {}}>
          <Option text="United Kingdom" value="uk" />
          <Option text="Spain" value="sp" />
          <Option text="France" value="fr" />
          <Option text="Germany" value="ge" />
        </Select>
        <Textbox
          label="Postcode"
          maxWidth="100px"
          value={""}
          onChange={() => {}}
        />
      </Fieldset>
    </Form>
  </CarbonProvider>
);
Default.storyName = "Default";

export const InFormFieldSpacing: Story = () => (
  <CarbonProvider validationRedesignOptIn>
    <Form fieldSpacing={1}>
      <Fieldset legend="Fieldset">
        <Textbox label="Address Line 1" value={""} onChange={() => {}} />
        <Textbox label="Address Line 2" value={""} onChange={() => {}} />
        <Textbox label="City" value={""} onChange={() => {}} />
        <Select label="Country" value={""} onChange={() => {}}>
          <Option text="United Kingdom" value="uk" />
          <Option text="Spain" value="sp" />
          <Option text="France" value="fr" />
          <Option text="Germany" value="ge" />
        </Select>
        <Textbox
          label="Postcode"
          maxWidth="100px"
          value={""}
          onChange={() => {}}
        />
      </Fieldset>
    </Form>
  </CarbonProvider>
);
InFormFieldSpacing.storyName = "With fieldSpacing";

export const Required: Story = () => (
  <CarbonProvider validationRedesignOptIn>
    <Form>
      <Fieldset legend="Fieldset" required>
        <Textbox label="Address Line 1" value={""} onChange={() => {}} />
        <Textbox label="Address Line 2" value={""} onChange={() => {}} />
        <Textbox label="City" value={""} onChange={() => {}} />
        <Select label="Country" value={""} onChange={() => {}}>
          <Option text="United Kingdom" value="uk" />
          <Option text="Spain" value="sp" />
          <Option text="France" value="fr" />
          <Option text="Germany" value="ge" />
        </Select>
        <Textbox
          label="Postcode"
          maxWidth="100px"
          value={""}
          onChange={() => {}}
        />
      </Fieldset>
    </Form>
  </CarbonProvider>
);
Required.storyName = "Required";
