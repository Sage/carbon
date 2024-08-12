import React from "react";
import Fieldset from "./fieldset.component";
import Textbox from "../textbox";

export default {
  title: "Fieldset/Test",
  includeStories: ["Default", "OptionalFieldset", "RequiredFieldset"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

type FieldsetStoryProps = {
  legend?: string;
};

export const Default = ({ legend }: FieldsetStoryProps) => {
  return (
    <Fieldset legend={legend}>
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
      <Textbox label="Country" labelInline labelAlign="right" labelWidth={30} />
      <Textbox
        label="Telephone"
        labelInline
        labelAlign="right"
        labelWidth={30}
      />
    </Fieldset>
  );
};
Default.storyName = "default";
Default.args = {
  legend: "Personal Information",
};

export const OptionalFieldset = ({ legend }: FieldsetStoryProps) => {
  return (
    <Fieldset legend={legend} isOptional>
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
      <Textbox label="Country" labelInline labelAlign="right" labelWidth={30} />
      <Textbox
        label="Telephone"
        labelInline
        labelAlign="right"
        labelWidth={30}
      />
    </Fieldset>
  );
};
OptionalFieldset.storyName = "optional fieldset";
OptionalFieldset.args = {
  legend: "Personal Information",
};

export const RequiredFieldset = ({ legend }: FieldsetStoryProps) => {
  return (
    <Fieldset legend={legend} required>
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
      <Textbox label="Country" labelInline labelAlign="right" labelWidth={30} />
      <Textbox
        label="Telephone"
        labelInline
        labelAlign="right"
        labelWidth={30}
      />
    </Fieldset>
  );
};
RequiredFieldset.storyName = "required fieldset";
RequiredFieldset.args = {
  legend: "Personal Information",
};
