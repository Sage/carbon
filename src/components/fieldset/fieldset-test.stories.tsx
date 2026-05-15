import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Fieldset from ".";
import Textbox from "../textbox";
import Decimal from "../decimal";
import Password from "../password";
import DateInput from "../date";
import Textarea from "../textarea";
import TextEditor from "../text-editor";
import { Select, MultiSelect, FilterableSelect, Option } from "../select";
import { Checkbox } from "../checkbox";

const meta: Meta<typeof Fieldset> = {
  title: "Fieldset/Test",
  component: Fieldset,
  argTypes: {
    legendHint: { control: "text" },
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    controls: {
      exclude: ["children"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Fieldset>;

export const AllInputsSmall: Story = {
  render: (args) => (
    <Fieldset {...args}>
      <Textbox label="Textbox" value="Input Text" onChange={() => {}} />
      <Decimal label="Decimal" value="0.00" onChange={() => {}} />
      <Password label="Password" value="Password" onChange={() => {}} />
      <DateInput label="DateInput" value="10/10/2010" onChange={() => {}} />
      <Checkbox label="Checkbox" checked onChange={() => {}} />
      <Textarea label="Textarea" value="textarea" onChange={() => {}} />
      <TextEditor labelText="TextEditor" onChange={() => {}} />
      <Select label="Simple Select" value="1" onChange={() => {}}>
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <MultiSelect label="Multi Select" value={["1"]} onChange={() => {}}>
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </MultiSelect>
      <FilterableSelect label="Filterable Select" value="1" onChange={() => {}}>
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </FilterableSelect>
    </Fieldset>
  ),
  args: {
    legend: "Fieldset Legend",
    legendHint: "LegendHint",
    error: "Error message (Fix is required)",
    required: true,
    size: "small",
  },
};

export const AllInputsMedium: Story = {
  ...AllInputsSmall,
  args: {
    ...AllInputsSmall.args,
    size: "medium",
  },
};

export const AllInputsLarge: Story = {
  ...AllInputsSmall,
  args: {
    ...AllInputsSmall.args,
    size: "large",
  },
};

export const ChildVariations: Story = {
  render: (args) => (
    <>
      <Fieldset legend="Fieldset 1" mb={4} {...args}>
        <Textbox
          label="Textbox required"
          value="Input Text"
          required
          onChange={() => {}}
        />
        <Textbox
          label="Textbox with error"
          value="Input Text"
          error="Error message"
          onChange={() => {}}
        />
        <Textbox
          label="Textbox with warning"
          value="Input Text"
          warning="Warning message"
          onChange={() => {}}
        />
        <Textbox
          label="Textbox inline"
          value="Input Text"
          labelInline
          onChange={() => {}}
        />
      </Fieldset>
    </>
  ),
  args: {
    legend: "Fieldset Legend",
    legendHint: "LegendHint",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
