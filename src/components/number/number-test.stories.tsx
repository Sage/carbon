import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { ComponentMeta } from "@storybook/react";

import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Number from "./number.component";
import {
  CommonTextboxArgs,
  commonTextboxArgTypes,
  getCommonTextboxArgs,
  getCommonTextboxArgsWithSpecialCaracters,
} from "../textbox/textbox-test.stories";

export default {
  title: "Number Input/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
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
} as ComponentMeta<typeof Number>;

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
    action("onChange")(event);
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

export const NewValidationStory = ({
  onKeyDownEnabled,
  onChangeDeferredEnabled,
  ...args
}: CommonTextboxArgs & {
  onKeyDownEnabled: boolean;
  onChangeDeferredEnabled: boolean;
}) => {
  const [state, setState] = useState("");
  const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    action("onChange")(event);
    setState(event.target.value);
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      <Number
        value={state}
        onChange={setValue}
        onKeyDown={onKeyDownEnabled ? action("onKeyDown") : undefined}
        onChangeDeferred={
          onChangeDeferredEnabled ? action("onChangeDeferred") : undefined
        }
        m={2}
        {...getCommonTextboxArgsWithSpecialCaracters(args)}
      />
    </CarbonProvider>
  );
};

NewValidationStory.storyName = "new validation";
NewValidationStory.args = {
  onChangeDeferredEnabled: false,
  onKeyDownEnabled: false,
  deferTimeout: undefined,
  ...getCommonTextboxArgs(),
};
