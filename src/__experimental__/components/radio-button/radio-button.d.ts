import * as React from 'react';
import { AlignBinaryType, SizesType } from '../../../utils/helpers/options-helper/options-helper';
import { WithValidationProps } from '../../../components/validations/with-validation';

export interface RadioButtonProps {
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  fieldHelpInline?: boolean;
  id?: string;
  inputWidth?: number | string;
  label?: string;
  labelAlign?: AlignBinaryType;
  labelWidth?: number | string;
  name?: string;
  onChange?: () => void;
  reverse?: boolean;
  size?: SizesType;
  value: string
}

declare const OriginalRadioButton: React.FunctionComponent<RadioButtonProps>;

declare const RadioButton: React.ComponentClass<WithValidationProps & RadioButtonProps>;

export { RadioButton as default, OriginalRadioButton };
