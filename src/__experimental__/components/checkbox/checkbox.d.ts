import * as React from 'react';
import { WithValidationProps } from '../../../components/validations/with-validation';

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  fieldHelpInline?: boolean;
  id?: string;
  inputWidth?: number | string;
  label?: string;
  labelAlign?: string;
  labelWidth? : number | string;
  onChange?(): void;
  reverse?: boolean;
  size?: string;
  value: string;
}

declare const Checkbox: React.ComponentClass<WithValidationProps & CheckboxProps>;

export { Checkbox };
