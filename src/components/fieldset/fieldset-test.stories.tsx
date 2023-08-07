import React from "react";
import Fieldset from "./fieldset.component";
import { FieldsetProps } from "../../../src/components/fieldset";
import Textbox from "../textbox";
import Checkbox from "../checkbox/checkbox.component";

export default {
  title: "Fieldset/Test",
  includeStories: ["Default"],
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

export const FieldsetComponent = (props: FieldsetProps) => {
  return (
    <div>
      <Fieldset legend="Fieldset" {...props}>
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
        <Textbox
          label="Address"
          labelInline
          labelAlign="right"
          labelWidth={30}
        />
        <Checkbox
          label="Checkbox"
          labelAlign="right"
          labelWidth={30}
          labelSpacing={2}
          reverse
        />
        <Textbox label="City" labelInline labelAlign="right" labelWidth={30} />
        <Textbox
          label="Country"
          labelInline
          labelAlign="right"
          labelWidth={30}
        />
        <Textbox
          label="Telephone"
          labelInline
          labelAlign="right"
          labelWidth={30}
        />
      </Fieldset>
    </div>
  );
};
