import React, { useState } from "react";
import { action } from "storybook/actions";

import Number from "./number.component";
import CarbonProvider from "../carbon-provider";
import {
  CommonTextboxArgs,
  commonTextboxArgTypes,
  getCommonTextboxArgs,
  getCommonTextboxArgsWithSpecialCharacters,
} from "../textbox/utils";

export default {
  title: "Number Input/Test",
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
  return (
    <>
      <Number label="Number" value="123456" error="Error Message" mb={2} />
      <Number label="Number" value="123456" warning="Warning Message" mb={2} />
      <Number label="Number" value="123456" info="Info Message" mb={2} />

      <Number
        label="Number"
        value="123456"
        error="Error Message"
        validationOnLabel
        mb={2}
      />
      <Number
        label="Number"
        value="123456"
        warning="Warning Message"
        validationOnLabel
        mb={2}
      />
      <Number
        label="Number"
        value="123456"
        info="Info Message"
        validationOnLabel
        mb={2}
      />

      <Number label="Number" value="123456" error mb={2} />
      <Number label="Number" value="123456" warning mb={2} />
      <Number label="Number" value="123456" info mb={2} />
    </>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidation = () => {
  return (
    <CarbonProvider validationRedesignOptIn>
      <Number
        label="Number"
        value="123456"
        error="Error Message"
        inputHint="Hint text"
        mb={2}
      />
      <Number label="Number" value="123456" warning="Warning Message" mb={2} />
    </CarbonProvider>
  );
};
NewValidation.storyName = "New Validation";
NewValidation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const AutoFocus = () => {
  return <Number label="Number" value="123456" autoFocus />;
};
AutoFocus.storyName = "Auto Focus";
AutoFocus.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
