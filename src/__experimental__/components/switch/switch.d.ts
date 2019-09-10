import * as React from 'react';
import { withValidationProps } from '../../../components/validations/with-validation';

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
  onChange?: () => void;
  reverse?: boolean;
  size?: string;
  theme?: object;
  value: string;
  hasError?: boolean;
  hasWarning?: boolean;
  hasInfo?: boolean;
}

type OriginalSwitchType = React.FunctionComponent<SwitchProps>;

declare const OriginalSwitch: OriginalSwitchType;

declare function Switch<withValidationProps>(Component: OriginalSwitchType): React.FunctionComponent;

export { Switch as default, OriginalSwitch };
