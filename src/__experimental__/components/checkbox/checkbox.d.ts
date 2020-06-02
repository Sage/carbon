import * as React from 'react';
import { WithValidationProps } from '../../../components/validations/with-validation';

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  fieldHelp?: React.ReactNode;
  labelHelp?: React.ReactNode;
  autoFocus?: boolean;
  fieldHelpInline?: boolean;
  id?: string;
  inputWidth?: number | string;
  label?: string;
  labelAlign?: string;
  labelWidth?: number | string;
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  reverse?: boolean;
  size?: string;
  value: string;
}

declare const Checkbox: React.ComponentClass<WithValidationProps & CheckboxProps>;

export { Checkbox };
