import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import {
  commonTextboxArgTypes,
  getCommonTextboxArgs,
  getCommonTextboxArgsWithSpecialCharacters,
  CommonTextboxArgs,
} from "../textbox/utils";
import GroupedCharacter, { CustomEvent } from "./grouped-character.component";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

export default {
  title: "Deprecated/Grouped Character/Test",
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

export const Validation = () => {
  const [state, setState] = useState("1231231");

  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };

  return (
    <>
      <GroupedCharacter
        label="GroupedCharacter"
        value={state}
        onChange={setValue}
        groups={[2, 2, 3]}
        separator="-"
        error="Error Message"
        mb={2}
      />
      <GroupedCharacter
        label="GroupedCharacter"
        value={state}
        onChange={setValue}
        groups={[2, 2, 3]}
        separator="-"
        warning="Warning Message"
        mb={2}
      />
      <GroupedCharacter
        label="GroupedCharacter"
        value={state}
        onChange={setValue}
        groups={[2, 2, 3]}
        separator="-"
        info="Info Message"
        mb={2}
      />

      <GroupedCharacter
        label="GroupedCharacter"
        value={state}
        onChange={setValue}
        groups={[2, 2, 3]}
        separator="-"
        error="Error Message"
        validationOnLabel
        mb={2}
      />
      <GroupedCharacter
        label="GroupedCharacter"
        value={state}
        onChange={setValue}
        groups={[2, 2, 3]}
        separator="-"
        warning="Warning Message"
        validationOnLabel
        mb={2}
      />
      <GroupedCharacter
        label="GroupedCharacter"
        value={state}
        onChange={setValue}
        groups={[2, 2, 3]}
        separator="-"
        info="Info Message"
        validationOnLabel
        mb={2}
      />

      <GroupedCharacter
        label="GroupedCharacter"
        value={state}
        onChange={setValue}
        groups={[2, 2, 3]}
        separator="-"
        error
        mb={2}
      />
      <GroupedCharacter
        label="GroupedCharacter"
        value={state}
        onChange={setValue}
        groups={[2, 2, 3]}
        separator="-"
        warning
        mb={2}
      />
      <GroupedCharacter
        label="GroupedCharacter"
        value={state}
        onChange={setValue}
        groups={[2, 2, 3]}
        separator="-"
        info
        mb={2}
      />
    </>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidation = () => {
  const [state, setState] = useState("1231231");

  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };

  return (
    <CarbonProvider validationRedesignOptIn>
      <GroupedCharacter
        label="GroupedCharacter"
        inputHint="Hint text (optional)."
        value={state}
        onChange={setValue}
        groups={[2, 2, 3]}
        separator="-"
        error="Error Message"
        mb={2}
      />
      <GroupedCharacter
        label="GroupedCharacter"
        value={state}
        onChange={setValue}
        groups={[2, 2, 3]}
        separator="-"
        warning="Warning Message"
        mb={2}
      />
      <GroupedCharacter
        validationMessagePositionTop={false}
        label="GroupedCharacter"
        inputHint="Hint text (optional)."
        value={state}
        onChange={setValue}
        groups={[2, 2, 3]}
        separator="-"
        error="Error Message"
        mb={2}
      />
      <GroupedCharacter
        validationMessagePositionTop={false}
        label="GroupedCharacter"
        value={state}
        onChange={setValue}
        groups={[2, 2, 3]}
        separator="-"
        warning="Warning Message"
      />
    </CarbonProvider>
  );
};
NewValidation.storyName = "New Validation";
NewValidation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const AutoFocus = () => {
  const [state, setState] = useState("1231231");

  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };

  return (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state}
      onChange={setValue}
      groups={[2, 2, 3]}
      separator="-"
      autoFocus
    />
  );
};
AutoFocus.storyName = "Auto Focus";
AutoFocus.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
