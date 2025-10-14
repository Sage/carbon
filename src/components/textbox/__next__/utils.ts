import { ICONS } from "../../icon/icon-config";

export interface CommonTextInputArgs {
  prefix: string;
  label: string;
  inputHint: string;
  placeholder: string;
}

export const getCommonTextInputArgs = (
  labelInlineDefault = false,
  autoFocusDefault = false,
  disabledDefault = false,
) => {
  return {
    required: false,
    prefix: "",
    label: "TextInput",
    labelInline: labelInlineDefault,
    inputIcon: undefined,
    inputWidth: labelInlineDefault ? 70 : 100,
    leftChildren: undefined,
    size: "medium" as const,
    characterLimit: undefined,
    validationMessagePositionTop: false,
    formattedValue: undefined,
    inputHint: undefined,
    disabled: disabledDefault,
    readOnly: disabledDefault,
    autoFocus: autoFocusDefault,
    value: "",
    placeholder: "",
    align: "left" as const,
    error: "",
    warning: "",
  };
};

export const getCommonTextInputArgsWithSpecialCharacters = (
  args: CommonTextInputArgs,
) => {
  const { prefix, label, inputHint, placeholder } = args;
  return {
    ...args,
    prefix,
    label,
    inputHint,
    placeholder,
  };
};

export const commonTextInputArgTypes = () => ({
  required: {
    control: {
      type: "boolean" as const,
    },
  },
  size: {
    options: ["small", "medium", "large"],
    control: {
      type: "select" as const,
    },
  },
  inputIcon: {
    options: ["", ...ICONS],
    control: {
      type: "select" as const,
    },
  },
  align: {
    options: ["left", "right"],
    control: {
      type: "select" as const,
    },
  },
  characterLimit: {
    control: {
      type: "number" as const,
    },
  },
  inputWidth: {
    control: {
      type: "range" as const,
      min: 0,
      max: 100,
      step: 1,
    },
  },
  validationMessagePositionTop: {
    control: {
      type: "boolean" as const,
    },
  },
  disabled: {
    control: {
      type: "boolean" as const,
    },
  },
  readOnly: {
    control: {
      type: "boolean" as const,
    },
  },
  autoFocus: {
    control: {
      type: "boolean" as const,
    },
  },
  labelInline: {
    control: {
      type: "boolean" as const,
    },
  },
  formattedValue: {
    control: {
      type: "text" as const,
    },
  },
  inputHint: {
    control: {
      type: "text" as const,
    },
  },
  leftChildren: {
    control: {
      type: "text" as const,
    },
  },
});
