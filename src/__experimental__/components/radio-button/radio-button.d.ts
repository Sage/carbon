import * as React from 'react';
import { AlignBinaryType, SizesType } from '../../../utils/helpers/options-helper/options-helper';

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
  labelWidth?: number | string;
  name?: string;
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  reverse?: boolean;
  size?: SizesType;
  value: string;
}

declare const RadioButton: React.FunctionComponent<RadioButtonProps>;

export { RadioButton };
