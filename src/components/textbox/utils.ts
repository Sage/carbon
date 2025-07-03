import { ICONS } from "../icon/icon-config";

export interface CommonTextboxArgs {
  prefix: string;
  fieldHelp: string;
  label: string;
  labelHelp: string;
  placeholder: string;
}

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
