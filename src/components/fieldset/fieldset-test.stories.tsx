import React from "react";
import { ComponentMeta } from "@storybook/react";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import Fieldset from "./fieldset.component";
import Textbox from "../textbox";

export default {
  title: "Fieldset/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    legendSpecialCharacters: specialCharacters,
  },
} as ComponentMeta<typeof Fieldset>;

type FieldsetStoryProps = {
  legend?: string;
  legendSpecialCharacters?: string;
};

export const DefaultStory = ({
  legend,
  legendSpecialCharacters,
}: FieldsetStoryProps) => {
  return (
    <Fieldset legend={legend || legendSpecialCharacters}>
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

DefaultStory.storyName = "default";
DefaultStory.parameters = {
  args: {
    legendSpecialCharacters: undefined,
  },
};
