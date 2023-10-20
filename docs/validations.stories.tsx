import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Textbox from "../src/components/textbox";
import DateRange from "../src/components/date-range";
import { RadioButton, RadioButtonGroup } from "../src/components/radio-button";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta = {
  title: "Documentation/Validations",
  tags: ["hideInSidebar"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;

export const StringValidation: StoryObj = () => {
  return <Textbox name="name" value="value" error="Message" />;
};
StringValidation.storyName = "String Validation";

export const BooleanValidation: StoryObj = () => {
  return <Textbox name="name" value="value" error />;
};
BooleanValidation.storyName = "Boolean Validation";

export const DateRangeValidation: StoryObj = () => {
  return (
    <DateRange
      name="name"
      onChange={() => {}}
      startError="Start message"
      endError="End message"
      value={["01/10/2016", "30/10/2016"]}
    />
  );
};
DateRangeValidation.storyName = "Date Range Validation";

export const GroupedInputValidation: StoryObj = () => {
  return (
    <RadioButtonGroup legend="Validation on buttons" name="name1">
      <RadioButton
        id="validations-on-buttons-radio-1"
        value="radio1"
        label="Radio Option 1"
        error="message"
      />
      <RadioButton
        id="validations-on-buttons-radio-2"
        value="radio2"
        label="Radio Option 2"
        warning="message"
      />
      <RadioButton
        id="validations-on-buttons-radio-3"
        value="radio3"
        label="Radio Option 3"
        info="message"
      />
    </RadioButtonGroup>
  );
};
GroupedInputValidation.storyName = "Grouped Input Validation";

export const GroupedLegendValidation: StoryObj = () => {
  return (
    <RadioButtonGroup
      legend="Validation on the legend"
      name="name2"
      error="Validation on group legend"
    >
      <RadioButton
        id="validations-on-legend-radio-1"
        value="radio1"
        label="Radio Option 1"
      />
      <RadioButton
        id="validations-on-legend-radio-2"
        value="radio2"
        label="Radio Option 2"
      />
      <RadioButton
        id="validations-on-legend-radio-3"
        value="radio3"
        label="Radio Option 3"
      />
    </RadioButtonGroup>
  );
};
GroupedLegendValidation.storyName = "Grouped Legend Validation";

export const GroupedRequired: StoryObj = () => {
  return (
    <RadioButtonGroup name="required" legend="Example of required" required>
      <RadioButton
        id="required-radio-1"
        value="radio1"
        label="Radio Option 1"
      />
      <RadioButton
        id="required-radio-2"
        value="radio2"
        label="Radio Option 2"
      />
      <RadioButton
        id="required-radio-3"
        value="radio3"
        label="Radio Option 3"
      />
    </RadioButtonGroup>
  );
};
GroupedRequired.storyName = "Grouped Required";
