import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import {
  commonTextboxArgTypes,
  getCommonTextboxArgs,
  getCommonTextboxArgsWithSpecialCharacters,
  CommonTextboxArgs,
} from "../textbox/textbox-test.stories";
import GroupedCharacter, { CustomEvent } from "./grouped-character.component";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

export default {
  title: "Grouped Character/Test",
  includeStories: [
    "Default",
    "NewValidation",
    "IsOptionalExample",
    "MaxWidthExample",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    ...commonTextboxArgTypes(),
  },
};

interface StoryArgs extends CommonTextboxArgs {
  separator: string;
  groups: number[];
}

export const Default = ({ separator, groups, ...args }: StoryArgs) => {
  const [state, setState] = useState("");
  const onChange = (ev: CustomEvent) => {
    setState(ev.target.value.rawValue);
    action("change")(ev.target.value);
  };
  return (
    <GroupedCharacter
      value={state}
      onChange={onChange}
      groups={groups}
      separator={separator || " "}
      {...getCommonTextboxArgsWithSpecialCharacters(args)}
    />
  );
};

Default.storyName = "default";
Default.args = {
  groups: [2, 2, 4],
  separator: "-",
  ...getCommonTextboxArgs(),
};

export const NewValidation = ({ separator, groups, ...args }: StoryArgs) => {
  const [state, setState] = useState("");
  const onChange = (ev: CustomEvent) => {
    setState(ev.target.value.rawValue);
    action("change")(ev.target.value);
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      <GroupedCharacter
        value={state}
        m={2}
        onChange={onChange}
        groups={groups}
        separator={separator || " "}
        {...getCommonTextboxArgsWithSpecialCharacters(args)}
      />
    </CarbonProvider>
  );
};

NewValidation.storyName = "new validation";
NewValidation.args = {
  groups: [2, 2, 4],
  separator: "-",
  ...getCommonTextboxArgs(),
};

export const IsOptionalExample = () => {
  const [state, setState] = useState("12345678");
  const onChange = (ev: CustomEvent) => {
    setState(ev.target.value.rawValue);
    action("change")(ev.target.value);
  };
  return (
    <GroupedCharacter
      value={state}
      onChange={onChange}
      groups={[2, 2, 4]}
      separator="-"
      label="Grouped Character"
      isOptional
    />
  );
};
IsOptionalExample.storyName = "is optional example";
IsOptionalExample.parameters = { chromatic: { disableSnaphot: false } };

export const MaxWidthExample = () => {
  const [state, setState] = useState("12345678");
  const onChange = (ev: CustomEvent) => {
    setState(ev.target.value.rawValue);
    action("change")(ev.target.value);
  };
  return (
    <GroupedCharacter
      label="Grouped Character with max width"
      value={state}
      onChange={onChange}
      groups={[2, 2, 4]}
      separator="-"
      maxWidth="200px"
    />
  );
};
MaxWidthExample.storyName = "max width example";
MaxWidthExample.parameters = { chromatic: { disableSnaphot: false } };
