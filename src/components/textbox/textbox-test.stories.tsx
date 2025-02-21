import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Textbox, { TextboxProps } from ".";
import Box from "../box";
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
  includeStories: [
    "Default",
    "Multiple",
    "NewValidation",
    "PrefixWithSizes",
    "LabelAndHintTextAlign",
  ],
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

export const LabelAndHintTextAlign = () => {
  const variants = [
    { inline: false, align: "left", error: "Error message" },
    { inline: false, align: "left", error: undefined },
    { inline: false, align: "right", error: "Error message" },
    { inline: false, align: "right", error: undefined },
    { inline: true, align: "left", error: "Error message" },
    { inline: true, align: "left", error: undefined },
    { inline: true, align: "right", error: "Error message" },
    { inline: true, align: "right", error: undefined },
  ];
  return (
    <Box>
      <h1>Old Validation</h1>
      <Box>
        {variants.map(({ inline, align, error: e }) => (
          <Textbox
            label={`${inline ? "Inline" : "Stacked"} - ${align}${e ? " with Error" : ""}`}
            value="Textbox"
            inputWidth={50}
            key={`${inline ? "inline" : "stacked"}-${align}-old-${e ? "error" : "no-error"}`}
            labelAlign={align as TextboxProps["labelAlign"]}
            inputHint="Hint text (optional)."
            labelInline={inline}
            error={e}
          />
        ))}
      </Box>

      <h1>New Validation</h1>
      <CarbonProvider validationRedesignOptIn>
        <Box>
          {variants.map(({ inline, align, error: e }) => (
            <Textbox
              label={`${inline ? "Inline" : "Stacked"} - ${align}${e ? " with Error" : ""}`}
              value="Textbox"
              inputWidth={50}
              key={`${inline ? "inline" : "stacked"}-${align}-new-${e ? "error" : "no-error"}`}
              labelAlign={align as TextboxProps["labelAlign"]}
              inputHint="Hint text (optional)."
              labelInline={inline}
              error={e}
            />
          ))}
        </Box>
      </CarbonProvider>
    </Box>
  );
};
