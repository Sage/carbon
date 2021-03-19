import * as React from "react";
import {
  AlignBinaryType,
  SizesType,
} from "../../../utils/helpers/options-helper/options-helper";
import { MarginSpacingProps } from "../../../utils/helpers/options-helper";

export interface RadioButtonProps extends MarginSpacingProps {
  checked?: boolean;
  disabled?: boolean;
  error?: boolean | string;
  warning?: boolean | string;
  info?: boolean | string;
  fieldHelpInline?: boolean;
  id?: string;
  inputWidth?: number | string;
  label?: string | React.ReactNode;
  labelAlign?: AlignBinaryType;
  labelSpacing?: 1 | 2;
  labelWidth?: number | string;
  name?: string;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (ev: React.SyntheticEvent) => void;
  reverse?: boolean;
  size?: SizesType;
  value: string;
}

declare const RadioButton: React.FunctionComponent<RadioButtonProps>;

export { RadioButton };
