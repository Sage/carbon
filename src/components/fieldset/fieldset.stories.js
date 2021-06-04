import React from "react";
import { text } from "@storybook/addon-knobs";
import Fieldset from "./fieldset.component";
import Textbox from "../textbox";
import { Checkbox } from "../checkbox";

export default {
  title: "Design System/Fieldset/Test",
  component: Checkbox,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};
export const Default = () => {
  const legend = text("legend", "");

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

Default.story = {
  name: "default",
};
