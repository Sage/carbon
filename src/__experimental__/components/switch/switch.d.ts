import * as React from 'react';
import { WithValidationProps } from '../../../components/validations/with-validation';

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  fieldHelp?: string;
  fieldHelpInline?: boolean;
  id?: string;
  inputWidth?: number | string;
  label?: string;
  labelHelp?: string;
  labelAlign?: string;
  labelInline?: boolean;
  labelWidth?: number | string;
  loading?: boolean;
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  reverse?: boolean;
  size?: string;
  theme?: object;
  value: string;
  hasError?: boolean;
  hasWarning?: boolean;
  hasInfo?: boolean;
}

declare const Switch: React.ComponentClass<WithValidationProps & SwitchProps>;

export { Switch as default };
