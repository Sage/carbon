import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import { singleSpecialCharacters } from "../../__internal__/utils/argTypes/specialCharacters";
import {
  commonTextboxArgTypes,
  getCommonTextboxArgs,
  getCommonTextboxArgsWithSpecialCaracters,
  CommonTextboxArgs,
} from "../textbox/textbox-test.stories";
import GroupedCharacter, { CustomEvent } from "./grouped-character.component";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

export default {
  title: "GroupedCharacter/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    ...commonTextboxArgTypes(),
    separatorSpecialCharacters: singleSpecialCharacters,
  },
};

interface StoryArgs extends CommonTextboxArgs {
  separatorSpecialCharacters: string;
  separator: string;
  groups: number[];
}

export const Default = ({
  separatorSpecialCharacters,
  separator,
  groups,
  ...args
}: StoryArgs) => {
  const [state, setState] = useState("");
  const onChange = (ev: CustomEvent) => {
    setState(ev.target.value.rawValue);
    action("change")(ev);
  };
  return (
    <GroupedCharacter
      value={state}
      onChange={onChange}
      groups={groups}
      separator={separator || separatorSpecialCharacters || " "}
      {...getCommonTextboxArgsWithSpecialCaracters(args)}
    />
  );
};

Default.storyName = "default";
Default.args = {
  groups: [2, 2, 4],
  separator: "-",
  separatorSpecialCharacters: undefined,
  ...getCommonTextboxArgs(),
};

export const NewValidation = ({
  separatorSpecialCharacters,
  separator,
  groups,
  ...args
}: StoryArgs) => {
  const [state, setState] = useState("");
  const onChange = (ev: CustomEvent) => {
    setState(ev.target.value.rawValue);
    action("change")(ev);
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      <GroupedCharacter
        value={state}
        m={2}
        onChange={onChange}
        groups={groups}
        separator={separator || separatorSpecialCharacters || " "}
        {...getCommonTextboxArgsWithSpecialCaracters(args)}
      />
    </CarbonProvider>
  );
};

NewValidation.storyName = "new validation";
NewValidation.args = {
  groups: [2, 2, 4],
  separator: "-",
  separatorSpecialCharacters: undefined,
  ...getCommonTextboxArgs(),
};
