import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import Textbox from ".";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import { ICONS } from "../icon/icon-config";

export const getCommonTextboxArgs = (
  isNewValidation = false,
  autoFocusDefault = false,
  disabledDefault = false
) => {
  return {
    disabled: disabledDefault,
    readOnly: disabledDefault,
    autoFocus: autoFocusDefault,
    prefix: "",
    prefixSpecialCharacters: undefined,
    label: isNewValidation ? "Label - new validation" : "Label",
    labelSpecialCharacters: undefined,
    labelHelp: "",
    labelHelpSpecialCharacters: undefined,
    placeholder: "",
    placeholderSpecialCharacters: undefined,
    adaptiveLabelBreakpoint: undefined,
    ...(!isNewValidation && {
      fieldHelp: "",
      fieldHelpSpecialCharacters: undefined,
      labelInline: false,
      labelWidth: 30,
      inputWidth: 70,
      labelAlign: undefined,
    }),
    size: "medium",
    inputIcon: undefined,
    required: false,
    enforceCharacterLimit: false,
    characterLimit: undefined,
    warnOverLimit: false,
    error: "",
    warning: "",
  };
};

export interface CommonTextboxArgs {
  prefix: string;
  prefixSpecialCharacters: string;
  fieldHelp: string;
  fieldHelpSpecialCharacters: string;
  label: string;
  labelSpecialCharacters: string;
  labelHelp: string;
  labelHelpSpecialCharacters: string;
  placeholder: string;
  placeholderSpecialCharacters: string;
}

export const getCommonTextboxArgsWithSpecialCaracters = (
  args: CommonTextboxArgs
) => {
  const {
    prefix,
    prefixSpecialCharacters,
    fieldHelp,
    fieldHelpSpecialCharacters,
    label,
    labelSpecialCharacters,
    labelHelp,
    labelHelpSpecialCharacters,
    placeholder,
    placeholderSpecialCharacters,
  } = args;
  return {
    ...args,
    prefix: prefix || prefixSpecialCharacters,
    fieldHelp: fieldHelp || fieldHelpSpecialCharacters,
    label: label || labelSpecialCharacters,
    labelHelp: labelHelp || labelHelpSpecialCharacters,
    helpAriaLabel: labelHelp || labelHelpSpecialCharacters,
    placeholder: placeholder || placeholderSpecialCharacters,
  };
};

export const commonTextboxArgTypes = (isNewValidation?: boolean) => ({
  size: {
    options: ["small", "medium", "large"],
    control: {
      type: "select",
    },
  },
  inputIcon: {
    options: ["", ...ICONS],
    control: {
      type: "select",
    },
  },
  ...(!isNewValidation && {
    labelAlign: {
      options: ["left", "right"],
      control: {
        type: "select",
      },
    },
    labelWidth: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
      },
    },
    inputWidth: {
      control: {
        type: "range",
        min: 0,
        max: 100,
        step: 1,
      },
    },
    fieldHelpSpecialCharacters: specialCharacters,
  }),
  adaptiveLabelBreakpoint: {
    control: {
      type: "number",
    },
  },
  prefixSpecialCharacters: specialCharacters,
  labelSpecialCharacters: specialCharacters,
  labelHelpSpecialCharacters: specialCharacters,
  placeholderSpecialCharacters: specialCharacters,
});

export default {
  title: "Textbox/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  includeStories: ["Default", "Multiple", "NewValidation"],
};

export const Default = (args: CommonTextboxArgs) => {
  const [state, setState] = useState("");
  const setValue = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };
  return (
    <div>
      <Textbox
        m={2}
        onClick={action("onClick")}
        maxWidth="70%"
        iconOnClick={action("iconOnClick")}
        value={state}
        onChange={setValue}
      />
    </div>
  );
};
Default.storyName = "default";
Default.argTypes = commonTextboxArgTypes();
Default.args = getCommonTextboxArgs();

export const Multiple = (args: CommonTextboxArgs) => (
  <div style={{ width: "296px" }}>
    <Textbox m={2} {...getCommonTextboxArgsWithSpecialCaracters(args)} />
    <Textbox m={2} {...getCommonTextboxArgsWithSpecialCaracters(args)} />
  </div>
);

Multiple.storyName = "multiple";
Multiple.argTypes = commonTextboxArgTypes();
Multiple.args = getCommonTextboxArgs();

export const NewValidation = (args: CommonTextboxArgs) => {
  const [state, setState] = useState("");
  const setValue = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState(value);
  };
  return (
    <div style={{ width: "296px" }}>
      <CarbonProvider validationRedesignOptIn>
        <Textbox
          m={2}
          {...getCommonTextboxArgsWithSpecialCaracters(args)}
          value={state}
          onChange={setValue}
        />
      </CarbonProvider>
    </div>
  );
};

NewValidation.storyName = "new validation";
NewValidation.argTypes = commonTextboxArgTypes(true);
NewValidation.args = getCommonTextboxArgs(true);
