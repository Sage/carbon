import type { DatePickerSize } from "../date-picker/date-picker.types";

type DateInputFieldConfig = {
  inputHeight: string;
  pickerButtonSize: string;
  inlineLayoutGap: string;
  inlineLabelPadding: string;
  stackedLayoutGap: string;
  errorBorderOffset: string;
  inputInlinePadding: string;
};

const dateInputConfig = {
  small: {
    inputHeight: "var(--global-size-s)",
    pickerButtonSize: "calc(var(--global-size-s) - 2px)",
    inlineLayoutGap: "16px",
    inlineLabelPadding: "var(--global-space-comp-xs)",
    stackedLayoutGap: "var(--global-space-comp-xs)",
    errorBorderOffset: "8px",
    inputInlinePadding: "var(--global-space-comp-s)",
  },
  medium: {
    inputHeight: "var(--global-size-m)",
    pickerButtonSize: "calc(var(--global-size-m) - 2px)",
    inlineLayoutGap: "20px",
    inlineLabelPadding: "var(--global-space-comp-s)",
    stackedLayoutGap: "var(--global-space-comp-s)",
    errorBorderOffset: "10px",
    inputInlinePadding: "var(--global-space-comp-m)",
  },
  large: {
    inputHeight: "var(--global-size-l)",
    pickerButtonSize: "calc(var(--global-size-l) - 2px)",
    inlineLayoutGap: "24px",
    inlineLabelPadding: "var(--global-space-comp-s)",
    stackedLayoutGap: "var(--global-space-comp-m)",
    errorBorderOffset: "12px",
    inputInlinePadding: "var(--global-space-comp-l)",
  },
} as const satisfies Record<DatePickerSize, DateInputFieldConfig>;

export default dateInputConfig;
