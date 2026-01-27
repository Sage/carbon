import { ICONS } from "../../icon/icon-config";

export interface CommonTextInputArgs {
  label: string;
  placeholder: string;
}

export const getCommonTextInputArgsWithSpecialCharacters = (
  args: CommonTextInputArgs,
) => {
  const { label, placeholder } = args;
  return {
    ...args,
    label,
    placeholder,
  };
};

export const getCommonTextInputArgs = (labelInlineDefault = false) => {
  return {
    disabled: false,
    readOnly: false,
    prefix: "",
    label: labelInlineDefault ? "Label - new validation" : "Label",
    inputHint: "",
    placeholder: "",
    labelInline: labelInlineDefault,
    inputWidth: 50,
    containerWidth: 100,
    size: "medium",
    inputIcon: undefined,
    required: false,
    characterLimit: undefined,
    error: "",
    warning: "",
  };
};

export const commonTextInputArgTypes = () => ({
  disabled: {
    control: {
      type: "boolean",
    },
  },
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
  labelInline: {
    control: {
      type: "boolean",
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
  containerWidth: {
    control: {
      type: "range",
      min: 0,
      max: 100,
      step: 1,
    },
  },
  required: {
    control: {
      type: "boolean",
    },
  },
  error: {
    control: {
      type: "text",
    },
  },
  warning: {
    control: {
      type: "text",
    },
  },
});
