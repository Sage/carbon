import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Textbox, { TextboxProps } from ".";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import { ICONS } from "../icon/icon-config";

export const getCommonTextboxArgs = (
  isNewValidation = false,
  autoFocusDefault = false,
  disabledDefault = false,
) => {
  return {
    disabled: disabledDefault,
    readOnly: disabledDefault,
    autoFocus: autoFocusDefault,
    prefix: "",
    label: isNewValidation ? "Label - new validation" : "Label",
    labelHelp: "",
    placeholder: "",
    adaptiveLabelBreakpoint: undefined,
    ...(!isNewValidation && {
      fieldHelp: "",
      labelInline: false,
      labelWidth: 30,
      inputWidth: 70,
      labelAlign: undefined,
      tooltipId: "",
    }),
    size: "medium",
    inputIcon: undefined,
    required: false,
    characterLimit: undefined,
    error: "",
    warning: "",
  };
};

export interface CommonTextboxArgs {
  prefix: string;
  fieldHelp: string;
  label: string;
  labelHelp: string;
  placeholder: string;
}

export const getCommonTextboxArgsWithSpecialCharacters = (
  args: CommonTextboxArgs,
) => {
  const { prefix, fieldHelp, label, labelHelp, placeholder } = args;
  return {
    ...args,
    prefix,
    fieldHelp,
    label,
    labelHelp,
    helpAriaLabel: labelHelp,
    placeholder,
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
  labelAlign: {
    options: ["left", "right"],
    control: {
      type: "select",
    },
  },
  ...(!isNewValidation && {
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
    tooltipId: {
      control: {
        type: "text",
      },
    },
  }),
  adaptiveLabelBreakpoint: {
    control: {
      type: "number",
    },
  },
});

export default {
  title: "Textbox/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  includeStories: ["Default", "Multiple", "NewValidation", "PrefixWithSizes"],
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
        {...getCommonTextboxArgsWithSpecialCharacters(args)}
      />
    </div>
  );
};
Default.storyName = "default";
Default.argTypes = commonTextboxArgTypes();
Default.args = getCommonTextboxArgs();

export const Multiple = (args: CommonTextboxArgs) => (
  <div style={{ width: "296px" }}>
    <Textbox m={2} {...getCommonTextboxArgsWithSpecialCharacters(args)} />
    <Textbox m={2} {...getCommonTextboxArgsWithSpecialCharacters(args)} />
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
          {...getCommonTextboxArgsWithSpecialCharacters(args)}
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

export const PrefixWithSizes = () => {
  return (
    <>
      {["small", "medium", "large"].map((size) => (
        <Textbox
          key={`Textbox - ${size}`}
          label={`Textbox - ${size}`}
          defaultValue="Textbox"
          prefix="prefix"
          size={size as TextboxProps["size"]}
          mb={2}
        />
      ))}
    </>
  );
};

PrefixWithSizes.storyName = "prefix with sizes";
