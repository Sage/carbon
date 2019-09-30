import * as React from 'react';
import { WithValidationProps } from '../../../components/validations/with-validation';

interface CheckboxGroupProps {
  children: React.FunctionComponent | React.ComponentClass;
  groupName: string;
  hasError: boolean;
  hasWarning: boolean;
  hasInfo: boolean;
}

declare const CheckboxGroup: React.ComponentClass<WithValidationProps & CheckboxGroupProps>;

export { CheckboxGroup };
