import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import Number from "./number.component";
import CarbonProvider from "../carbon-provider";
import {
  CommonTextboxArgs,
  commonTextboxArgTypes,
  getCommonTextboxArgs,
  getCommonTextboxArgsWithSpecialCharacters,
} from "../textbox/utils";

export default {
  title: "Deprecated/Number Input/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    deferTimeout: {
      control: {
        type: "number",
      },
    },
    ...commonTextboxArgTypes(),
  },
};

export const Default = ({
  onKeyDownEnabled,
  onChangeDeferredEnabled,
  ...args
}: CommonTextboxArgs & {
  onKeyDownEnabled: boolean;
  onChangeDeferredEnabled: boolean;
}) => {
  const [state, setState] = useState("");
  const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    action("onChange")(event.target.value);
    setState(event.target.value);
  };
  return (
    <Number
      value={state}
      onChange={setValue}
      onKeyDown={onKeyDownEnabled ? action("onKeyDown") : undefined}
      onChangeDeferred={
        onChangeDeferredEnabled ? action("onChangeDeferred") : undefined
      }
      {...getCommonTextboxArgsWithSpecialCharacters(args)}
    />
  );
};

Default.storyName = "default";
Default.args = {
  onChangeDeferredEnabled: false,
  onKeyDownEnabled: false,
  deferTimeout: undefined,
  ...getCommonTextboxArgs(),
};

export const Validation = () => {
  const [state, setState] = useState("123456");
  return (
    <>
      <Number
        label="Number"
        value={state}
        error="Error Message"
        mb={2}
        onChange={(e) => setState(e.target.value)}
      />
      <Number
        label="Number"
        value={state}
        warning="Warning Message"
        mb={2}
        onChange={(e) => setState(e.target.value)}
      />
      <Number
        label="Number"
        value={state}
        info="Info Message"
        mb={2}
        onChange={(e) => setState(e.target.value)}
      />

      <Number
        label="Number"
        value={state}
        error="Error Message"
        validationOnLabel
        mb={2}
        onChange={(e) => setState(e.target.value)}
      />
      <Number
        label="Number"
        value={state}
        warning="Warning Message"
        validationOnLabel
        mb={2}
        onChange={(e) => setState(e.target.value)}
      />
      <Number
        label="Number"
        value={state}
        info="Info Message"
        validationOnLabel
        mb={2}
        onChange={(e) => setState(e.target.value)}
      />

      <Number
        label="Number"
        value={state}
        error
        mb={2}
        onChange={(e) => setState(e.target.value)}
      />
      <Number
        label="Number"
        value={state}
        warning
        mb={2}
        onChange={(e) => setState(e.target.value)}
      />
      <Number
        label="Number"
        value={state}
        info
        mb={2}
        onChange={(e) => setState(e.target.value)}
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
  const [state, setState] = useState("123456");
  return (
    <CarbonProvider validationRedesignOptIn>
      <Number
        label="Number"
        value={state}
        error="Error Message"
        inputHint="Hint text"
        mb={2}
        onChange={(e) => setState(e.target.value)}
      />
      <Number
        label="Number"
        value={state}
        warning="Warning Message"
        mb={2}
        onChange={(e) => setState(e.target.value)}
      />
      <Number
        validationMessagePositionTop={false}
        label="Number"
        value={state}
        error="Error Message"
        inputHint="Hint text"
        mb={2}
        onChange={(e) => setState(e.target.value)}
      />
      <Number
        validationMessagePositionTop={false}
        label="Number"
        value={state}
        warning="Warning Message"
        mb={2}
        onChange={(e) => setState(e.target.value)}
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
  const [state, setState] = useState("123456");
  return (
    <Number
      label="Number"
      value={state}
      autoFocus
      onChange={(e) => setState(e.target.value)}
    />
  );
};
AutoFocus.storyName = "Auto Focus";
AutoFocus.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
