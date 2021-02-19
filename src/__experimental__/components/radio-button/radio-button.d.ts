import * as React from "react";
import {
  AlignBinaryType,
  SizesType,
} from "../../../utils/helpers/options-helper/options-helper";

export interface RadioButtonProps {
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
  mt?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

declare const RadioButton: React.FunctionComponent<RadioButtonProps>;

export { RadioButton };
