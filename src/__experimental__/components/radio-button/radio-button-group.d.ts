import * as React from 'react';
import { WithValidationProps } from '../../../components/validations/with-validation';

export interface RadioButtonGroupProps {
  children: React.ComponentClass;
  groupName: string;
  label: string;
  labelHelp?: string;
  hasError?: boolean;
  hasWarning?: boolean;
  hasInfo?: boolean;
  styleOverride?: {
    root?: object;
    content?: object;
    legend?: object;
  };
}

declare const RadioButtonGroup: React.ComponentClass<WithValidationProps & RadioButtonGroupProps>;

export { RadioButtonGroup };
