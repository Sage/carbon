import React from "react";
import InlineInputs, { InlineInputsProps } from ".";
import Textbox from "../textbox";
import Decimal from "../decimal";
import SimpleSelect from "../select/simple-select";
import Option from "../select/option";

export default {
  title: "Inline Inputs/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = (props: InlineInputsProps) => {
  return (
    <InlineInputs label="Inline Input" {...props}>
      <Textbox warning inputIcon="warning" />

      <Decimal onChange={() => {}} value="0.00" />

      <SimpleSelect onChange={() => {}} value="">
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
      </SimpleSelect>
    </InlineInputs>
  );
};

Default.storyName = "default";
