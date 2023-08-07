import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import Number, { NumberProps } from "./number.component";
import {
  CommonTextboxArgs,
  commonTextboxArgTypes,
  getCommonTextboxArgs,
  getCommonTextboxArgsWithSpecialCaracters,
} from "../textbox/textbox-test.stories";

export default {
  title: "Number Input/Test",
  includeStories: ["Default"],
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
      {...getCommonTextboxArgsWithSpecialCaracters(args)}
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

export const NumberInputComponent = (props: NumberProps) => {
  const [state, setState] = React.useState("");

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return <Number label="Number" value={state} onChange={setValue} {...props} />;
};
